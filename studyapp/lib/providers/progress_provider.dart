class ProgressProvider with ChangeNotifier {
  final LocalDb db;
  ProgressProvider(this.db);

  Future<void> updateProgress(int courseId, double progress) async {
    // 1) update local courses table for immediate UI
    await db.upsertCourse(CoursesCompanion(
      id: Value(courseId),
      progress: Value(progress),
      updatedAt: Value(DateTime.now()),
    ));

    // 2) queue sync
    await db.addProgressToQueue(courseId, progress);

    notifyListeners();
  }

  Future<void> syncPendingProgress() async {
    final pending = await db.getPendingProgress(10);
    for (final entry in pending) {
      try {
        // Simulate network call
        await Future.delayed(const Duration(seconds: 1));
        // On success
        await db.markProgressSynced(entry.id);
      } catch (e) {
        // On failure, increment attempts
        await db.incrementAttempts(entry.id);
      }
    }
    notifyListeners();
  }
  
}