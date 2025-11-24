import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiException implements Exception {
  final String message;
  ApiException(this.message);
  @override
  String toString() => 'ApiException: $message';
}

class ApiService {
  ApiService._private();
  static final ApiService instance = ApiService._private();

  /// Configure your backend base URL here or via environment
  String baseUrl = 'https://api.example.com';

  Map<String, String> get _defaultHeaders => {'Content-Type': 'application/json'};

  Future<List<dynamic>> fetchDeals({String query = ''}) async {
    final uri = Uri.parse('$baseUrl/deals').replace(queryParameters: query.isEmpty ? null : {'q': query});
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load deals (${res.statusCode})');
  }

  Future<List<dynamic>> fetchOrders(String userId) async {
    final uri = Uri.parse('$baseUrl/users/$userId/orders');
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load orders (${res.statusCode})');
  }

  Future<void> createOrder(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/orders');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to create order (${res.statusCode})');
  }

  Future<void> sendSupportMessage(Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/support/messages');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to send support message (${res.statusCode})');
  }

  Future<List<dynamic>> fetchNearby({String? category, double? lat, double? lng}) async {
    final params = <String, String>{};
    if (category != null) params['category'] = category;
    if (lat != null && lng != null) {
      params['lat'] = lat.toString();
      params['lng'] = lng.toString();
    }
    final uri = Uri.parse('$baseUrl/nearby').replace(queryParameters: params.isEmpty ? null : params);
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load nearby (${res.statusCode})');
  }

  Future<List<dynamic>> fetchJobs({String query = '', int page = 1}) async {
    final uri = Uri.parse('$baseUrl/jobs').replace(queryParameters: {'q': query, 'page': page.toString()});
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load jobs (${res.statusCode})');
  }

  Future<List<dynamic>> fetchRestaurants({String query = ''}) async {
    final uri = Uri.parse('$baseUrl/restaurants').replace(queryParameters: query.isEmpty ? null : {'q': query});
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load restaurants (${res.statusCode})');
  }

  Future<void> createBooking(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/bookings');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to create booking (${res.statusCode})');
  }

  Future<void> createPayment(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/payments');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to create payment (${res.statusCode})');
  }

  Future<List<dynamic>> fetchPayments(String userId) async {
    final uri = Uri.parse('$baseUrl/users/$userId/payments');
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load payments (${res.statusCode})');
  }

  Future<List<dynamic>> fetchReminders(String userId) async {
    final uri = Uri.parse('$baseUrl/users/$userId/reminders');
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load reminders (${res.statusCode})');
  }

  Future<void> createReminder(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/reminders');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to create reminder (${res.statusCode})');
  }

  Future<List<dynamic>> fetchFriends(String userId) async {
    final uri = Uri.parse('$baseUrl/users/$userId/friends');
    final res = await http.get(uri, headers: _defaultHeaders);
    if (res.statusCode == 200) return jsonDecode(res.body) as List<dynamic>;
    throw ApiException('Failed to load friends (${res.statusCode})');
  }

  Future<void> updateFriendLocation(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/friends/location');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 200 || res.statusCode == 204) return;
    throw ApiException('Failed to update friend location (${res.statusCode})');
  }

  Future<void> createExpense(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/expenses');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to create expense (${res.statusCode})');
  }

  Future<void> postCompareItem(String userId, Map<String, dynamic> payload) async {
    final uri = Uri.parse('$baseUrl/users/$userId/compare');
    final res = await http.post(uri, headers: _defaultHeaders, body: jsonEncode(payload));
    if (res.statusCode == 201) return;
    throw ApiException('Failed to post compare item (${res.statusCode})');
  }

  // Add more endpoints as needed (food, cab, payments, reminders)
}
