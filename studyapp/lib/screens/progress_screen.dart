import 'package:flutter/material.dart';
import '../models/course.dart';
import 'package:shared_preferences/shared_preferences.dart';
// import '../shared/widgets/bottom_nav.dart';

class ProgressScreen extends StatefulWidget {
  const ProgressScreen({super.key});

  @override
  State<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  Map<int, double> _progress = {};

  @override
  void initState() {
    super.initState();
    _loadAll();
  }

  Future<void> _loadAll() async {
    final prefs = await SharedPreferences.getInstance();
    final Map<int,double> temp = {};
    for (final c in sampleCourses) {
      final val = prefs.getDouble('course_progress_${c.id}') ?? c.progress;
      temp[c.id] = val;
    }
    setState(() { _progress = temp; });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Your Progress')),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: sampleCourses.map((c) {
          final p = _progress[c.id] ?? c.progress;
          return Card(
            child: ListTile(
              title: Text(c.title),
              subtitle: LinearProgressIndicator(value: p),
              trailing: Text('${(p*100).toInt()}%'),
            ),
          );
        }).toList(),
      ),
      // bottomNavigationBar: const BottomNav(),
    );
  }
}
