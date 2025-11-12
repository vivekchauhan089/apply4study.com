import 'package:drift/drift.dart';

// ======= TABLES =======
class ProgressSyncs extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get courseId => integer()();
  RealColumn get progress => real()();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
  BoolColumn get synced => boolean().withDefault(const Constant(false))();
  IntColumn get attempts => integer().withDefault(const Constant(0))();
}