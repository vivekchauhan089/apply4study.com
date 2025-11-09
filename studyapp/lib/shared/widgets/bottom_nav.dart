import 'package:flutter/material.dart';

class BottomNav extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTabTapped;

  const BottomNav({
    super.key,
    required this.currentIndex,
    required this.onTabTapped,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      color: Colors.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _NavItem(
            icon: Icons.home,
            label: 'Home',
            active: currentIndex == 0,
            onTap: () => onTabTapped(0),
          ),
          _NavItem(
            icon: Icons.calendar_month,
            label: 'Planner',
            active: currentIndex == 1,
            onTap: () => onTabTapped(1),
          ),
          _NavItem(
            icon: Icons.star_border,
            label: 'Discover',
            active: currentIndex == 2,
            onTap: () => onTabTapped(2),
          ),
          _NavItem(
            icon: Icons.person_outline,
            label: 'Profile',
            active: currentIndex == 3,
            onTap: () => onTabTapped(3),
          ),
        ],
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool active;
  final VoidCallback onTap;

  const _NavItem({
    required this.icon,
    required this.label,
    required this.active,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = active
        ? Theme.of(context).colorScheme.primary
        : Colors.grey[500];

    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(fontSize: 11, color: color),
          ),
        ],
      ),
    );
  }
}
