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
      Course(id: 'c1', title: 'Application Essay Mastery', subtitle: 'Structure & storytelling', progress: 0.34, lessons: 9, category: 'Writing', accentHex: 'B3E5FC'),
      Course(id: 'c2', title: 'Study Planner', subtitle: 'Weekly & monthly plans', progress: 0.72, lessons: 6, category: 'Productivity', accentHex: 'E1F5D9'),
      Course(id: 'c3', title: 'Test Prep: Math', subtitle: 'Key strategies & drills', progress: 0.18, lessons: 14, category: 'Test Prep', accentHex: 'FFF3CC'),
      Course(id: 'c4', title: 'Scholarship Applications', subtitle: 'Find & apply', progress: 0.52, lessons: 7, category: 'Applications', accentHex: 'F0E5FF'),
      Course(id: 'c5', title: 'Interview Practice', subtitle: 'Mock interviews & tips', progress: 0.06, lessons: 4, category: 'Career', accentHex: 'FFEAE6'),
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