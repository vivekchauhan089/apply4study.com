import 'package:flutter/material.dart';

class SearchBar extends StatefulWidget {
  final ValueChanged<String>? onChanged;
  const SearchBar({super.key, this.onChanged});

  @override
  State<SearchBar> createState() => _SearchBarState();
}

class _SearchBarState extends State<SearchBar> {
  final TextEditingController _ctrl = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 46,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), boxShadow: const [BoxShadow(color: Color(0x08000000), blurRadius: 10)]),
      child: Row(children: [
        const Icon(Icons.search, color: Colors.grey),
        const SizedBox(width: 8),
        Expanded(
          child: TextField(
            controller: _ctrl,
            decoration: const InputDecoration.collapsed(hintText: 'Search courses, tips, deadlines...'),
            onChanged: widget.onChanged,
          ),
        ),
        if (_ctrl.text.isNotEmpty)
          GestureDetector(
            onTap: () {
              _ctrl.clear();
              widget.onChanged?.call('');
              setState(() {});
            },
            child: const Icon(Icons.close, size: 18, color: Colors.grey),
          ),
      ]),
    );
  }
}