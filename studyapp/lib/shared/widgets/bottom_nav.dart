import 'package:flutter/material.dart';

class BottomNav extends StatelessWidget {
  const BottomNav({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      color: Colors.transparent,
      child: const Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        _NavItem(icon: Icons.home, label: 'Home', active: true),
        _NavItem(icon: Icons.calendar_month, label: 'Planner'),
        _NavItem(icon: Icons.star_border, label: 'Discover'),
        _NavItem(icon: Icons.person_outline, label: 'Profile'),
      ]),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool active;
  const _NavItem({required this.icon, required this.label, this.active = false});

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, color: active ? Theme.of(context).colorScheme.primary : Colors.grey[500]),
      const SizedBox(height: 4),
      Text(label, style: TextStyle(fontSize: 11, color: active ? Theme.of(context).colorScheme.primary : Colors.grey[500])),
    ]);
  }
}