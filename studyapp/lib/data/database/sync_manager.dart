import 'dart:convert';
import 'package:drift/drift.dart';
import 'package:http/http.dart' as http;
import 'daos/course_dao.dart';
import 'daos/lesson_dao.dart';
import '../../services/notification_service.dart';
import 'app_database.dart';

class SyncManager {
  final _courseDao = CourseDao();
  final _lessonDao = LessonDao();
  final _db = AppDatabaseInstance.instance;

  static void initDb() {
    // Ensures AppDatabase.instance is created
    final _ = AppDatabaseInstance.instance;
  }

  /// ✅ Insert / update local course (via Drift)
  Future<void> upsertCourse(CourseEntity course) async {
    await _courseDao.insertCourse(CoursesCompanion.insert(
      id: Value(course.id),
      title: course.title,
      description: course.description,
      progress: Value(course.progress),
      synced: Value(course.synced),
    ));
  }

  /// ✅ Load unsynced courses
  Future<List<CourseEntity>> getUnsyncedCourses() async {
    final query = _db.select(_db.courses)
      ..where((tbl) => tbl.synced.equals(false));
    return await query.get();
  }

  /// ✅ Sync courses with remote server
  Future<void> syncCourses({bool fromBackground = false}) async {
    try {
      final courseRequestData = {
        'category': 'programming',
        'user_id': '1',
        'source': 'mobile_app',
      };
      // 🔹 Fetch from server
      final response = await http.post(
        Uri.parse('https://apply4study.com/api/courses'),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc',
        },
        body: jsonEncode(courseRequestData), // ✅ convert to JSON
      );
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final c in data) {
          await _courseDao.insertCourse(CoursesCompanion.insert(
            id: Value(c['id']),
            title: c['title'],
            description: c['description'],
            progress: Value((c['progress'] ?? 0.0).toDouble()),
            synced: const Value(true),
          ));
        }
      }

      // 🔹 Push local unsynced data
      final unsynced = await getUnsyncedCourses();
      for (final c in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://apply4study.com/api/courses'),
            body: jsonEncode({
              'id': c.id,
              'title': c.title,
              'description': c.description,
              'progress': c.progress,
              'synced': c.synced,
            }),
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc',
            },
          );

          if (res.statusCode == 200) {
            await _courseDao.markSynced(c.id);
          }
        } catch (_) {
          // ignore network errors for now
        }
      }

      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Courses synced successfully.",
        );
      }
    } catch (_) {
      // ignore global sync errors
    }
  }

  /// ✅ Sync lessons for a course (Drift)
  Future<void> syncLessons(int courseId, {bool fromBackground = false}) async {
    try {
      // 🔹 Fetch from server
      final lessonRequestData = {
        'course_id': '1',
        'user_id': '1',
        'source': 'mobile_app',
      };

      final response = await http.post(
        Uri.parse('https://apply4study.com/api/courses/$courseId/lessons'),
        body: jsonEncode(lessonRequestData),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc',
        },
      );
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final l in data) {
          await _lessonDao.insertLesson(LessonsCompanion.insert(
            id: Value(l['id']),
            courseId: l['courseId'],
            title: l['title'],
            duration: Value(l['duration'] ?? 0),
            completed: Value(l['completed'] ?? false),
            synced: Value(l['synced'] ?? false),
          ));
        }
      }

      // 🔹 Push local unsynced lessons
      final localLessons = await _lessonDao.getLessonsByCourse(courseId);
      final unsynced = localLessons.where((e) => e.synced == false).toList();

      for (final l in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://apply4study.com/api/courses/$courseId/sync-lesson'),
            body: jsonEncode({
              'id': l.id,
              'courseId': l.courseId,
              'title': l.title,
              'duration': l.duration,
              'completed': l.completed,
            }),
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc',
            },
          );

          if (res.statusCode == 200) {
            await _lessonDao.markCompleted(l.id);
          }
        } catch (_) {
          // ignore lesson sync errors
        }
      }

      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Lessons for course $courseId synced successfully.",
        );
      }
    } catch (_) {
      // ignore global sync errors
    }
  }
}
