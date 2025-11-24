import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class TransactionModel {
  final String id;
  final String to;
  final double amount;
  final DateTime when;

  TransactionModel({required this.id, required this.to, required this.amount, DateTime? when}) : when = when ?? DateTime.now();

  Map<String, dynamic> toJson() => {'id': id, 'to': to, 'amount': amount, 'when': when.toIso8601String()};

  static TransactionModel fromJson(Map<String, dynamic> j) => TransactionModel(id: j['id'], to: j['to'], amount: (j['amount'] as num).toDouble(), when: DateTime.parse(j['when']));
}

class ScanPayScreen extends StatefulWidget {
  const ScanPayScreen({super.key});

  @override
  State<ScanPayScreen> createState() => _ScanPayScreenState();
}

class _ScanPayScreenState extends State<ScanPayScreen> {
  final List<TransactionModel> _history = [];
  bool _processing = false;

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('scanpay_history') ?? [];
    setState(() {
      _history.clear();
      _history.addAll(raw.map((s) => TransactionModel.fromJson(jsonDecode(s) as Map<String, dynamic>)));
    });
  }

  Future<void> _saveHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = _history.map((t) => jsonEncode(t.toJson())).toList();
    await prefs.setStringList('scanpay_history', raw);
  }

  Future<void> _simulateScanAndPay() async {
    // This simulates scanning a QR and paying. Replace with real scanner integration.
    final code = 'upi://pay?pa=merchant@upi&pn=Merchant&am=249.00';
    await _startPaymentFlow(code, suggestedAmount: 249.0);
  }

  Future<void> _startPaymentFlow(String to, {double? suggestedAmount}) async {
    final amountCtrl = TextEditingController(text: suggestedAmount != null ? suggestedAmount.toStringAsFixed(2) : '');
    final res = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Confirm Payment'),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          Text('Pay to: $to', style: const TextStyle(fontSize: 14)),
          const SizedBox(height: 12),
          TextField(
            controller: amountCtrl,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: const InputDecoration(labelText: 'Amount'),
          ),
        ]),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('Cancel')),
          ElevatedButton(onPressed: () => Navigator.pop(c, true), child: const Text('Pay')),
        ],
      ),
    );

    if (res != true) return;
    final amount = double.tryParse(amountCtrl.text) ?? 0.0;
    if (amount <= 0) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Enter a valid amount')));
      return;
    }

    setState(() => _processing = true);
    await Future.delayed(const Duration(seconds: 1)); // simulate network

    final tx = TransactionModel(id: DateTime.now().millisecondsSinceEpoch.toString(), to: to, amount: amount);
    setState(() {
      _history.insert(0, tx);
      _processing = false;
    });
    await _saveHistory();
    // Try to post payment to server
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.createPayment(userId, tx.toJson());
    } catch (_) {
      // ignore
    }
    if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Payment successful')));
  }

  Future<void> _manualPayDialog() async {
    final toCtrl = TextEditingController();
    final amountCtrl = TextEditingController();
    final res = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Manual Payment'),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          TextField(controller: toCtrl, decoration: const InputDecoration(labelText: 'Pay to (UPI / Account)'),),
          const SizedBox(height: 8),
          TextField(controller: amountCtrl, keyboardType: const TextInputType.numberWithOptions(decimal: true), decoration: const InputDecoration(labelText: 'Amount'),),
        ]),
        actions: [TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('Cancel')), ElevatedButton(onPressed: () => Navigator.pop(c, true), child: const Text('Pay'))],
      ),
    );

    if (res != true) return;
    final to = toCtrl.text.trim();
    final amount = double.tryParse(amountCtrl.text) ?? 0.0;
    if (to.isEmpty || amount <= 0) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Provide valid details')));
      return;
    }
    await _startPaymentFlow(to, suggestedAmount: amount);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan & Pay')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: Row(
              children: [
                Expanded(child: ElevatedButton.icon(onPressed: _simulateScanAndPay, icon: const Icon(Icons.qr_code_scanner), label: const Text('Scan QR'))),
                const SizedBox(width: 8),
                ElevatedButton.icon(onPressed: _manualPayDialog, icon: const Icon(Icons.edit), label: const Text('Manual')),
              ],
            ),
          ),

          if (_processing) const LinearProgressIndicator(),

          const Padding(padding: EdgeInsets.all(8.0), child: Text('Recent transactions', style: TextStyle(fontWeight: FontWeight.w600))),
          Expanded(
            child: _history.isEmpty
                ? const Center(child: Text('No recent transactions'))
                : ListView.builder(
                    itemCount: _history.length,
                    itemBuilder: (context, i) {
                      final t = _history[i];
                      return ListTile(
                        leading: const Icon(Icons.currency_rupee),
                        title: Text('₹${t.amount.toStringAsFixed(2)} to ${t.to}'),
                        subtitle: Text(t.when.toLocal().toString()),
                        trailing: IconButton(icon: const Icon(Icons.delete_outline), onPressed: () async { setState(() => _history.removeAt(i)); await _saveHistory(); }),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
