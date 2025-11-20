import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/notification.dart';

class NotificationApiService {
  final String baseUrl = "https://apply4study.com/notifications";

  /// Fetch notifications with pagination
  Future<List<NotificationModel>> fetchNotifications({
    int page = 1,
    int pageSize = 20,
  }) async {
    try {
      final url = Uri.parse("$baseUrl?page=$page&pageSize=$pageSize");

      final response = await http.get(url);

      if (response.statusCode != 200) {
        // print("API ERROR: ${response.body}");
        return [];
      }

      final data = jsonDecode(response.body);

      if (data == null || data is! List) return [];

      return data.map<NotificationModel>((n) {
        return NotificationModel(
          id: n["id"].toString(),
          title: n["title"] ?? "",
          message: n["message"] ?? "",
          timestamp: DateTime.tryParse(n["timestamp"] ?? "") ?? DateTime.now(),
          image: n["image"],
          isRead: n["isRead"] ?? false,
        );
      }).toList();
    } catch (e) {
      // print("API Exception: $e");
      return [];
    }
  }
}
