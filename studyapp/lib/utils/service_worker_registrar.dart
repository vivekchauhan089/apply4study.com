import 'dart:async';
import 'package:universal_html/html.dart' as html;
import 'package:flutter/material.dart';

/// Registers Firebase Messaging service worker for Flutter Web.
Future<void> registerServiceWorker() async {
  try {
    final serviceWorker = html.window.navigator.serviceWorker;
    if (serviceWorker != null) {
      await serviceWorker.register('/firebase-messaging-sw.js');
      debugPrint('✅ Service Worker registered');
    }
  } catch (e) {
    // print('⚠️ Service Worker registration failed: $e');
  }
}
