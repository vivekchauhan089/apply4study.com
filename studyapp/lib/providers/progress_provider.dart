import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:drift/drift.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../data/local_db.dart';

class ProgressProvider with ChangeNotifier, WidgetsBindingObserver {
  final LocalDb db;
  bool _disposed = false;
  Timer? _autoSyncTimer;

  ProgressProvider(this.db) {
    // ✅ Register app lifecycle observer
    WidgetsBinding.instance.addObserver(this);

    // ✅ Start background timer sync every 5 minutes
    _autoSyncTimer = Timer.periodic(const Duration(minutes: 5), (_) {
      syncPendingProgress();
    });
  }

  // 🔹 Safe notify to prevent “after dispose” errors
  void safeNotify() {
    if (!_disposed) notifyListeners();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _autoSyncTimer?.cancel();
    _disposed = true;
    super.dispose();
  }

  // 🔹 Handle app resume to trigger background sync
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      syncPendingProgress();
    }
  }

  /// 🔸 Update progress locally and queue for sync
  Future<void> updateProgress(int courseId, double progress) async {
    try {
      await db.upsertCourse(CoursesCompanion(
        id: Value(courseId),
        progress: Value(progress),
        updatedAt: Value(DateTime.now()),
      ));
      await db.addProgressToQueue(courseId, progress);
      safeNotify();
    } catch (e, st) {
      debugPrint('❌ updateProgress error: $e\n$st');
    }
  }

  /// 🔸 Sync any pending progress records
  Future<void> syncPendingProgress() async {
    try {
      final pending = await db.getPendingProgress(10);
      if (pending.isEmpty) return;

      debugPrint('🔄 Syncing ${pending.length} progress entries...');
      for (final entry in pending) {
        try {
          await _syncProgressToAPI(entry.courseId, entry.progress);

          // ✅ Mark as synced
          await db.markProgressSynced(entry.id);
        } catch (_) {
          await db.incrementAttempts(entry.id);
        }
      }

      safeNotify();
    } catch (e, st) {
      debugPrint('❌ syncPendingProgress error: $e\n$st');
    }
  }

  /// 🔸 Sync progress to API
  Future<void> _syncProgressToAPI(int courseId, double progress) async {
    final prefs = await SharedPreferences.getInstance();
    final mobile = prefs.getString('mobile') ?? '';
    
    await http.post(
      Uri.parse('https://apply4study.com/api/progress/update'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'mobile': mobile,
        'course_id': courseId,
        'progress': progress,
      }),
    );
  }

  /// 🔸 Get enrolled courses from API
  Future<List<Map<String, dynamic>>> getEnrolledCourses() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final mobile = prefs.getString('mobile') ?? '';
      
      final response = await http.post(
        Uri.parse('https://apply4study.com/api/courses/enrolled'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'mobile': mobile}),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return List<Map<String, dynamic>>.from(data['courses'] ?? []);
      }
      return [];
    } catch (e) {
      debugPrint('❌ getEnrolledCourses error: $e');
      return [];
    }
  }
}
