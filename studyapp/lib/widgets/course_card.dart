import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  const CourseCard({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, '/course_detail', arguments: {'id': course.id});
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.indigo.withOpacity(0.08),
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(12),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          CircleAvatar(child: const Icon(Icons.school), backgroundColor: Colors.indigo),
          const SizedBox(height: 12),
          Text(course.title, style: const TextStyle(fontWeight: FontWeight.w600)),
          const Spacer(),
          LinearProgressIndicator(value: course.progress),
          const SizedBox(height: 6),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text('${(course.progress * 100).toInt()}%'),
            const Icon(Icons.play_circle_outline, size: 18),
          ])
        ]),
      ),
    );
  }
}
