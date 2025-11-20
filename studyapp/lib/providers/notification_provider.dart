import 'package:flutter/material.dart';
import '../models/notification.dart';
import '../services/notification_storage.dart';
import '../services/notification_api.dart';

class NotificationProvider extends ChangeNotifier {
  List<NotificationModel> notifications = [];

  int _page = 1;
  final int _pageSize = 20;
  bool _hasMore = true;

  int get unreadCount =>
      notifications.where((n) => !n.isRead).length;

  NotificationProvider() {
    loadInitial();
  }

  // 🔹 Load local + fetch fresh API data
  Future<void> loadInitial() async {
    await loadLocal();
    await fetchFromApi(reset: true);
  }

  // 🔹 Load from local storage only
  Future<void> loadLocal() async {
    notifications = await NotificationStorage.load();
    notifyListeners();
  }

  // 🔹 Fetch from API (with pagination)
  Future<bool> fetchFromApi({bool reset = false}) async {
    final api = NotificationApiService();
    final newData = await api.fetchNotifications(page: _page, pageSize: _pageSize);

    if (reset) {
      notifications = newData;
      _hasMore = newData.length == _pageSize;
    } else {
      if (newData.isEmpty) {
        _hasMore = false;
        return false;
      }

      notifications.addAll(newData);
      _hasMore = newData.length == _pageSize;
    }

    await NotificationStorage.save(notifications);
    notifyListeners();
    return true;
  }

  // 🔹 Mark notification as read
  void markAsRead(String id) {
    final index = notifications.indexWhere((n) => n.id == id);
    if (index != -1) {
      notifications[index].isRead = true;
      NotificationStorage.save(notifications);
      notifyListeners();
    }
  }

  // 🔹 Pull to refresh
  Future refreshNotifications() async {
    _page = 1;
    return fetchFromApi(reset: true);
  }

  // 🔹 Infinite scroll
  Future<bool> loadMore() async {
    if (!_hasMore) return false;
    _page++;
    await fetchFromApi();
    return _hasMore;
  }

  // 🔹 Delete one notification
  void deleteNotification(String id) {
    notifications.removeWhere((n) => n.id == id);
    NotificationStorage.save(notifications);
    notifyListeners();
  }

  // 🔹 Clear all
  void clearAll() {
    notifications.clear();
    NotificationStorage.clear();
    notifyListeners();
  }

  // 🔹 Human-friendly timestamps
  String humanTime(DateTime ts) {
    final now = DateTime.now();
    final diff = now.difference(ts);

    if (diff.inSeconds < 60) return "${diff.inSeconds}s ago";
    if (diff.inMinutes < 60) return "${diff.inMinutes}m ago";
    if (diff.inHours < 24) return "${diff.inHours}h ago";

    if (diff.inDays == 1) {
      return "Yesterday ${_formatTime(ts)}";
    }

    if (diff.inDays < 7) {
      return "${diff.inDays} days ago";
    }

    return "${ts.day}/${ts.month}/${ts.year} ${_formatTime(ts)}";
  }

  String _formatTime(DateTime ts) {
    final hour = ts.hour > 12 ? ts.hour - 12 : ts.hour;
    final ampm = ts.hour >= 12 ? "PM" : "AM";
    final minute = ts.minute.toString().padLeft(2, '0');
    return "$hour:$minute $ampm";
  }

  // 🔹 Group notifications by Today / Yesterday / Older
  Map<String, List<NotificationModel>> grouped() {
    final Map<String, List<NotificationModel>> out = {
      "Today": [],
      "Yesterday": [],
      "Older": [],
    };

    final now = DateTime.now();

    for (var n in notifications) {
      final diff = now.difference(n.timestamp).inDays;

      if (diff == 0) {
        out["Today"]!.add(n);
      } else if (diff == 1) {
        out["Yesterday"]!.add(n);
      } else {
        out["Older"]!.add(n);
      }
    }

    return out;
  }
}
