import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseProvider with ChangeNotifier {
  final List<Course> _courses = [
    Course(
      id: 1,
      title: 'Flutter for Beginners',
      description: 'Learn to build mobile apps using Flutter.',
      subtitle: 'Build Mobile App', 
      lessons: 12,
      progress: 0.35,
      category: 'Writing', 
      accentHex: 'B3E5FC',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '3h 20m', // added
      instructor: 'John Doe', // added
    ),
    Course(
      id: 2,
      title: 'Advanced Dart',
      subtitle: 'Advanced Dart', 
      description: 'Deep dive into Dart programming language.',
      lessons: 8,
      progress: 0.6,
      category: 'Writing', 
      accentHex: 'B3E5FC',
      videoAsset: 'assets/videos/sample_video_placeholder.txt',
      duration: '2h 45m', // added
      instructor: 'Jane Smith', // added
    ),
    Course(
      id: 3, 
      title: 'Application Essay Mastery',
      description: 'Application Essay Mastery.', 
      subtitle: 'Structure & storytelling', 
      lessons: 9, 
      progress: 0.34, 
      category: 'Writing', 
      accentHex: 'B3E5FC',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '3h 10m', // added
      instructor: 'Emily Johnson', // added
    ),
    Course(
      id: 4, 
      title: 'Study Planner', 
      description: 'Weekly & monthly plans study planner.',
      subtitle: 'Weekly & monthly plans', 
      lessons: 6, 
      progress: 0.72, 
      category: 'Productivity', 
      accentHex: 'E1F5D9',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '1h 50m', // added
      instructor: 'Michael Brown', // added
    ),
    Course(
      id: 5, 
      title: 'Test Prep: Math',
      description: 'Deep dive into Mathematics.', 
      subtitle: 'Key strategies & drills', 
      lessons: 14, 
      progress: 0.18, 
      category: 'Test Prep', 
      accentHex: 'FFF3CC',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '4h 00m', // added
      instructor: 'Laura Wilson', // added
    ),
    Course(
      id: 6, 
      title: 'Scholarship Applications',
      description: 'Find & apply to Scholarship Applications.', 
      subtitle: 'Find & apply', 
      lessons: 7, 
      progress: 0.52, 
      category: 'Applications', 
      accentHex: 'F0E5FF',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '2h 30m', // added
      instructor: 'Robert Davis', // added
    ),
    Course(
      id: 7, 
      title: 'Interview Practice',
      description: 'Mock interviews & tips.', 
      subtitle: 'Mock interviews & tips', 
      lessons: 4, 
      progress: 0.06, 
      category: 'Career', 
      accentHex: 'FFEAE6',
      videoAsset: 'assets/videos/mov_bbb.mp4',
      duration: '1h 15m', // added
      instructor: 'Sophia Martinez', // added
    ),
  ];

  String _query = '';
  String _category = 'All';
  
  List<Course> get courses {
    var list = _courses.toList();
    if (_category != 'All') list = list.where((c) => c.category == _category).toList();
    if (_query.isNotEmpty) list = list.where((c) => c.title.toLowerCase().contains(_query.toLowerCase())).toList();
    return list;
  }

  List<String> get categories {
    final s = <String>{'All'};
    s.addAll(_courses.map((c) => c.category));
    return s.toList();
  }

  void setQuery(String q) {
    _query = q;
    notifyListeners();
  }

  void setCategory(String c) {
    _category = c;
    notifyListeners();
  }
}
