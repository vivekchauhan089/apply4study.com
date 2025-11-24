import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class Expense {
  final String id;
  final String title;
  final double amount;
  final String category;
  final DateTime date;

  Expense({required this.id, required this.title, required this.amount, required this.category, required this.date});

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'amount': amount,
        'category': category,
        'date': date.toIso8601String(),
      };

  static Expense fromJson(Map<String, dynamic> m) => Expense(
        id: m['id'] as String,
        title: m['title'] as String,
        amount: (m['amount'] as num).toDouble(),
        category: m['category'] as String,
        date: DateTime.parse(m['date'] as String),
      );
}

class ExpensesScreen extends StatefulWidget {
  const ExpensesScreen({super.key});

  @override
  State<ExpensesScreen> createState() => _ExpensesScreenState();
}

class _ExpensesScreenState extends State<ExpensesScreen> {
  static const _prefsKey = 'expenses';
  List<Expense> _items = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList(_prefsKey) ?? [];
    setState(() => _items = raw.map((s) => Expense.fromJson(jsonDecode(s) as Map<String, dynamic>)).toList());
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_prefsKey, _items.map((e) => jsonEncode(e.toJson())).toList());
  }

  Future<void> _addExpense() async {
    final titleCtrl = TextEditingController();
    final amountCtrl = TextEditingController();
    String category = 'Other';
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Add Expense'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Title')),
            TextField(controller: amountCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Amount')),
            DropdownButton<String>(
              value: category,
              items: const [
                DropdownMenuItem(value: 'Food', child: Text('Food')),
                DropdownMenuItem(value: 'Travel', child: Text('Travel')),
                DropdownMenuItem(value: 'Bills', child: Text('Bills')),
                DropdownMenuItem(value: 'Other', child: Text('Other')),
              ],
              onChanged: (v) {
                if (v != null) category = v;
              },
            )
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Add')),
        ],
      ),
    );
    if (ok != true) return;
    final now = DateTime.now();
    final amt = double.tryParse(amountCtrl.text) ?? 0.0;
    final e = Expense(id: now.millisecondsSinceEpoch.toString(), title: titleCtrl.text.trim(), amount: amt, category: category, date: now);
    setState(() => _items.insert(0, e));
    await _save();
    // Try syncing expense to server
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.createExpense(userId, e.toJson());
    } catch (_) {
      // ignore network errors
    }
  }

  double get _total => _items.fold(0.0, (p, e) => p + e.amount);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Expense Tracker')),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            Card(
              child: ListTile(
                title: const Text('Total Spent'),
                trailing: Text('₹${_total.toStringAsFixed(2)}'),
              ),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: _items.isEmpty
                  ? const Center(child: Text('No expenses yet'))
                  : ListView.separated(
                      itemCount: _items.length,
                      separatorBuilder: (_, __) => const Divider(),
                      itemBuilder: (context, i) {
                        final it = _items[i];
                        return ListTile(
                          title: Text(it.title),
                          subtitle: Text('${it.category} • ${it.date.toLocal()}'),
                          trailing: Text('₹${it.amount.toStringAsFixed(2)}'),
                          onLongPress: () async {
                            // delete
                            final ok = await showDialog<bool>(
                              context: context,
                              builder: (_) => AlertDialog(
                                title: const Text('Delete expense?'),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('No')),
                                  TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Yes')),
                                ],
                              ),
                            );
                            if (ok == true) {
                              setState(() => _items.removeAt(i));
                              await _save();
                            }
                          },
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addExpense,
        child: const Icon(Icons.add),
      ),
    );
  }
}
