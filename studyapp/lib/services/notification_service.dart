import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:app_settings/app_settings.dart'; // Add this in pubspec.yaml

import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../features/dashboard/screens/dashboard_screen.dart';
import '../screens/ai_chat_screen.dart';
import '../screens/profile_screen.dart';

class NotificationService {
  static final _firebaseMessaging = FirebaseMessaging.instance;
  static final _localNotifications = FlutterLocalNotificationsPlugin();
  static bool _isCheckingAfterSettings = false;
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  /// Initialize Firebase and local notifications safely
  static Future<void> initialize() async {
    try {
      if (kIsWeb) {
        debugPrint('🌐 Initializing FCM for Web...');
        await _firebaseMessaging.requestPermission();
        String? token = await _firebaseMessaging.getToken(
          vapidKey: "BL7SlflJR7q7Sk4bOBUg9dWiBhCx1SxrD6E88n-gbKUbus_08JznP291vyyQxrWWjIcrtW7FzytIhge3qMQBFd0", // ✅ found in Firebase Cloud Messaging settings
        );
        debugPrint("🔥 Web FCM Token: $token");

        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
          debugPrint('📩 Web FCM message: ${message.notification?.title}');
          // You can show a custom in-app notification UI here
        });
      } else {
        debugPrint('📱 Initializing FCM for Mobile...');
        final context = navigatorKey.currentContext;
        if (context != null) {
          await _handleNotificationPermission(context);
        } else {
          debugPrint('⚠️ Context not available yet — skipping permission request.');
        }

        // ✅ Local notifications only for Android/iOS
        const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
        const settings = InitializationSettings(android: androidSettings);
        await _localNotifications.initialize(settings);

        // ✅ Foreground listener (mobile only)
        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
          final notification = message.notification;
          if (notification != null) {
            showLocalNotification(
              notification.title ?? 'New update',
              notification.body ?? 'Check your courses!',
            );
          }
        });

        // ✅ Background/terminated tap
        FirebaseMessaging.onMessageOpenedApp.listen((message) {
          debugPrint('📲 Notification clicked: ${message.data}');
        });

        final token = await _firebaseMessaging.getToken();
        debugPrint("🔥 FCM Token: $token");
      }
    } on FirebaseException catch (e) {
     debugPrint('⚠️ Notification init error: $e');
    } catch (e, st) {
      debugPrint('⚠️ Notification init error: $e');
      debugPrint('Stack trace: $st');
    }
  }

  /// Handles notification permission safely
  static Future<void> _handleNotificationPermission(BuildContext context) async {
    try {
      final settings = await _firebaseMessaging.getNotificationSettings();
      debugPrint('🔔 Current permission: ${settings.authorizationStatus}');

      if (settings.authorizationStatus == AuthorizationStatus.notDetermined ||
          settings.authorizationStatus == AuthorizationStatus.denied) {
        final newSettings = await _firebaseMessaging.requestPermission(
          alert: true,
          badge: true,
          sound: true,
        );

        if (newSettings.authorizationStatus == AuthorizationStatus.authorized) {
          debugPrint('✅ User granted permission');
          _showSnackBar(context, 'Notifications enabled successfully ✅');
        } else if (newSettings.authorizationStatus == AuthorizationStatus.provisional) {
          debugPrint('⚠️ User granted provisional permission');
        } else {
          debugPrint('🚫 Permission denied or blocked');
        }
      } else if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        debugPrint('✅ Permission already granted — no need to re-request.');
      } else if (settings.authorizationStatus == AuthorizationStatus.denied) {
        _showPermissionBlockedDialog(context);
      }
    } on FirebaseException catch (e) {
      if (e.code == 'permission-blocked') {
        debugPrint('🔒 Permission permanently blocked.');
        _showPermissionBlockedDialog(context);
      } else {
        debugPrint('❌ FirebaseException during permission check: ${e.code}');
      }
    } catch (e, st) {
      debugPrint('⚠️ Unknown permission error: $e');
      debugPrint('Stack trace: $st');
    }
  }

  /// Dialog for blocked permission with Settings redirection
  static void _showPermissionBlockedDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Notifications Blocked'),
        content: const Text(
          'You’ve permanently blocked notifications for this app. '
          'Please enable them manually in your phone’s Settings.',
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _openSettingsAndRecheck(context);
            },
            child: const Text('Open Settings'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
        ],
      ),
    );
  }

  /// Opens app settings and rechecks permission when user returns
  static void _openSettingsAndRecheck(BuildContext context) {
    _isCheckingAfterSettings = true;
    AppSettings.openAppSettings();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startSettingsReturnWatcher(context);
    });
  }

  /// Re-check permission after app resumes from Settings
  static void _startSettingsReturnWatcher(BuildContext context) {
    WidgetsBinding.instance.addObserver(
      _SettingsLifecycleWatcher(context),
    );
  }

  /// Show local notification
  static Future<void> showLocalNotification(String title, String body) async {
    const details = NotificationDetails(
      android: AndroidNotificationDetails(
        'apply4study_channel',
        'Course Updates',
        importance: Importance.high,
        priority: Priority.high,
      ),
    );
    await _localNotifications.show(0, title, body, details);
  }

  /// Show simple snackbar for feedback
  static void _showSnackBar(BuildContext context, String message) {
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          behavior: SnackBarBehavior.floating,
          backgroundColor: Colors.green.shade600,
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }
}

/// Lifecycle watcher to detect when app returns from Settings
class _SettingsLifecycleWatcher extends WidgetsBindingObserver {
  final BuildContext context;

  _SettingsLifecycleWatcher(this.context);

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed &&
        NotificationService._isCheckingAfterSettings) {
      NotificationService._isCheckingAfterSettings = false;
      debugPrint('🔁 App returned from Settings — rechecking permissions...');
      NotificationService._handleNotificationPermission(context);
      WidgetsBinding.instance.removeObserver(this);
    }
  }

  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    return MaterialApp(
      title: 'Learning App',
      theme: appProvider.isDarkMode ? ThemeData.dark() : ThemeData.light(),
      initialRoute: '/',
      routes: {
        '/': (context) => const DashboardScreen(),
        '/ai_chat': (context) => const AiChatScreen(),
        '/profile': (context) => const ProfileScreen(),
        // Add other routes here
      },
    );
  }
  
}
