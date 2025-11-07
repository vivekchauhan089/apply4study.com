import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../features/dashboard/providers/dashboard_provider.dart';
import '../widgets/course_card.dart';
import '../../../shared/widgets/search_bar.dart';
import '../../../shared/widgets/bottom_nav.dart';
import 'package:flutter_svg/flutter_svg.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DashboardProvider>(context);
    final courses = provider.courses;
    final cats = provider.categories;

    return Scaffold(
      appBar: AppBar(
        title: Row(children: [
          SvgPicture.asset('assets/images/logo.svg', width: 36, height: 36),
          const SizedBox(width: 12),
          const Text('Apply4Study', style: TextStyle(fontWeight: FontWeight.w700)),
        ]),
        actions: [IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none))],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
        child: Column(
          children: [
            SvgPicture.asset('assets/images/banner.svg', height: 110, fit: BoxFit.cover),
            const SizedBox(height: 12),
            SearchBar(onChanged: provider.setQuery),
            const SizedBox(height: 12),
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: cats.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final cat = cats[i];
                  final selected = provider.category == cat;
                  return GestureDetector(
                    onTap: () => provider.setCategory(cat),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: selected ? Theme.of(context).colorScheme.primary : Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: const [BoxShadow(color: Color(0x04000000), blurRadius: 6)],
                      ),
                      child: Text(cat, style: TextStyle(color: selected ? Colors.white : Colors.grey[800], fontWeight: selected ? FontWeight.w600 : FontWeight.w500)),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: GridView.builder(
                itemCount: courses.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, crossAxisSpacing: 12, mainAxisSpacing: 12, childAspectRatio: 0.95),
                itemBuilder: (context, idx) => CourseCard(course: courses[idx]),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const BottomNav(),
    );
  }
}