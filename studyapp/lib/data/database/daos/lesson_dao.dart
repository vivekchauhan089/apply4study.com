import 'package:drift/drift.dart';
import '../app_database.dart';

class LessonDao {
  final db = AppDatabaseInstance.instance;

  // ✅ Insert or update a lesson
  Future<int> insertLesson(LessonsCompanion lesson) {
    return db.into(db.lessons).insertOnConflictUpdate(lesson);
  }

  // ✅ Get all lessons for a specific course
  Future<List<LessonEntity>> getLessonsByCourse(int courseId) async {
    final query = db.select(db.lessons)
      ..where((tbl) => tbl.courseId.equals(courseId));
    return await query.get();
  }

  // ✅ Mark a lesson as completed
  Future<void> markCompleted(int id) async {
    await (db.update(db.lessons)..where((t) => t.id.equals(id)))
        .write(const LessonsCompanion(completed: Value(true)));
  }

  // ✅ Mark a lesson as synced
  Future<void> markSynced(int id) async {
    await (db.update(db.lessons)..where((t) => t.id.equals(id)))
        .write(const LessonsCompanion(synced: Value(true)));
  }

  // ✅ Delete all lessons
  Future<void> clearAll() async {
    await db.delete(db.lessons).go();
  }
}
