import 'package:flutter/material.dart';

class DashboardProvider with ChangeNotifier {
  // Example demo data
  List<String> _courses = [];
  List<String> get courses => _courses;

  void loadDemo() {
    _courses = ['Course A', 'Course B', 'Course C'];
    notifyListeners();
  }
}
