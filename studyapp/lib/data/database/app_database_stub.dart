import 'package:drift/drift.dart';
import 'package:drift/wasm.dart';

LazyDatabase openConnection() {
  return LazyDatabase(() async {
    final result = await WasmDatabase.open(
      databaseName: 'localdb',
      sqlite3Uri: Uri.parse('sqlite3.wasm'), // optional
      driftWorkerUri: Uri.parse('drift_worker.js'), // optional
    );
    return result as QueryExecutor;
  });
}
