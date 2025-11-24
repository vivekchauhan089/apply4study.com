import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class ReminderModel {
  final String id;
  final String title;
  final double amount;
  final DateTime due;
  bool done;

  ReminderModel({required this.id, required this.title, required this.amount, required this.due, this.done = false});

  Map<String, dynamic> toJson() => {'id': id, 'title': title, 'amount': amount, 'due': due.toIso8601String(), 'done': done};

  static ReminderModel fromJson(Map<String, dynamic> j) => ReminderModel(id: j['id'], title: j['title'], amount: (j['amount'] as num).toDouble(), due: DateTime.parse(j['due']), done: j['done'] as bool);
}

class RemindersScreen extends StatefulWidget {
  const RemindersScreen({super.key});

  @override
  State<RemindersScreen> createState() => _RemindersScreenState();
}

class _RemindersScreenState extends State<RemindersScreen> {
  final List<ReminderModel> _items = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('payment_reminders') ?? [];
    setState(() {
      _items.clear();
      _items.addAll(raw.map((s) => ReminderModel.fromJson(jsonDecode(s) as Map<String, dynamic>)));
    });
    // Try load from API
    try {
      final prefs2 = await SharedPreferences.getInstance();
      final userId = prefs2.getString('username') ?? prefs2.getString('mobile') ?? 'guest';
      final data = await ApiService.instance.fetchReminders(userId);
      final fromApi = data.whereType<Map<String, dynamic>>().map((m) => ReminderModel.fromJson(m)).toList();
      if (fromApi.isNotEmpty) {
        setState(() {
          _items.clear();
          _items.addAll(fromApi);
        });
      }
    } catch (_) {
      // ignore
    }
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = _items.map((r) => jsonEncode(r.toJson())).toList();
    await prefs.setStringList('payment_reminders', raw);
  }

  Future<void> _addDialog() async {
    final titleCtrl = TextEditingController();
    final amountCtrl = TextEditingController();
    DateTime? due;

    final res = await showDialog<bool>(
      context: context,
      builder: (c) => StatefulBuilder(builder: (c2, setStateSB) {
        return AlertDialog(
          title: const Text('Add Reminder'),
          content: Column(mainAxisSize: MainAxisSize.min, children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Title')),
            const SizedBox(height: 8),
            TextField(controller: amountCtrl, keyboardType: const TextInputType.numberWithOptions(decimal: true), decoration: const InputDecoration(labelText: 'Amount')),
            const SizedBox(height: 8),
            Row(children: [
              const Text('Due: '),
              Text(due == null ? 'Not set' : due!.toLocal().toString().split(' ').first),
              const Spacer(),
              TextButton(onPressed: () async { final d = await showDatePicker(context: c2, initialDate: DateTime.now(), firstDate: DateTime.now().subtract(const Duration(days: 365)), lastDate: DateTime.now().add(const Duration(days: 365*5))); if (d!=null) setStateSB(()=> due = d); }, child: const Text('Pick'))
            ])
          ]),
          actions: [TextButton(onPressed: ()=>Navigator.pop(c, false), child: const Text('Cancel')), ElevatedButton(onPressed: ()=>Navigator.pop(c, true), child: const Text('Add'))],
        );
      }),
    );

    if (res != true) return;
    final title = titleCtrl.text.trim();
    final amount = double.tryParse(amountCtrl.text) ?? 0.0;
    if (title.isEmpty || amount <= 0 || due == null) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Provide title, amount and due date')));
      return;
    }

    final r = ReminderModel(id: DateTime.now().millisecondsSinceEpoch.toString(), title: title, amount: amount, due: due!);
    setState(() => _items.insert(0, r));
    await _save();
    // Try to create on server
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.createReminder(userId, r.toJson());
    } catch (_) {
      // ignore
    }
    if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Reminder added')));
  }

  Future<void> _toggleDone(ReminderModel r) async {
    setState(() => r.done = !r.done);
    await _save();
  }

  Future<void> _remove(ReminderModel r) async {
    setState(() => _items.removeWhere((x) => x.id == r.id));
    await _save();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Payment Reminders')),
      body: _items.isEmpty
          ? Center(child: Padding(padding: const EdgeInsets.all(24.0), child: Column(mainAxisSize: MainAxisSize.min, children: const [Icon(Icons.notifications_none, size: 56), SizedBox(height: 8), Text('No reminders yet'), Text('Tap + to add payment reminders')],),),)
          : ListView.builder(
              itemCount: _items.length,
              itemBuilder: (context, i) {
                final r = _items[i];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  child: ListTile(
                    leading: Checkbox(value: r.done, onChanged: (_) => _toggleDone(r)),
                    title: Text(r.title),
                    subtitle: Text('₹${r.amount.toStringAsFixed(2)} • Due ${r.due.toLocal().toString().split(' ').first}'),
                    trailing: PopupMenuButton<String>(onSelected: (v) async { if (v=='remove') await _remove(r); }, itemBuilder: (_)=>[const PopupMenuItem(value: 'remove', child: Text('Remove'))]),
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(onPressed: _addDialog, child: const Icon(Icons.add_alert)),
    );
  }
}
