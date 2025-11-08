import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/course.dart';
import 'video_player_screen.dart';
import 'ai_chat_screen.dart';

class CourseDetail extends StatefulWidget {
  static const routeName = '/courseDetail';
  final int courseId;
  const CourseDetail({super.key, required this.courseId});

  @override
  State<CourseDetail> createState() => _CourseDetailState();
}

class _CourseDetailState extends State<CourseDetail> {
  Course? course;
  double progress = 0.0;

  @override
  void initState() {
    super.initState();
    course = sampleCourses.firstWhere((c) => c.id == widget.courseId, orElse: () => sampleCourses.first);
    progress = course!.progress;
    _loadProgress();
  }

  Future<void> _loadProgress() async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course!.id}';
    final val = prefs.getDouble(key) ?? course!.progress;
    setState(() { progress = val; });
  }

  Future<void> _saveProgress(double p) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course!.id}';
    await prefs.setDouble(key, p);
    setState(() { progress = p; });
  }

  @override
  Widget build(BuildContext context) {
    if (course == null) return const Scaffold(body: Center(child: Text('Course not found')));
    return Scaffold(
      appBar: AppBar(title: Text(course!.title)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(children: [
          Text(course!.description),
          const SizedBox(height: 12),
          LinearProgressIndicator(value: progress),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            icon: const Icon(Icons.play_arrow),
            label: const Text('Play Lesson (Video)'),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => VideoPlayerScreen(
                videoAsset: course!.videoAsset,
                onProgressUpdate: (p) => _saveProgress(p),
              )));
            },
          ),
          const SizedBox(height: 12),
          ElevatedButton.icon(
            icon: const Icon(Icons.chat),
            label: const Text('Ask AI Tutor'),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const AiChatScreen(),
                ),
              );
            },
          ),
        ]),
      ),
    );
  }
}
