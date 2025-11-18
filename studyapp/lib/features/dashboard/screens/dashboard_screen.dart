import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/course_card.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:carousel_slider/carousel_slider.dart';
import '../../../shared/widgets/search_bar.dart';

class DashboardScreen extends StatelessWidget {
  final ValueChanged<int>? onCourseSelected; // ✅ added for navigation to detail
  final VoidCallback? onAllCoursesPressed;
  final VoidCallback? onOpenAIChat;
  final VoidCallback? onProfilePressed;

  const DashboardScreen({super.key, this.onCourseSelected, this.onAllCoursesPressed, this.onOpenAIChat, this.onProfilePressed});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DashboardProvider>(context);
    final courses = provider.courses;
    final cats = provider.categories;

    return Scaffold(
      appBar: AppBar(
        title: Row(children: [
          SvgPicture.asset('images/logo.png', width: 36, height: 36),
          const SizedBox(width: 12),
        ]),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_none),
          ),
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline),
            onPressed: onOpenAIChat ?? () { 
              Navigator.pushNamed(context, '/ai_chat');
            },
          ),
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: onProfilePressed ?? () { 
              Navigator.pushNamed(context, '/profile');
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
        child: Column(
          children: [
            CarouselSlider(
              items: [
                'images/banner1.png',
                'images/banner2.png',
              ].map((path) {
                return SvgPicture.asset(
                  path,
                  fit: BoxFit.cover,
                  width: double.infinity,
                );
              }).toList(),
              options: CarouselOptions(
                height: 140,
                autoPlay: true,
                enlargeCenterPage: true,
                viewportFraction: 0.9,
                autoPlayInterval: const Duration(seconds: 4),
              ),
            ),
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
                      padding: const EdgeInsets.symmetric(
                          horizontal: 14, vertical: 8),
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
                          color:
                              selected ? Colors.white : Colors.grey[800],
                          fontWeight: selected
                              ? FontWeight.w600
                              : FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: courses.isEmpty
                  ? const Center(child: Text("No courses found"))
                  : GridView.builder(
                      itemCount: courses.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.95,
                      ),
                      itemBuilder: (context, idx) {
                        final course = courses[idx];
                        return Container(
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: CourseCard(
                            course: course,
                            onTap: () => onCourseSelected?.call(course.id), // ✅ FIX HERE
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: onAllCoursesPressed ??
        () {
          // Fallback: navigate via route if not handled by parent
          Navigator.pushNamed(context, '/courses');
        },
        label: const Text('All Courses'),
        icon: const Icon(Icons.menu_book),
      ),
    );
  }
}
