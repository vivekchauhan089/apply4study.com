// import 'dart:ffi';
// import 'package:sqlite3/sqlite3.dart';
// import 'package:sqlite3_flutter_libs/sqlite3_flutter_libs.dart';
import '../app_database.dart';
import '../../models/lesson.dart';

class LessonDao {
  final dbProvider = AppDatabaseInstance.instance;

  void insertLesson(Lesson lesson) {
    dbProvider.db.execute(
      'INSERT OR REPLACE INTO lessons (id, courseId, title, duration, completed) VALUES (?, ?, ?, ?, ?)',
      [
        lesson.id,
        lesson.courseId,
        lesson.title,
        lesson.duration,
        lesson.completed ? 1 : 0,
      ],
    );
  }

  List<Lesson> getLessonsByCourse(int courseId) {
    final result = dbProvider.db.select(
      'SELECT * FROM lessons WHERE courseId = ?',
      [courseId],
    );

    return result.map((row) {
      return Lesson(
        id: row['id'] as int,
        courseId: row['courseId'] as int,
        title: row['title'] as String,
        duration: row['duration'] as int,
        completed: (row['completed'] as int) == 1,
      );
    }).toList();
  }

  void markCompleted(int id) {
    dbProvider.db.execute(
      'UPDATE lessons SET completed = 1 WHERE id = ?',
      [id],
    );
  }

  void clearAll() {
    dbProvider.db.execute('DELETE FROM lessons');
  }

  void markSynced(int lessonId) {
    dbProvider.db.execute(
      'UPDATE lessons SET synced = 1 WHERE id = ?',
      [lessonId],
    );
  }
}
