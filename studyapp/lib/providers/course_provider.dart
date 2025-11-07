import 'package:flutter/foundation.dart';
import '../models/course.dart';

class CourseProvider with ChangeNotifier {
  final List<Course> _courses = [
    Course(
      id: 1,
      title: 'Flutter for Beginners',
      description: 'Learn to build mobile apps using Flutter.',
      lessons: 12,
      progress: 0.35,
      videoAsset: 'assets/videos/sample_video_placeholder.txt',
    ),
    Course(
      id: 2,
      title: 'Advanced Dart',
      description: 'Deep dive into Dart programming language.',
      lessons: 8,
      progress: 0.6,
      videoAsset: 'assets/videos/sample_video_placeholder.txt',
    ),
  ];

  List<Course> get courses => _courses;
}
