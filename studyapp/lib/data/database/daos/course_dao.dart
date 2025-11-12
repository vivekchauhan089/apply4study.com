// import 'dart:ffi';
// import 'package:sqlite3/sqlite3.dart';
// import 'package:sqlite3_flutter_libs/sqlite3_flutter_libs.dart';
import '../app_database.dart';
import '../../models/course.dart';

class CourseDao {
  final dbProvider = AppDatabaseInstance.instance;

  void insertCourse(Course course) {
    dbProvider.db.execute(
      '''
      INSERT OR REPLACE INTO courses (id, title, description, progress, synced)
      VALUES (?, ?, ?, ?, ?)
      ''',
      [
        course.id,
        course.title,
        course.description,
        course.progress,
        course.synced ? 1 : 0,
      ],
    );
  }

  List<Course> getAllCourses() {
    final result = dbProvider.db.select('SELECT * FROM courses');
    return result.map((row) {
      return Course(
        id: row['id'] as int,
        title: row['title'] as String,
        description: row['description'] as String,
        progress: row['progress'] as double,
        synced: (row['synced'] as int) == 1,
      );
    }).toList();
  }

  void updateProgress(int id, double progress) {
    dbProvider.db.execute(
      'UPDATE courses SET progress = ? WHERE id = ?',
      [progress, id],
    );
  }

  void markSynced(int id) {
    dbProvider.db.execute(
      'UPDATE courses SET synced = 1 WHERE id = ?',
      [id],
    );
  }

  void clearAll() {
    dbProvider.db.execute('DELETE FROM courses');
  }
}
