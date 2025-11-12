import 'package:drift/drift.dart';
import '../app_database.dart';

class CourseDao {
  final db = AppDatabaseInstance.instance;

  // ✅ Insert or update course
  Future<int> insertCourse(CoursesCompanion course) {
    return db.into(db.courses).insertOnConflictUpdate(course);
  }

  // ✅ Get all courses
  Future<List<CourseEntity>> getAllCourses() async {
    return await db.select(db.courses).get();
  }

  // ✅ Update course progress
  Future<void> updateProgress(int id, double progress) async {
    await (db.update(db.courses)..where((t) => t.id.equals(id)))
        .write(CoursesCompanion(progress: Value(progress)));
  }

  // ✅ Mark a course as synced
  Future<void> markSynced(int id) async {
    await (db.update(db.courses)..where((t) => t.id.equals(id)))
        .write(const CoursesCompanion(synced: Value(true)));
  }

  // ✅ Delete all courses
  Future<void> clearAll() async {
    await db.delete(db.courses).go();
  }
}
