import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class SupportMessage {
  final String id;
  final String subject;
  final String message;
  final DateTime createdAt;

  SupportMessage({required this.id, required this.subject, required this.message, required this.createdAt});

  Map<String, dynamic> toJson() => {'id': id, 'subject': subject, 'message': message, 'createdAt': createdAt.toIso8601String()};
  static SupportMessage fromJson(Map<String, dynamic> m) => SupportMessage(id: m['id'], subject: m['subject'], message: m['message'], createdAt: DateTime.parse(m['createdAt']));
}

class SupportScreen extends StatefulWidget {
  const SupportScreen({super.key});

  @override
  State<SupportScreen> createState() => _SupportScreenState();
}

class _SupportScreenState extends State<SupportScreen> {
  static const _prefsKey = 'support_messages';
  List<SupportMessage> _messages = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList(_prefsKey) ?? [];
    if (!mounted) return;
    setState(() => _messages = raw.map((s) => SupportMessage.fromJson(jsonDecode(s) as Map<String, dynamic>)).toList());
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_prefsKey, _messages.map((m) => jsonEncode(m.toJson())).toList());
  }

  void _openWhatsAppBot() {
    Navigator.pushNamed(context, '/whatsapp-chat');
  }

  Future<void> _compose() async {
    final subj = TextEditingController();
    final body = TextEditingController();
    // Capture messenger before any async operations
    final messenger = ScaffoldMessenger.of(context);
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Contact Support'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: subj, decoration: const InputDecoration(labelText: 'Subject')),
            TextField(controller: body, decoration: const InputDecoration(labelText: 'Message'), maxLines: 4),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Send')),
        ],
      ),
    );
    if (ok != true) return;
    final now = DateTime.now();
    final msg = SupportMessage(id: now.millisecondsSinceEpoch.toString(), subject: subj.text.trim(), message: body.text.trim(), createdAt: now);
    if (!mounted) return;
    setState(() => _messages.insert(0, msg));
    await _save();
    // Try sending to server; if it fails, keep local copy and notify user
    try {
      final prefs = await SharedPreferences.getInstance();
      final mobile = prefs.getString('mobile') ?? '';
      
      final response = await http.post(
        Uri.parse('https://apply4study.com/api/support/email'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'mobile': mobile,
          'subject': msg.subject,
          'message': msg.message,
          'createdAt': msg.createdAt.toIso8601String(),
        }),
      );
      
      if (!mounted) return;
      if (response.statusCode == 200) {
        messenger.showSnackBar(const SnackBar(content: Text('Message sent to support')));
      } else {
        messenger.showSnackBar(const SnackBar(content: Text('Message saved locally. Support will contact you.')));
      }
    } catch (_) {
      if (!mounted) return;
      messenger.showSnackBar(const SnackBar(content: Text('Message saved locally. Support will contact you.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Help & Support')),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _compose,
                    icon: const Icon(Icons.email),
                    label: const Text('Email Support'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _openWhatsAppBot,
                    icon: const Icon(Icons.chat),
                    label: const Text('WhatsApp Bot'),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            const Text('Messages sent (local history):', style: TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Expanded(
              child: _messages.isEmpty
                  ? const Center(child: Text('No support messages yet'))
                  : ListView.separated(
                      itemCount: _messages.length,
                      separatorBuilder: (_, __) => const Divider(),
                      itemBuilder: (context, i) {
                        final m = _messages[i];
                        return ListTile(
                          title: Text(m.subject),
                          subtitle: Text('${m.message}\n${m.createdAt.toLocal()}'),
                          isThreeLine: true,
                          trailing: IconButton(
                            icon: const Icon(Icons.delete_outline),
                            onPressed: () async {
                              setState(() => _messages.removeAt(i));
                              await _save();
                            },
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
