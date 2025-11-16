import 'dart:convert';
import 'package:workmanager/workmanager.dart';
import '../data/local_db.dart';
import 'package:http/http.dart' as http;

const syncTaskName = 'backgroundSyncTask';

void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    // Initialize the DB inside background isolate
    final db = LocalDb();
    final pending = await db.getPendingProgress(100);
    if (pending.isEmpty) return Future.value(true);

    final payload = pending.map((p) => {
      'localId': p.id,
      'courseId': p.courseId,
      'progress': p.progress,
      'updatedAt': p.updatedAt.toIso8601String(),
    }).toList();

    try {
      final resp = await http.post(
        Uri.parse('https://apply4study.com/api/courses'),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc',
        },
        body: jsonEncode(payload),
      );
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        final syncedIds = List<int>.from(data['synced'] ?? []);
        for (final id in syncedIds) {
          await db.markProgressSynced(id);
        }
      }
    } catch (e) {
      // allow retry later
    }
    return Future.value(true);
  });
}
