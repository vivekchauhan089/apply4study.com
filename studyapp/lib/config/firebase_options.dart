import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return const FirebaseOptions(
        apiKey: "AIzaSyC_0qpwRw0xCKKb_Txl4qMloOPG_mpv9VY",
        authDomain: "jobrontofsipl.firebaseapp.com",
        databaseURL: "https://jobrontofsipl.firebaseio.com",
        projectId: "jobrontofsipl",
        storageBucket: "jobrontofsipl.firebasestorage.app",
        messagingSenderId: "888359295086",
        appId: "1:888359295086:web:6bd5e43f7389ed644aae7f",
        measurementId: "G-VCGSDE0XJ8"
      );
    }
    return const FirebaseOptions(
      apiKey: "AIzaSyA9W_97LA7cFGJapE_vibYjsiMwJkqddxk",
      appId: "1:888359295086:android:136b6d6a28abd1ba",
      messagingSenderId: "888359295086",
      projectId: "jobrontofsipl",
      storageBucket: "jobrontofsipl.firebasestorage.app",        
    );
  }
}
