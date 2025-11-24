import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class CompareItem {
  final String id;
  final String title;
  final String note;

  CompareItem({required this.id, required this.title, required this.note});

  Map<String, dynamic> toJson() => {'id': id, 'title': title, 'note': note};
  static CompareItem fromJson(Map<String, dynamic> m) => CompareItem(id: m['id'], title: m['title'], note: m['note']);
}

class CompareScreen extends StatefulWidget {
  const CompareScreen({super.key});

  @override
  State<CompareScreen> createState() => _CompareScreenState();
}

class _CompareScreenState extends State<CompareScreen> {
  static const _prefsKey = 'compare_items';
  List<CompareItem> _items = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList(_prefsKey) ?? [];
    setState(() => _items = raw.map((s) => CompareItem.fromJson(jsonDecode(s) as Map<String, dynamic>)).toList());
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_prefsKey, _items.map((i) => jsonEncode(i.toJson())).toList());
  }

  Future<void> _addItem() async {
    final titleCtrl = TextEditingController();
    final noteCtrl = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Add item to compare'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: 'Name')),
            TextField(controller: noteCtrl, decoration: const InputDecoration(labelText: 'Notes')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Add'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    final now = DateTime.now().millisecondsSinceEpoch.toString();
    final item = CompareItem(id: now, title: titleCtrl.text.trim(), note: noteCtrl.text.trim());
    setState(() => _items.add(item));
    await _save();
    // Try to post compare item to API (best-effort)
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.postCompareItem(userId, item.toJson());
    } catch (_) {
      // ignore network errors, item remains local
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Compare')),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: _items.isEmpty
            ? Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text('No items to compare'),
                    const SizedBox(height: 12),
                    ElevatedButton(onPressed: _addItem, child: const Text('Add Item')),
                  ],
                ),
              )
            : Column(
                children: [
                  Expanded(
                    child: ListView.separated(
                      itemBuilder: (context, i) {
                        final it = _items[i];
                        return ListTile(
                          title: Text(it.title),
                          subtitle: Text(it.note),
                          trailing: IconButton(
                            icon: const Icon(Icons.delete_outline),
                            onPressed: () async {
                              setState(() => _items.removeAt(i));
                              await _save();
                            },
                          ),
                        );
                      },
                      separatorBuilder: (_, __) => const Divider(),
                      itemCount: _items.length,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ElevatedButton(
                    onPressed: () {
                      // Simple comparison view: side-by-side names
                      showDialog<void>(
                        context: context,
                        builder: (_) => AlertDialog(
                          title: const Text('Comparison'),
                          content: SizedBox(
                            width: double.maxFinite,
                            child: SingleChildScrollView(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: _items
                                    .map((e) => Padding(
                                          padding: const EdgeInsets.symmetric(vertical: 6),
                                          child: Text('${e.title} — ${e.note}'),
                                        ))
                                    .toList(),
                              ),
                            ),
                          ),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
                          ],
                        ),
                      );
                    },
                    child: const Text('View Comparison'),
                  ),
                ],
              ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addItem,
        child: const Icon(Icons.add),
      ),
    );
  }
}
