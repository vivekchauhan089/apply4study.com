import 'package:drift/drift.dart';

// ======= TABLES =======
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