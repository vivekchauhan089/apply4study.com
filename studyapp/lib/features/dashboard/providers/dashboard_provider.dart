import 'package:flutter/material.dart';
import '../models/course.dart';

class DashboardProvider extends ChangeNotifier {
  final List<Course> _courses = [];
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

  String get query => _query;
  String get category => _category;

  void loadDemo() {
    _courses.clear();
    _courses.addAll([
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
      ),
    ]);
    notifyListeners();
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