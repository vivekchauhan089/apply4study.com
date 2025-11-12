import 'package:drift/drift.dart';

// ======= TABLES =======
class Lessons extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get courseId => integer()();
  TextColumn get title => text()();
  IntColumn get duration => integer()();
  BoolColumn get completed => boolean().withDefault(const Constant(false))();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
}
