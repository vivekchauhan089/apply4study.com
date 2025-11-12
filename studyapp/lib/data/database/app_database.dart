import 'package:drift/drift.dart';

// Conditional import: uses native on mobile/desktop, stub on web
import 'app_database_stub.dart'
    if (dart.library.io) 'app_database_native.dart';

part 'app_database.g.dart';

/// ------------------------------
/// TABLES
/// ------------------------------
@DataClassName('CourseEntity')
class Courses extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text()();
  TextColumn get description => text()();
  RealColumn get progress => real().withDefault(const Constant(0.0))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

@DataClassName('LessonEntity')
class Lessons extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get courseId => integer()();
  TextColumn get title => text()();
  IntColumn get duration => integer().withDefault(const Constant(0))();
  BoolColumn get completed => boolean().withDefault(const Constant(false))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

/// ------------------------------
/// DATABASE
/// ------------------------------

@DriftDatabase(tables: [Courses, Lessons])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(openConnection());

  @override
  int get schemaVersion => 1;
}

/// SINGLETON INSTANCE
final AppDatabase appDatabase = AppDatabase();

class AppDatabaseInstance {
  static final AppDatabase instance = appDatabase;
}
