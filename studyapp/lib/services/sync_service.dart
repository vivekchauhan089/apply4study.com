import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SyncService {
  final LocalDb db;
  final String serverBaseUrl;
  StreamSubscription<ConnectivityResult>? _sub;

  SyncService({required this.db, required this.serverBaseUrl});

  void start() {
    _sub = Connectivity().onConnectivityChanged.listen((status) {
      if (status != ConnectivityResult.none) {
        _syncPending();
      }
    });
  }

  void dispose() => _sub?.cancel();

  Future<void> _syncPending() async {
    final pending = await db.getPendingProgress(50);
    if (pending.isEmpty) return;

    // prepare payload
    final payload = pending.map((p) => {
      'localId': p.id,
      'courseId': p.courseId,
      'progress': p.progress,
      'updatedAt': p.updatedAt.toIso8601String(),
    }).toList();

    try {
      final resp = await http.post(
        Uri.parse('$serverBaseUrl/api/sync/progress'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'items': payload}),
      );

      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        // backend should return list of localIds successfully applied
        final syncedIds = List<int>.from(data['synced'] ?? []);
        for (final id in syncedIds) {
          await db.markProgressSynced(id);
        }
      } else {
        // handle transient server failures with retry logic (left to workmanager)
      }
    } catch (e) {
      // network error — will retry later
    }
  }  
}
