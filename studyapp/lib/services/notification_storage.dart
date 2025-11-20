import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/notification.dart';

class NotificationStorage {
  static const _key = "notifications_list";

  static Future<void> save(List<NotificationModel> list) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonList = list.map((n) => n.toJson()).toList();
    prefs.setString(_key, jsonEncode(jsonList));
  }

  static Future<List<NotificationModel>> load() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = prefs.getString(_key);

    if (jsonStr == null) return [];

    final List decoded = jsonDecode(jsonStr);
    return decoded.map((e) => NotificationModel.fromJson(e)).toList();
  }

  static Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove(_key);
  }
}
