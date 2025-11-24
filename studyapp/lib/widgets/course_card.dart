import 'package:flutter/material.dart';
import '../models/course.dart';
import '../screens/courses/course_detail.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  final ValueChanged<int>? onCourseSelected;

  const CourseCard({
    super.key,
    required this.course,
    this.onCourseSelected,
  });

  double _parseProgress(dynamic p) {
    if (p is num) return p.clamp(0.0, 1.0).toDouble();
    if (p is String) {
      final val = double.tryParse(p) ?? 0.0;
      return val.clamp(0.0, 1.0);
    }
    return 0.0;
  }

  @override
  Widget build(BuildContext context) {
    final title = course.title.isNotEmpty ? course.title : "Untitled Course";
    final progress = _parseProgress(course.progress);

    return GestureDetector(
      onTap: () {
        if (onCourseSelected != null) {
          onCourseSelected!(course.id);
        } else {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => CourseDetail(
                courseId: course.id,
                onBack: () => Navigator.of(context).pop(),
              ),
            ),
          );
        }
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.indigo.withAlpha((0.08 * 255).round()),
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              backgroundColor: Colors.indigo,
              child: const Icon(Icons.school, color: Colors.white),
            ),
            const SizedBox(height: 12),
            Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 12),
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
