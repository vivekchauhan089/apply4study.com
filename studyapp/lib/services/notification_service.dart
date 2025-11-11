import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final _firebaseMessaging = FirebaseMessaging.instance;
  static final _localNotifications = FlutterLocalNotificationsPlugin();

  static Future<void> initialize() async {
    // 🔔 Request notification permissions
    await _firebaseMessaging.requestPermission();

    // ✅ Configure local notifications
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const settings = InitializationSettings(android: androidSettings);
    await _localNotifications.initialize(settings);

    // ✅ Foreground notification listener
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      final notification = message.notification;
      if (notification != null) {
        showLocalNotification(
          notification.title ?? 'New update',
          notification.body ?? 'Check your courses!',
        );
      }
    });

    // ✅ Background/terminated tap handling
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      // TODO: handle redirection if needed
    });

    // Print device token for testing
    final token = await _firebaseMessaging.getToken();
    print("🔥 FCM Token: $token");
  }

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
}
