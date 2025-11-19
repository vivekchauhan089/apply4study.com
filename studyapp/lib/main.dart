import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workmanager/workmanager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

import 'providers/app_provider.dart';
import 'features/dashboard/providers/dashboard_provider.dart';
import 'providers/course_provider.dart';
import 'theme/theme_notifier.dart';
import 'core/app_theme.dart';
import 'navigation/app_router.dart';
// import 'screens/login_screen.dart';

import 'config/firebase_options.dart';
// import 'utils/service_worker_registrar.dart';
import 'services/notification_service.dart';
import 'data/database/sync_manager.dart';
import 'services/background_sync.dart';
import 'data/local_db.dart';
import 'providers/progress_provider.dart';

import 'utils/permission_manager.dart';

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

  // ✅ Initialize Firebase on mobile/desktop
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  if (kIsWeb) {
    // ✅ Initialize Firebase on web
    // await registerServiceWorker();

    // Wait a bit to let SW finish registering
    await Future.delayed(Duration(seconds: 3));
  }

  // ✅ Init DB once globally
  SyncManager.initDb();

  // ✅ Optional: immediate sync when app opens
  final syncManager = SyncManager();
  await syncManager.syncCourses();
  // await syncManager.syncLessons();

  if (!kIsWeb) {
    // ✅ Safe: only initialize Background on mobile
    await BackgroundSyncService.initialize();
  } else {
    debugPrint('🌐 Skipping Background initialization on web');
  }
  
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
      child: const Apply4StudyApp(),
    ),
  );

  // ✅ Run after widget tree is ready
  WidgetsBinding.instance.addPostFrameCallback((_) async {
    if (!kIsWeb) {
      await PermissionManager.requestAllPermissions();
      // debugPrint('📱 Permissions requested on mobile/desktop');
    }
    await NotificationService.initialize();
  });
}

class Apply4StudyApp extends StatelessWidget {
  const Apply4StudyApp({super.key});

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
