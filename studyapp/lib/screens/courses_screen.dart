import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'course_detail.dart';
import '../models/course.dart';
import '../widgets/course_card.dart';
import '../providers/course_provider.dart';
import '../theme/theme_notifier.dart';

class CoursesScreen extends StatelessWidget {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final courseProvider = Provider.of<CourseProvider>(context);
    final courses = courseProvider.courses ?? [];
    final themeNotifier = Provider.of<ThemeNotifier>(context);

    if (courses.isEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('All Courses'),
          actions: [
            IconButton(
              icon: Icon(
                themeNotifier.isDarkMode
                    ? Icons.dark_mode
                    : Icons.light_mode,
              ),
              onPressed: () {
                themeNotifier.toggleTheme();
              },
            ),
          ],
        ),
        body: const Center(child: Text('No courses available yet.')),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Courses'),
        actions: [
          IconButton(
            icon: Icon(
              themeNotifier.isDarkMode
                  ? Icons.dark_mode
                  : Icons.light_mode,
            ),
            onPressed: () {
              themeNotifier.toggleTheme();
            },
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: courses.length,
        itemBuilder: (context, index) {
          final course = courses[index];
          return ListTile(
            title: Text(course.title ?? 'Untitled'),
            subtitle: Text(course.description ?? 'No description'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => CourseDetail(courseId: course.id),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
