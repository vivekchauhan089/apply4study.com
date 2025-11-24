import 'package:flutter/material.dart';

class JobsProvider with ChangeNotifier {
  List<Map<String, String>> _jobs = [];
  List<Map<String, String>> get jobs => _jobs;

  void loadSampleJobs() {
    _jobs = [
      {'title': 'Intern - Flutter Dev', 'company': 'Acme'},
      {'title': 'Part-time Tutor', 'company': 'LearnCo'},
    ];
    notifyListeners();
  }
}
