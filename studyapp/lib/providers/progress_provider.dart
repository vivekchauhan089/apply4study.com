import 'dart:async';
import 'package:flutter/material.dart';
import 'package:drift/drift.dart';
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
          // TODO: Replace with real API call
          await Future.delayed(const Duration(milliseconds: 800));

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
}
