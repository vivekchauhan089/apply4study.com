import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/wasm.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'package:flutter/foundation.dart' show kIsWeb;

part 'app_database.g.dart';

class Courses extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get title => text()();
  TextColumn get description => text()();
  RealColumn get progress => real().withDefault(const Constant(0.0))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}

class Lessons extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get courseId => integer()();
  TextColumn get title => text()();
  IntColumn get duration => integer().withDefault(const Constant(0))();
  BoolColumn get completed => boolean().withDefault(const Constant(false))();
}

@DriftDatabase(tables: [Courses, Lessons])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  int get schemaVersion => 1;
}

LazyDatabase _openConnection() {
  if (kIsWeb) {
    // ✅ Use IndexedDB on Chrome/web
    return LazyDatabase(() async {
      final result = await WasmDatabase.open(
        databaseName: 'localdb',
        sqlite3Uri: Uri.parse('sqlite3.wasm'), // optional
        driftWorkerUri: Uri.parse('drift_worker.js'), // optional
      );
      return result as QueryExecutor;
    });
  } else {
    // ✅ Use SQLite on desktop
    return LazyDatabase(() async {
      final dir = await getApplicationDocumentsDirectory();
      final path = p.join(dir.path, 'apply4study.db');
      return NativeDatabase(File(path));
    });
  }
}


final AppDatabase appDatabase = AppDatabase();

class AppDatabaseInstance {
  static final AppDatabase instance = appDatabase;
}