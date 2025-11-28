import 'dart:convert';
import 'package:http/http.dart' as http;
import '../utils/constants.dart';
import '../models/user_model.dart';
import '../models/product_model.dart';
import '../models/order_model.dart';
import '../models/pre_invoice_model.dart';
import '../models/weighted_slip_model.dart';
import '../models/payment_slip_model.dart';
import '../models/bank_statement_model.dart';
import 'storage_service.dart';
import 'mock_data_service.dart';

class ApiService {
  static bool get isApiActive => MockDataService.isApiActive;
  
  static void setApiStatus(bool active) {
    MockDataService.isApiActive = active;
  }
  
  static Future<Map<String, String>> _getHeaders() async {
    final token = await StorageService.getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // Auth APIs
  static Future<Map<String, dynamic>> signup(String name, String email, String mobile, String password, String userType) async {
    if (!isApiActive) {
      return MockDataService.mockSignup(name, email, mobile, password, userType);
    }
    
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/auth/signup'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': name,
          'email': email,
          'mobile': mobile,
          'password': password,
          'user_type': userType,
        }),
      );
      return jsonDecode(response.body);
    } catch (e) {
      return MockDataService.mockSignup(name, email, mobile, password, userType);
    }
  }

  // Get current user
  static Future<UserModel?> getCurrentUser() async {
    if (!isApiActive) {
      return await StorageService.getUser();
    }
    
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConstants.baseUrl}/auth/me'),
        headers: headers,
      );
      final data = jsonDecode(response.body);
      return UserModel.fromJson(data['user']);
    } catch (e) {
      return await StorageService.getUser();
    }
  }

  // Update user profile
  static Future<Map<String, dynamic>> updateUserProfile(UserModel user) async {
    if (!isApiActive) {
      await StorageService.saveUser(user);
      return {'success': true, 'message': 'Profile updated locally'};
    }
    
    try {
      final headers = await _getHeaders();
      final response = await http.put(
        Uri.parse('${AppConstants.baseUrl}/auth/profile'),
        headers: headers,
        body: jsonEncode(user.toJson()),
      );
      return jsonDecode(response.body);
    } catch (e) {
      await StorageService.saveUser(user);
      return {'success': true, 'message': 'Profile updated locally'};
    }
  }

  static Future<Map<String, dynamic>> login(String email, String password) async {
    if (!isApiActive) {
      return MockDataService.mockLogin(email, password);
    }
    
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      return jsonDecode(response.body);
    } catch (e) {
      return MockDataService.mockLogin(email, password);
    }
  }

  // Product APIs
  static Future<List<ProductModel>> getProducts({String? category}) async {
    if (!isApiActive) {
      return MockDataService.mockGetProducts(category: category);
    }
    
    try {
      final headers = await _getHeaders();
      final url = category != null 
        ? '${AppConstants.baseUrl}/products?category=$category'
        : '${AppConstants.baseUrl}/products';
      final response = await http.get(Uri.parse(url), headers: headers);
      final data = jsonDecode(response.body);
      return (data['products'] as List).map((p) => ProductModel.fromJson(p)).toList();
    } catch (e) {
      return MockDataService.mockGetProducts(category: category);
    }
  }

  static Future<ProductModel> getProductByBarcode(String barcode) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/products/barcode/$barcode'),
      headers: headers,
    );
    final data = jsonDecode(response.body);
    return ProductModel.fromJson(data['product']);
  }

  static Future<Map<String, dynamic>> addProduct(ProductModel product) async {
    if (!isApiActive) {
      return MockDataService.mockAddProduct(product);
    }
    
    try {
      final headers = await _getHeaders();
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/products'),
        headers: headers,
        body: jsonEncode(product.toJson()),
      );
      return jsonDecode(response.body);
    } catch (e) {
      return MockDataService.mockAddProduct(product);
    }
  }

  static Future<Map<String, dynamic>> updateStock(int productId, int quantity) async {
    final headers = await _getHeaders();
    final response = await http.put(
      Uri.parse('${AppConstants.baseUrl}/products/$productId/stock'),
      headers: headers,
      body: jsonEncode({'quantity': quantity}),
    );
    return jsonDecode(response.body);
  }

  // Order APIs
  static Future<Map<String, dynamic>> createOrder(OrderModel order) async {
    if (!isApiActive) {
      return MockDataService.mockCreateOrder(order);
    }
    
    try {
      final headers = await _getHeaders();
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/orders'),
        headers: headers,
        body: jsonEncode(order.toJson()),
      );
      return jsonDecode(response.body);
    } catch (e) {
      return MockDataService.mockCreateOrder(order);
    }
  }

  static Future<List<OrderModel>> getOrders({String? status}) async {
    if (!isApiActive) {
      return MockDataService.mockGetOrders(status: status);
    }
    
    try {
      final headers = await _getHeaders();
      final url = status != null
        ? '${AppConstants.baseUrl}/orders?status=$status'
        : '${AppConstants.baseUrl}/orders';
      final response = await http.get(Uri.parse(url), headers: headers);
      final data = jsonDecode(response.body);
      return (data['orders'] as List).map((o) => OrderModel.fromJson(o)).toList();
    } catch (e) {
      return MockDataService.mockGetOrders(status: status);
    }
  }

  static Future<OrderModel> getOrderById(int orderId) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/orders/$orderId'),
      headers: headers,
    );
    final data = jsonDecode(response.body);
    return OrderModel.fromJson(data['order']);
  }

  static Future<Map<String, dynamic>> updateOrderShipment(
    int orderId,
    String courierService,
    String trackingNumber,
    DateTime? deliveryDate,
  ) async {
    final headers = await _getHeaders();
    final response = await http.put(
      Uri.parse('${AppConstants.baseUrl}/orders/$orderId/shipment'),
      headers: headers,
      body: jsonEncode({
        'courier_service': courierService,
        'tracking_number': trackingNumber,
        'delivery_date': deliveryDate?.toIso8601String(),
        'status': 'shipped',
      }),
    );
    return jsonDecode(response.body);
  }

  // Payment APIs
  static Future<Map<String, dynamic>> createPayment(double amount, int orderId) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/payments'),
      headers: headers,
      body: jsonEncode({'amount': amount, 'order_id': orderId}),
    );
    return jsonDecode(response.body);
  }

  // Wallet APIs
  static Future<Map<String, dynamic>> getWalletBalance() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/wallet/balance'),
      headers: headers,
    );
    return jsonDecode(response.body);
  }

  static Future<Map<String, dynamic>> addMoneyToWallet(double amount) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/wallet/add'),
      headers: headers,
      body: jsonEncode({'amount': amount}),
    );
    return jsonDecode(response.body);
  }

  // Dashboard APIs
  static Future<Map<String, dynamic>> getDashboardStats() async {
    if (!isApiActive) {
      return MockDataService.mockGetDashboardStats();
    }
    
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('${AppConstants.baseUrl}/dashboard/stats'),
        headers: headers,
      );
      return jsonDecode(response.body);
    } catch (e) {
      return MockDataService.mockGetDashboardStats();
    }
  }

  // Sugar Cane Supply Chain APIs
  
  // Pre-Invoice APIs
  static Future<Map<String, dynamic>> createPreInvoice(PreInvoiceModel preInvoice) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/pre-invoices'),
      headers: headers,
      body: jsonEncode(preInvoice.toJson()),
    );
    return jsonDecode(response.body);
  }

  static Future<List<PreInvoiceModel>> getPreInvoices({String? status, String? consumerCode}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/pre-invoices';
    List<String> params = [];
    if (status != null) params.add('status=$status');
    if (consumerCode != null) params.add('consumer_code=$consumerCode');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return (data['pre_invoices'] as List).map((p) => PreInvoiceModel.fromJson(p)).toList();
  }

  static Future<Map<String, dynamic>> confirmPreInvoice(int preInvoiceId) async {
    final headers = await _getHeaders();
    final response = await http.put(
      Uri.parse('${AppConstants.baseUrl}/pre-invoices/$preInvoiceId/confirm'),
      headers: headers,
    );
    return jsonDecode(response.body);
  }

  // Weighted Slip APIs
  static Future<Map<String, dynamic>> uploadWeightedSlip(WeightedSlipModel weightedSlip) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/weighted-slips'),
      headers: headers,
      body: jsonEncode(weightedSlip.toJson()),
    );
    return jsonDecode(response.body);
  }

  static Future<List<WeightedSlipModel>> getWeightedSlips({String? consumerCode, String? farmerCode}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/weighted-slips';
    List<String> params = [];
    if (consumerCode != null) params.add('consumer_code=$consumerCode');
    if (farmerCode != null) params.add('farmer_code=$farmerCode');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return (data['weighted_slips'] as List).map((w) => WeightedSlipModel.fromJson(w)).toList();
  }

  static Future<Map<String, dynamic>> verifyWeightedSlip(int slipId) async {
    final headers = await _getHeaders();
    final response = await http.put(
      Uri.parse('${AppConstants.baseUrl}/weighted-slips/$slipId/verify'),
      headers: headers,
    );
    return jsonDecode(response.body);
  }

  // Payment Slip APIs
  static Future<Map<String, dynamic>> releasePayment(PaymentSlipModel paymentSlip) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/payment-slips'),
      headers: headers,
      body: jsonEncode(paymentSlip.toJson()),
    );
    return jsonDecode(response.body);
  }

  static Future<List<PaymentSlipModel>> getPaymentSlips({String? consumerCode, String? agentId}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/payment-slips';
    List<String> params = [];
    if (consumerCode != null) params.add('consumer_code=$consumerCode');
    if (agentId != null) params.add('agent_id=$agentId');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return (data['payment_slips'] as List).map((p) => PaymentSlipModel.fromJson(p)).toList();
  }

  // Bank Statement APIs
  static Future<Map<String, dynamic>> uploadBankStatement(BankStatementModel bankStatement) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/bank-statements'),
      headers: headers,
      body: jsonEncode(bankStatement.toJson()),
    );
    return jsonDecode(response.body);
  }

  static Future<List<BankStatementModel>> getBankStatements({String? consumerCode}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/bank-statements';
    if (consumerCode != null) url += '?consumer_code=$consumerCode';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return (data['bank_statements'] as List).map((b) => BankStatementModel.fromJson(b)).toList();
  }

  // Multi-Industry APIs
  static Future<List<Map<String, dynamic>>> getIndustries() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/industries'),
      headers: headers,
    );
    final data = jsonDecode(response.body);
    return List<Map<String, dynamic>>.from(data['industries'] ?? []);
  }

  static Future<List<String>> getProductCategories(String industry) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/industries/$industry/categories'),
      headers: headers,
    );
    final data = jsonDecode(response.body);
    return List<String>.from(data['categories'] ?? []);
  }

  // RFQ APIs
  static Future<Map<String, dynamic>> createRFQ(Map<String, dynamic> rfqData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/rfqs'),
      headers: headers,
      body: jsonEncode(rfqData),
    );
    return jsonDecode(response.body);
  }

  static Future<List<Map<String, dynamic>>> getRFQs({String? status, String? industry}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/rfqs';
    List<String> params = [];
    if (status != null) params.add('status=$status');
    if (industry != null) params.add('industry=$industry');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return List<Map<String, dynamic>>.from(data['rfqs'] ?? []);
  }

  static Future<Map<String, dynamic>> submitRFQResponse(int rfqId, Map<String, dynamic> responseData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/rfqs/$rfqId/responses'),
      headers: headers,
      body: jsonEncode(responseData),
    );
    return jsonDecode(response.body);
  }

  // Quality Control APIs
  static Future<Map<String, dynamic>> createQualityCheck(Map<String, dynamic> qualityData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/quality-control'),
      headers: headers,
      body: jsonEncode(qualityData),
    );
    return jsonDecode(response.body);
  }

  static Future<List<Map<String, dynamic>>> getQualityChecks({String? productId, String? status}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/quality-control';
    List<String> params = [];
    if (productId != null) params.add('product_id=$productId');
    if (status != null) params.add('status=$status');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return List<Map<String, dynamic>>.from(data['quality_checks'] ?? []);
  }

  // Company Management APIs
  static Future<Map<String, dynamic>> registerCompany(Map<String, dynamic> companyData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/companies'),
      headers: headers,
      body: jsonEncode(companyData),
    );
    return jsonDecode(response.body);
  }

  static Future<List<Map<String, dynamic>>> getSuppliers({String? industry, String? category}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/suppliers';
    List<String> params = [];
    if (industry != null) params.add('industry=$industry');
    if (category != null) params.add('category=$category');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    final data = jsonDecode(response.body);
    return List<Map<String, dynamic>>.from(data['suppliers'] ?? []);
  }

  // Enhanced Dashboard APIs
  static Future<Map<String, dynamic>> getIndustryDashboardStats(String industry) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/dashboard/$industry/stats'),
      headers: headers,
    );
    return jsonDecode(response.body);
  }

  static Future<Map<String, dynamic>> getSupplyChainReport({String? period, String? industry}) async {
    final headers = await _getHeaders();
    String url = '${AppConstants.baseUrl}/reports/supply-chain';
    List<String> params = [];
    if (period != null) params.add('period=$period');
    if (industry != null) params.add('industry=$industry');
    if (params.isNotEmpty) url += '?${params.join('&')}';
    
    final response = await http.get(Uri.parse(url), headers: headers);
    return jsonDecode(response.body);
  }

  // Compliance & Audit APIs
  static Future<Map<String, dynamic>> createAuditReport(Map<String, dynamic> auditData) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('${AppConstants.baseUrl}/audits'),
      headers: headers,
      body: jsonEncode(auditData),
    );
    return jsonDecode(response.body);
  }

  static Future<List<Map<String, dynamic>>> getComplianceRequirements(String industry) async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/compliance/$industry'),
      headers: headers,
    );
    final data = jsonDecode(response.body);
    return List<Map<String, dynamic>>.from(data['requirements'] ?? []);
  }
  
  // Legacy method for backward compatibility
  static Future<Map<String, dynamic>> getSugarCaneDashboardStats() async {
    return getIndustryDashboardStats('agriculture');
  }
}
