import 'package:flutter/material.dart';

class AiChatScreen extends StatefulWidget {
  final VoidCallback? onBack; // ✅ add onBack callback
  
  const AiChatScreen({super.key, this.onBack});

  @override
  State<AiChatScreen> createState() => _AiChatScreenState();
}

class _AiChatScreenState extends State<AiChatScreen> {
  final TextEditingController _ctrl = TextEditingController();
  final List<Map<String,String>> _messages = [];

  void _send() {
    final text = _ctrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.insert(0, {'from':'user','text':text});
      _messages.insert(0, {'from':'ai','text': _mockReply(text)});
    });
    _ctrl.clear();
  }

  String _mockReply(String q) {
    // Very simple mocked AI replies for learning/demo purposes.
    final lq = q.toLowerCase();
    if (lq.contains('explain') || lq.contains('what is')) {
      return 'Here is a short explanation:\n- Point 1\n- Point 2\nIf you want more details ask a specific question.';
    }
    if (lq.contains('code') || lq.contains('flutter')) {
      return 'I can help with Flutter code. Tell me which widget or feature you want.';
    }
    return 'Nice question! Could you clarify what you want to learn about "$q"?';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Tutor'),
        leading: widget.onBack != null
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: widget.onBack,
            )
          : null,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              reverse: true,
              padding: const EdgeInsets.all(12),
              itemCount: _messages.length,
              itemBuilder: (context, i) {
                final m = _messages[i];
                final isUser = m['from']=='user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical:6),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isUser ? Colors.blueAccent : Colors.grey[300],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(m['text'] ?? '', style: TextStyle(color: isUser ? Colors.white : Colors.black87)),
                  ),
                );
              },
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal:12, vertical:8),
              child: Row(children: [
                Expanded(child: TextField(controller: _ctrl, decoration: const InputDecoration(hintText: 'Ask the AI tutor...'))),
                IconButton(icon: const Icon(Icons.send), onPressed: _send),
              ]),
            ),
          )
        ],
      ),
    );
  }
}
