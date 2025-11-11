import '../database/daos/course_dao.dart';
import '../database/daos/lesson_dao.dart';
import '../../models/course.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SyncManager {
  final _courseDao = CourseDao();
  final _lessonDao = LessonDao();

  Future<void> syncCourses() async {
    // Fetch from server
    final response = await http.get(Uri.parse('https://your-api/courses'));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      for (final c in data) {
        await _courseDao.insertCourse(Course.fromMap(c));
      }
    }

    // Push local unsynced data
    final localCourses = await _courseDao.getAllCourses();
    for (final c in localCourses.where((e) => e.synced == false)) {
      await http.post(Uri.parse('https://your-api/sync-course'),
          body: jsonEncode(c.toMap()),
          headers: {'Content-Type': 'application/json'});
      await _courseDao.markSynced(c.id!);
    }
  }

  Future<void> syncLessons() async {
    // Fetch from server
    final response = await http.get(Uri.parse('https://your-api/lessons'));
    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      for (final l in data) {
        await _lessonDao.insertLesson(Lesson.fromMap(l));
      }
    }
  }

}