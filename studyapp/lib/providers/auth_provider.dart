import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  String? _userMobile;
  bool get isLoggedIn => _userMobile != null;

  void login(String mobile) {
    _userMobile = mobile;
    notifyListeners();
  }

  void logout() {
    _userMobile = null;
    notifyListeners();
  }
}
