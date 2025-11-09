import 'package:flutter/material.dart';
import '../../../models/course.dart';

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
        title: "Flutter Basics",
        subtitle: "Build beautiful apps",
        description: "Learn to create mobile apps using Flutter.",
        category: "Development",
        lessons: 10,
        progress: 0.4,
        accentHex: "#3F51B5",
        videoAsset: "assets/videos/mov_bbb.mp4",
        duration: "3h 00m",      // added
        instructor: "John Doe",   // added
      ),
      Course(
        id: 2,
        title: "UI Design Principles",
        subtitle: "Master mobile design",
        description: "Learn layout, typography, and design thinking.",
        category: "Design",
        lessons: 8,
        progress: 0.7,
        accentHex: "#E91E63",
        videoAsset: "assets/videos/mov_bbb.mp4",
        duration: "2h 30m",      // added
        instructor: "Jane Smith", // added
      ),
      Course(
        id: 3,
        title: "AI for Everyone",
        subtitle: "Demystify AI concepts",
        description: "Understand how AI works and its real applications.",
        category: "AI",
        lessons: 12,
        progress: 0.2,
        accentHex: "#009688",
        videoAsset: "assets/videos/mov_bbb.mp4",
        duration: "4h 15m",       // added
        instructor: "Emily Johnson", // added
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
