import 'dart:async';
import 'dart:js_interop';
import 'package:web/web.dart' as web;
import 'package:flutter/material.dart';

/// Registers Firebase Messaging service worker for Flutter Web.
Future<void> registerServiceWorker() async {
  try {
    final serviceWorker = web.window.navigator.serviceWorker;
    if (serviceWorker != false) {
      // ✅ Convert Dart String → JS string (JSAny)
      final jsPath = '/firebase-messaging-sw.js'.toJS;

      // ✅ Register SW file — note: use JS interop via `callMethod`
      final promise = serviceWorker.register(jsPath);

      // ✅ Convert JS Promise → Dart Future
      final reg = await promise.toDart;
      debugPrint('✅ Service Worker registered at: ${reg.scope}');

    } else {
      // print('⚠️ Service Workers not supported in this browser.');
      return;
    }
  } catch (e) {
    // print('⚠️ Service Worker registration failed: $e');
  }
}
