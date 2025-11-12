import 'dart:convert';
// import 'dart:io';
// import 'package:path/path.dart' as p;
import 'package:http/http.dart' as http;
// import 'package:sqlite3/sqlite3.dart';
// import 'package:sqlite3_flutter_libs/sqlite3_flutter_libs.dart';

import 'daos/course_dao.dart';
import 'daos/lesson_dao.dart';
import '../models/course.dart';
import '../models/lesson.dart';
import '../../services/notification_service.dart';
import 'app_database.dart';

class SyncManager {
  final _courseDao = CourseDao();
  final _lessonDao = LessonDao();
  final _db = AppDatabaseInstance.instance;

  static void initDb() {
    // This ensures AppDatabase.instance is created
    final _ = AppDatabaseInstance.instance;
  }

  /// ✅ Insert / update local course (uses sqlite3 now)
  void upsertCourse(Course course) {
    _db.execute('''
      INSERT OR REPLACE INTO courses (id, title, description, progress, synced)
      VALUES (?, ?, ?, ?, ?)
    ''', [
      course.id,
      course.title,
      course.description,
      course.progress,
      course.synced ? 1 : 0,
    ]);
  }

  /// ✅ Load unsynced courses
  List<Course> getUnsyncedCourses() {
    final result = _db.select('SELECT * FROM courses WHERE synced = 0');
    return result.map((row) => Course.fromMap(row)).toList();
  }

  /// ✅ Sync courses with remote server
  Future<void> syncCourses({bool fromBackground = false}) async {
    try {
      // 🔹 Fetch from server
      final response = await http.get(Uri.parse('https://your-api/courses'));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final c in data) {
          _courseDao.insertCourse(Course.fromMap(c));
        }
      }

      // 🔹 Push local unsynced data
      final unsynced = getUnsyncedCourses();
      for (final c in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://your-api/sync-course'),
            body: jsonEncode(c.toMap()),
            headers: {'Content-Type': 'application/json'},
          );

          if (res.statusCode == 200) {
            _courseDao.markSynced(c.id!);
          }
        } catch (e) {
          // print("⚠️ Error syncing course ID ${c.id}: $e");
        }
      }

      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Courses synced successfully.",
        );
      }
    } catch (e) {
      // print("❌ Sync failed: $e");
    }
  }

  /// ✅ Sync Lessons (uses sqlite3 now)
  Future<void> syncLessons(int courseId, {bool fromBackground = false}) async {
    try {
      // 🔹 Fetch from server
      final response =
          await http.get(Uri.parse('https://your-api/courses/$courseId/lessons'));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final l in data) {
          _lessonDao.insertLesson(Lesson.fromMap(l));
        }
      }

      // 🔹 Push local unsynced lessons
      final localLessons = _lessonDao.getLessonsByCourse(courseId);
      final unsynced = localLessons.where((e) => e.synced == false).toList();

      for (final l in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://your-api/courses/$courseId/sync-lesson'),
            body: jsonEncode(l.toMap()),
            headers: {'Content-Type': 'application/json'},
          );

          if (res.statusCode == 200) {
            _lessonDao.markSynced(l.id!);
          }
        } catch (e) {
          // print("⚠️ Error syncing lesson ${l.id}: $e");
        }
      }

      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Lessons for course $courseId synced successfully.",
        );
      }
    } catch (e) {
      // print("❌ syncLessons($courseId) failed: $e");
    }
  }
}
