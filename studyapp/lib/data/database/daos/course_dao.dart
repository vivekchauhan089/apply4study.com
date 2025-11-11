import 'package:sqflite/sqflite.dart';
import '../app_database.dart';
import '../../models/course.dart';

class CourseDao {
  final dbProvider = AppDatabase.instance;

  Future<int> insertCourse(Course course) async {
    final db = await dbProvider.database;
    return await db.insert('courses', course.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Course>> getAllCourses() async {
    final db = await dbProvider.database;
    final result = await db.query('courses');
    return result.map((json) => Course.fromMap(json)).toList();
  }

  Future<void> updateProgress(int id, double progress) async {
    final db = await dbProvider.database;
    await db.update('courses', {'progress': progress}, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> markSynced(int id) async {
    final db = await dbProvider.database;
    await db.update('courses', {'synced': 1}, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> clearAll() async {
    final db = await dbProvider.database;
    await db.delete('courses');
  }
}
