import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

part 'local_db.g.dart'; // generated file

class Courses extends Table {
  IntColumn get id => integer()();
  TextColumn get title => text().nullable()();
  TextColumn get description => text().nullable()();
  IntColumn get lessons => integer().withDefault(const Constant(0))();
  RealColumn get progress => real().withDefault(const Constant(0.0))();
  TextColumn get videoAsset => text().nullable()();
  TextColumn get category => text().nullable()();
  TextColumn get instructor => text().nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
  @override
  Set<Column> get primaryKey => {id};
}

class ProgressSyncs extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get courseId => integer()();
  RealColumn get progress => real()();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
  IntColumn get attempts => integer().withDefault(const Constant(0))();
}

@DriftDatabase(tables: [Courses, ProgressSyncs])
class LocalDb extends _$LocalDb {
  LocalDb() : super(_openConnection());

  @override
  int get schemaVersion => 1;

  // Courses helpers
  Future<void> upsertCourse(CoursesCompanion entry) =>
      into(courses).insertOnConflictUpdate(entry);

  Future<List<Course>> getAllCourses() => select(courses).map((r) => Course.fromRow(r)).get();

  // Progress queue helpers
  Future<int> addProgressToQueue(int courseId, double progress) {
    return into(progressSyncs).insert(ProgressSyncsCompanion(
      courseId: Value(courseId),
      progress: Value(progress),
      updatedAt: Value(DateTime.now()),
      synced: Value(false),
    ));
  }

  Future<List<ProgressSync>> getPendingProgress(int maxRows) {
    return (select(progressSyncs)..where((t) => t.synced.equals(false))..limit(maxRows))
      .get();
  }

  Future<void> markProgressSynced(int id) =>
      (update(progressSyncs)..where((t) => t.id.equals(id))).write(ProgressSyncsCompanion(synced: Value(true)));

  Future<void> incrementAttempts(int id) =>
      (update(progressSyncs)..where((t) => t.id.equals(id))).write(ProgressSyncsCompanion(attempts: Value(customStatement("attempts + 1"))));
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'app_db.sqlite'));
    return NativeDatabase(file);
  });
}

// small helpers to convert drift result rows into model objects
class Course {
  final int id;
  final String? title;
  final String? description;
  final int lessons;
  final double progress;
  final String? videoAsset;
  final String? category;
  final String? instructor;
  final DateTime? updatedAt;

  Course({
    required this.id,
    this.title,
    this.description,
    required this.lessons,
    required this.progress,
    this.videoAsset,
    this.category,
    this.instructor,
    this.updatedAt,
  });

  factory Course.fromRow(DataClass r) {
    // r is a drift-generated data class; adapt if needed
    // This helper is optional — you can use the generated types directly.
    throw UnimplementedError('Map drift results to Course if needed');
  }
}

class ProgressSync {
  final int id;
  final int courseId;
  final double progress;
  final DateTime updatedAt;
  final bool synced;
  final int attempts;

  ProgressSync({
    required this.id,
    required this.courseId,
    required this.progress,
    required this.updatedAt,
    required this.synced,
    required this.attempts,
  });

  factory ProgressSync.fromRow(DataClass r) {
    // r is a drift-generated data class; adapt if needed
    // This helper is optional — you can use the generated types directly.
    throw UnimplementedError('Map drift results to ProgressSync if needed');
  }
}