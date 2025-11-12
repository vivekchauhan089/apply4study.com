import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart' as http;
import 'package:drift/drift.dart';
import 'dart:convert';
import '../data/local_db.dart';

class SyncService {
  final LocalDb db;
  final String serverBaseUrl;
  StreamSubscription<List<ConnectivityResult>>? _sub;

  SyncService({required this.db, required this.serverBaseUrl});

  /// Initialize connectivity listener for auto background sync
  void init() {
    _sub = Connectivity().onConnectivityChanged.listen((statuses) {
      final hasConnection = statuses.any((s) => s != ConnectivityResult.none);
      if (hasConnection) {
        _syncPending();
      }
    });
  }

  void dispose() => _sub?.cancel();

  Future<void> _syncPending() async {
    final pending = await db.getPendingProgress(50);
    if (pending.isEmpty) return;

    // prepare payload
    final payload = pending.map((p) => {
      'localId': p.id,
      'courseId': p.courseId,
      'progress': p.progress,
      'updatedAt': p.updatedAt.toIso8601String(),
    }).toList();

    try {
      final resp = await http.post(
        Uri.parse('$serverBaseUrl/api/sync/progress'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'items': payload}),
      );

      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        // backend should return list of localIds successfully applied
        final syncedIds = List<int>.from(data['synced'] ?? []);
        for (final id in syncedIds) {
          await db.markProgressSynced(id);
        }
      } else {
        // handle transient server failures with retry logic (left to workmanager)
      }
    } catch (e) {
      // network error — will retry later
    }
  }

  /// 🔄 Full sync
  Future<void> syncAll() async {
    await syncCourses();
    final courses = await db.getAllCourses();
    for (final c in courses) {
      await syncLessons(c.id);
    }
    await syncProgressQueue();
  }

  /// 🧩 Courses sync (pull + push)
  Future<void> syncCourses() async {
    try {
      final response = await http.get(Uri.parse('$serverBaseUrl/courses'));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        for (final c in data) {
          await db.upsertCourse(CoursesCompanion.insert(
            id: Value(c['id'] as int),
            title: Value(c['title'] as String?),
            description: Value(c['description'] as String?),
            lessons: Value((c['lessons'] ?? 0) as int),
            progress: Value((c['progress'] ?? 0.0).toDouble()),
            videoAsset: Value(c['videoAsset'] as String?),
            category: Value(c['category'] as String?),
            instructor: Value(c['instructor'] as String?),
            updatedAt: Value(
              c['updatedAt'] != null && c['updatedAt'].toString().isNotEmpty
                  ? DateTime.tryParse(c['updatedAt'])
                  : null,
            ),
          ));
        }
      }

      // Push unsynced local progress data
      await syncProgressQueue();
    } catch (e) {
      // print('syncCourses error: $e');
    }
  }

  /// 🧾 Sync pending progress updates
  Future<void> syncProgressQueue() async {
    final unsynced = await db.getPendingProgress(50);

    for (final p in unsynced) {
      try {
        final res = await http.post(
          Uri.parse('$serverBaseUrl/sync-progress'),
          body: jsonEncode({
            'courseId': p.courseId,
            'progress': p.progress,
            'updatedAt': p.updatedAt.toIso8601String(),
          }),
          headers: {'Content-Type': 'application/json'},
        );

        if (res.statusCode == 200) {
          await db.markProgressSynced(p.id);
        } else {
          await db.incrementAttempts(p.id);
        }
      } catch (e) {
        // print('syncProgressQueue error: $e');
        await db.incrementAttempts(p.id);
      }
    }
  }

  Future<void> syncLessons(int courseId) async {
    try {
      final response =
          await http.get(Uri.parse('$serverBaseUrl/courses/$courseId/lessons'));

      if (response.statusCode == 200) {
        // final List<dynamic> lessons = jsonDecode(response.body);

        // If you already have a LessonDao or table
        // ignore this TODO once added
        // for (final l in lessons) {
          // Example: if your LocalDb has a lessons table
          // await db.upsertLesson(LessonsCompanion(
          //   id: Value(l['id'] as int),
          //   courseId: Value(courseId),
          //   title: Value(l['title'] as String?),
          //   description: Value(l['description'] as String?),
          //   duration: Value((l['duration'] ?? 0) as int),
          //   videoUrl: Value(l['videoUrl'] as String?),
          //   updatedAt: Value(
          //     l['updatedAt'] != null && l['updatedAt'].toString().isNotEmpty
          //         ? DateTime.tryParse(l['updatedAt'])
          //         : null,
          //   ),
          // ));

          // For now, just print (useful during dev)
          // print('✅ Synced lesson: ${l['title']} (Course: $courseId)');
        // }

        // print('✅ All lessons synced for course $courseId');
      } else {
        // print('⚠️ Server returned ${response.statusCode} for course $courseId');
      }
    } catch (e) {
      // print('❌ syncLessons error for course $courseId: $e');
      // print(st);
    }
  }
}
