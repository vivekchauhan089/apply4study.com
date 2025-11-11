import 'package:sqflite/sqflite.dart';
import '../app_database.dart';
import '../../models/lesson.dart';

class LessonDao {
  final dbProvider = AppDatabase.instance;

  Future<int> insertLesson(Lesson lesson) async {
    final db = await dbProvider.database;
    return await db.insert('lessons', lesson.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Lesson>> getLessonsByCourse(int courseId) async {
    final db = await dbProvider.database;
    final result = await db.query('lessons', where: 'courseId = ?', whereArgs: [courseId]);
    return result.map((json) => Lesson.fromMap(json)).toList();
  }

  Future<void> markCompleted(int id) async {
    final db = await dbProvider.database;
    await db.update('lessons', {'completed': 1}, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> clearAll() async {
    final db = await dbProvider.database;
    await db.delete('lessons');
  }
}
