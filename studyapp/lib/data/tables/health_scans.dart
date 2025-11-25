import 'package:drift/drift.dart';

class HealthScans extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get mobile => text()();
  TextColumn get scanType => text()();
  TextColumn get value => text()();
  TextColumn get status => text()();
  DateTimeColumn get scanDate => dateTime()();
}
