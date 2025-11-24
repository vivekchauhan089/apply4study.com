import 'dart:async';
import 'dart:js_interop';
import 'package:web/web.dart' as web;
import 'package:flutter/material.dart';

/// Registers Firebase Messaging service worker for Flutter Web.
Future<void> registerServiceWorker() async {
  try {
    final serviceWorker = web.window.navigator.serviceWorker;
    // Attempt to register the service worker; if the platform doesn't support
    // it, the operation will throw and be handled by the surrounding try/catch.
    final jsPath = '/firebase-messaging-sw.js'.toJS;
    final promise = serviceWorker.register(jsPath);
    final reg = await promise.toDart;
    debugPrint('✅ Service Worker registered at: ${reg.scope}');
  } catch (e) {
    // print('⚠️ Service Worker registration failed: $e');
  }
}
