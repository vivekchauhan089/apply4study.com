import 'package:flutter/material.dart';

class OcrProvider with ChangeNotifier {
  String _lastText = '';
  String get lastText => _lastText;

  void setText(String t) {
    _lastText = t;
    notifyListeners();
  }
}
