import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/course_card.dart';
import '../../../shared/widgets/search_bar.dart';
import '../../../shared/widgets/bottom_nav.dart';
import 'package:flutter_svg/flutter_svg.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Wrap the whole screen with a provider
    return ChangeNotifierProvider(
      create: (_) => DashboardProvider(),
      child: Consumer<DashboardProvider>(
        builder: (context, provider, _) {
          final courses = provider.courses;
          final cats = provider.categories;

          return Scaffold(
            appBar: AppBar(
              title: Row(children: [
                SvgPicture.asset('images/logo.svg', width: 36, height: 36),
                const SizedBox(width: 12),
                const Text('Apply4Study', style: TextStyle(fontWeight: FontWeight.w700)),
              ]),
              actions: [
                IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none)),
                IconButton(
                  icon: const Icon(Icons.chat_bubble_outline),
                  onPressed: () {
                    Navigator.pushNamed(context, '/ai_chat');
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.person_outline),
                  onPressed: () {
                    Navigator.pushNamed(context, '/profile');
                  },
                ),
              ],
            ),
            body: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
              child: Column(
                children: [
                  SvgPicture.asset('images/banner1.svg', height: 110, fit: BoxFit.cover),
                  const SizedBox(height: 12),
                  CustomSearchBar(onChanged: provider.setQuery),
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
                              color: selected
                                  ? Theme.of(context).colorScheme.primary
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: const [
                                BoxShadow(color: Color(0x04000000), blurRadius: 6)
                              ],
                            ),
                            child: Text(
                              cat,
                              style: TextStyle(
                                color: selected ? Colors.white : Colors.grey[800],
                                fontWeight:
                                    selected ? FontWeight.w600 : FontWeight.w500,
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 12),
                  Expanded(
                    child: GridView.builder(
                      itemCount: courses.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.95,
                      ),
                      itemBuilder: (context, idx) {
                        // Alternate background effect
                        /*final bgColor = idx % 2 == 0
                            ? Colors.indigo.withOpacity(0.08)
                            : Colors.grey.withOpacity(0.08);*/

                        return Container(
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                            //color: bgColor,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: CourseCard(course: courses[idx]),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            floatingActionButton: FloatingActionButton.extended(
              onPressed: () {
                Navigator.pushNamed(context, '/courses');
              },
              label: const Text('All Courses'),
              icon: const Icon(Icons.menu_book),
            ),
            bottomNavigationBar: const BottomNav(),
          );
        },
      ),
    );
  }
}
