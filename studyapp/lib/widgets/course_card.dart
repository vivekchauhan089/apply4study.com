import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  const CourseCard({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    // Fallbacks for null safety
    final title = course.title != "" ? course.title : "Untitled Course";
    final progress = course.progress != "" ? course.progress.clamp(0.0, 1.0) : 0.0;

    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(
          context,
          '/courseDetail',
          arguments: course, // ✅ Pass the entire Course object
        );
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.indigo.withOpacity(0.08),
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min, // ✅ lets Column shrink to fit content
          children: [
            CircleAvatar(
              child: const Icon(Icons.school),
              backgroundColor: Colors.indigo,
            ),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12), // Replace Spacer() with fixed spacing
            LinearProgressIndicator(value: progress),
            const SizedBox(height: 6),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('${(progress * 100).toInt()}%'),
                const Icon(Icons.play_circle_outline, size: 18),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
