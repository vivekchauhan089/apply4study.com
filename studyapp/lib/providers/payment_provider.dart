import 'package:flutter/material.dart';

class PaymentProvider with ChangeNotifier {
  double _wallet = 0.0;
  double get wallet => _wallet;

  void addFunds(double amount) {
    _wallet += amount;
    notifyListeners();
  }
}
