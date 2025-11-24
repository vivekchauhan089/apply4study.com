import 'package:workmanager/workmanager.dart';
import '../data/database/sync_manager.dart';

const String syncTask = "background_sync";

void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    if (task == syncTask) {
      SyncManager.initDb();
      final syncManager = SyncManager();
      await syncManager.syncCourses();
      // print("✅ Background sync completed");
    }
    return Future.value(true);
  });
}

class BackgroundSyncService {
  static Future<void> initialize() async {
    await Workmanager().initialize(callbackDispatcher);

    // Run every 15 minutes (minimum on Android)
    await Workmanager().registerPeriodicTask(
      "apply4study-sync",
      syncTask,
      frequency: const Duration(minutes: 15),
      existingWorkPolicy: ExistingPeriodicWorkPolicy.keep,
      constraints: Constraints(
        networkType: NetworkType.connected,
      ),
    );
  }
}
