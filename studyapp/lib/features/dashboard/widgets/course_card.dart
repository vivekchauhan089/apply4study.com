import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  const CourseCard({super.key, required this.course});

  Color _hexToColor(String hex) => Color(int.parse('0xFF${hex.replaceAll('#', '')}'));

  @override
  Widget build(BuildContext context) {
    final accent = _hexToColor(course.accentHex);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: () {
          Navigator.pushNamed(
            context,
            '/courseDetail',
            arguments: course, // ✅ Pass the entire Course object
          );
        },
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(14),
            boxShadow: const [BoxShadow(color: Color(0x0A000000), blurRadius: 18, offset: Offset(0, 10))],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(children: [Container(width: 8, height: 36, decoration: BoxDecoration(color: accent, borderRadius: BorderRadius.circular(8))), const SizedBox(width: 12), Expanded(child: Text(course.title, style: const TextStyle(fontWeight: FontWeight.w600)))],),
              const SizedBox(height: 8),
              Text(course.subtitle, style: TextStyle(color: Colors.grey[600], fontSize: 13)),
              const Spacer(),
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Row(children: [
                  SizedBox(width: 44, height: 44, child: Stack(alignment: Alignment.center, children: [CircularProgressIndicator(value: course.progress, strokeWidth: 4, color: Theme.of(context).colorScheme.primary, backgroundColor: Colors.grey.shade200), Text('${(course.progress * 100).round()}%', style: const TextStyle(fontSize: 12))])),
                  const SizedBox(width: 12),
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('${course.lessons} lessons', style: TextStyle(color: Colors.grey[700], fontSize: 12)), const SizedBox(height: 4), Text(course.category, style: TextStyle(color: Colors.grey[500], fontSize: 12))])
                ]),
                Icon(Icons.chevron_right, color: Colors.grey[400])
              ])
            ],
          ),
        ),
      ),
    );
  }
}