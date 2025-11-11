import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'daos/course_dao.dart';
import 'daos/lesson_dao.dart';
import '../models/course.dart';
import '../models/lesson.dart';
import '../../services/notification_service.dart';

class SyncManager {
  final _courseDao = CourseDao();
  final _lessonDao = LessonDao();

  static Database? _db;

  // ✅ Initialize local DB
  static Future<void> initDb() async {
    final dbPath = await getDatabasesPath();
    _db = await openDatabase(
      join(dbPath, 'apply4study.db'),
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            progress REAL,
            synced INTEGER,
            videoAsset TEXT
          )
        ''');
      },
      version: 1,
    );
  }

  // ✅ Insert / update local course
  Future<void> upsertCourse(Course course) async {
    await _db?.insert(
      'courses',
      course.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  // ✅ Load unsynced courses
  Future<List<Course>> getUnsyncedCourses() async {
    final maps = await _db?.query('courses', where: 'synced = ?', whereArgs: [0]) ?? [];
    return maps.map((e) => Course.fromMap(e)).toList();
  }

  // ✅ Sync courses with remote server
  Future<void> syncCourses({bool fromBackground = false}) async {
    try {
      print("🔄 Sync started ${fromBackground ? '(background)' : '(manual)'}");

      // ✅ Fetch from server
      final response = await http.get(Uri.parse('https://your-api/courses'));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final c in data) {
          await _courseDao.insertCourse(Course.fromMap(c));
        }
        print("✅ Courses pulled from server: ${data.length}");
      } else {
        print("⚠️ Server fetch failed: ${response.statusCode}");
      }

      // ✅ Push local unsynced data
      final localCourses = await _courseDao.getAllCourses();
      final unsynced = localCourses.where((e) => e.synced == false).toList();

      for (final c in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://your-api/sync-course'),
            body: jsonEncode(c.toMap()),
            headers: {'Content-Type': 'application/json'},
          );

          if (res.statusCode == 200) {
            await _courseDao.markSynced(c.id!);
            print("📤 Synced course ID: ${c.id}");
          } else {
            print("⚠️ Failed to sync course ID ${c.id}: ${res.statusCode}");
          }
        } catch (e) {
          print("❌ Error syncing course ID ${c.id}: $e");
        }
      }

      // ✅ Optional: show a small notification if this was background sync
      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Courses synced successfully.",
        );
      }

      print("✅ Sync finished successfully");
    } catch (e, st) {
      print("❌ Sync failed: $e\n$st");
    }
  }

  /// 📚 Sync Lessons (same structure as courses)
  Future<void> syncLessons(int courseId, {bool fromBackground = false}) async {
    try {
      print("🔄 Syncing Lessons for Course ID: $courseId "
          "${fromBackground ? '(background)' : '(manual)'}");

      // ✅ Fetch lessons for the given course from the server
      final response = await http.get(
        Uri.parse('https://your-api/courses/$courseId/lessons'),
      );

      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final l in data) {
          await _lessonDao.insertLesson(Lesson.fromMap(l));
        }
        print("✅ Pulled ${data.length} lessons for course $courseId");
      } else {
        print("⚠️ Lesson fetch failed for course $courseId: ${response.statusCode}");
      }

      // ✅ Push local unsynced lessons for that course
      final localLessons = await _lessonDao.getLessonsByCourse(courseId);
      final unsynced = localLessons.where((e) => e.synced == false).toList();

      for (final l in unsynced) {
        try {
          final res = await http.post(
            Uri.parse('https://your-api/courses/$courseId/sync-lesson'),
            body: jsonEncode(l.toMap()),
            headers: {'Content-Type': 'application/json'},
          );

          if (res.statusCode == 200) {
            await _lessonDao.markSynced(l.id!);
            print("📤 Synced lesson ID: ${l.id} (course $courseId)");
          } else {
            print("⚠️ Failed to sync lesson ${l.id}: ${res.statusCode}");
          }
        } catch (e) {
          print("❌ Error syncing lesson ${l.id}: $e");
        }
      }

      // 🔔 Optional: background notification
      if (fromBackground) {
        await NotificationService.showLocalNotification(
          "Background Sync Complete",
          "Lessons for course $courseId synced successfully.",
        );
      }
    } catch (e, st) {
      print("❌ syncLessons($courseId) failed: $e\n$st");
    }
  }

}