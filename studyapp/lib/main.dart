import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workmanager/workmanager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';

import 'providers/app_provider.dart';
import 'features/dashboard/providers/dashboard_provider.dart';
import 'providers/course_provider.dart';
import 'theme/theme_notifier.dart';
import 'core/app_theme.dart';
import 'navigation/app_router.dart';
// import 'screens/login_screen.dart';

import 'services/notification_service.dart';
import 'data/database/sync_manager.dart';
import 'services/background_sync.dart';
import 'data/local_db.dart';
import 'providers/progress_provider.dart';

const String syncTaskName = 'background_sync';

void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    SyncManager.initDb(); // ✅ ensure DB ready in background isolate
    final syncManager = SyncManager();
    await syncManager.syncCourses();
    // await syncManager.syncLessons(); // ✅ include lessons if available
    return Future.value(true);
  });
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "AIzaSyA9W_97LA7cFGJap...E_vibYjsiMwJkqddxk",
      appId: "1:888359295086:android:136b6d6a28abd1ba",
      messagingSenderId: "888359295086",
      projectId: "jobrontofsipl",
      authDomain: "https://jobrontofsipl.firebaseio.com",
      storageBucket: "jobrontofsipl.firebasestorage.app",
    ),
  );

  await NotificationService.initialize();

  // ✅ Init DB once globally
  SyncManager.initDb();

  // ✅ Optional: immediate sync when app opens
  final syncManager = SyncManager();
  await syncManager.syncCourses();
  // await syncManager.syncLessons();

  // ✅ Background sync
  await BackgroundSyncService.initialize();
  
  // ✅ Background sync (WorkManager)
  /*await Workmanager().initialize(callbackDispatcher, isInDebugMode: false);
  await Workmanager().registerPeriodicTask(
    'background_sync_task',
    syncTaskName,
    frequency: const Duration(minutes: 15), // Minimum allowed on Android
    constraints: Constraints(
      networkType: NetworkType.connected,
    ),
  );*/

  final prefs = await SharedPreferences.getInstance();
  final darkMode = prefs.getBool('darkMode') ?? false;

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DashboardProvider()),
        ChangeNotifierProvider(create: (_) => CourseProvider()),
        ChangeNotifierProvider(create: (_) => ThemeNotifier()),
        ChangeNotifierProvider(create: (_) => AppProvider(darkMode: darkMode)),
        ChangeNotifierProvider(create: (_) => ProgressProvider(LocalDb())),
      ],
      child: const LearningApp(),
    ),
  );
}

class LearningApp extends StatelessWidget {
  const LearningApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, app, _) {
        return MaterialApp(
          title: 'Apply4Study',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light(),
          darkTheme: AppTheme.dark(),
          themeMode: app.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          initialRoute: '/',
          onGenerateRoute: AppRouter.generateRoute,
        );
      },
    );
  }
}
