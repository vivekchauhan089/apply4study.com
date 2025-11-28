import '../models/product_model.dart';
import '../models/user_model.dart';
import '../models/order_model.dart';
import '../utils/constants.dart';

class MockDataService {
  static bool isApiActive = false;

  // Sample Users
  static final List<UserModel> sampleUsers = [
    UserModel(
      id: 1,
      name: 'John Distributor',
      email: 'distributor@test.com',
      mobile: '9876543210',
      userType: AppConstants.userTypeDistributor,
      industry: 'manufacturing',
      companyName: 'ABC Distribution Ltd',
      walletBalance: 50000.0,
    ),
    UserModel(
      id: 2,
      name: 'Jane Consumer',
      email: 'consumer@test.com',
      mobile: '9876543211',
      userType: AppConstants.userTypeConsumer,
      industry: 'retail',
      companyName: 'XYZ Retail Store',
      walletBalance: 25000.0,
    ),
    UserModel(
      id: 3,
      name: 'Bob Farmer',
      email: 'farmer@test.com',
      mobile: '9876543212',
      userType: AppConstants.userTypeFarmer,
      industry: 'agriculture',
      companyName: 'Green Fields Farm',
      walletBalance: 15000.0,
    ),
  ];

  // Sample Products - Including Small Items
  static final List<ProductModel> sampleProducts = [
    // Small Consumer Items
    ProductModel(
      id: 1,
      name: 'Ballpoint Pen',
      description: 'Blue ink ballpoint pen',
      price: 5.0,
      stock: 1000,
      category: 'Stationery',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890001',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 2,
      name: 'Sewing Needle',
      description: 'Sharp steel sewing needle',
      price: 2.0,
      stock: 2000,
      category: 'Sewing Supplies',
      industry: 'textile',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890002',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 3,
      name: 'Safety Pin',
      description: 'Small metal safety pin',
      price: 1.0,
      stock: 5000,
      category: 'Hardware',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890003',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 4,
      name: 'Pencil Eraser',
      description: 'Pink rubber eraser',
      price: 3.0,
      stock: 800,
      category: 'Stationery',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890004',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 5,
      name: 'Paper Clip',
      description: 'Metal paper clip',
      price: 0.5,
      stock: 10000,
      category: 'Office Supplies',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890005',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 6,
      name: 'Rubber Band',
      description: 'Elastic rubber band',
      price: 0.25,
      stock: 15000,
      category: 'Office Supplies',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890006',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 7,
      name: 'Thumbtack',
      description: 'Sharp metal thumbtack',
      price: 1.5,
      stock: 3000,
      category: 'Office Supplies',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890007',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 8,
      name: 'Button',
      description: 'Plastic shirt button',
      price: 2.5,
      stock: 5000,
      category: 'Sewing Supplies',
      industry: 'textile',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890008',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 9,
      name: 'Stapler Pin',
      description: 'Metal stapler pin',
      price: 0.1,
      stock: 50000,
      category: 'Office Supplies',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890009',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    ProductModel(
      id: 10,
      name: 'Toothpick',
      description: 'Wooden toothpick',
      price: 0.05,
      stock: 100000,
      category: 'Personal Care',
      industry: 'retail',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890010',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
    // Bulk Items
    ProductModel(
      id: 11,
      name: 'Premium Rice',
      description: 'High quality basmati rice',
      price: 120.0,
      stock: 500,
      category: 'Crops',
      industry: 'agriculture',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890123',
      batchNumber: 'RICE001',
      unit: 'kg',
      minOrderQuantity: 10,
    ),
    ProductModel(
      id: 12,
      name: 'Steel Pipes',
      description: 'Industrial grade steel pipes',
      price: 2500.0,
      stock: 100,
      category: 'Raw Materials',
      industry: 'manufacturing',
      imageUrl: 'https://via.placeholder.com/150',
      barcode: '1234567890125',
      batchNumber: 'STEEL001',
      unit: 'piece',
      minOrderQuantity: 1,
    ),
  ];

  // Sample Orders
  static final List<OrderModel> sampleOrders = [
    OrderModel(
      id: 1,
      userId: 2,
      totalAmount: 1200.0,
      status: AppConstants.orderConfirmed,
      shippingAddress: '123 Main St, City',
      courierService: 'Blue Dart',
      trackingNumber: 'BD123456789',
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
      items: [],
    ),
    OrderModel(
      id: 2,
      userId: 2,
      totalAmount: 850.0,
      status: AppConstants.orderShipped,
      shippingAddress: '456 Oak Ave, Town',
      courierService: 'DTDC Courier',
      trackingNumber: 'DTDC987654321',
      createdAt: DateTime.now().subtract(const Duration(days: 5)),
      items: [],
    ),
  ];

  // Mock Authentication
  static Future<Map<String, dynamic>> mockLogin(String email, String password) async {
    await Future.delayed(const Duration(seconds: 1));
    
    final user = sampleUsers.firstWhere(
      (u) => u.email == email,
      orElse: () => throw Exception('User not found'),
    );

    // Simple password check (in real app, use proper authentication)
    final validPasswords = {
      'distributor@test.com': 'dist123',
      'consumer@test.com': 'cons123',
      'farmer@test.com': 'farm123',
    };

    if (validPasswords[email] != password) {
      throw Exception('Invalid password');
    }

    return {
      'success': true,
      'user': user.toJson(),
      'token': 'mock_token_${user.id}',
    };
  }

  static Future<Map<String, dynamic>> mockSignup(
    String name, String email, String mobile, String password, String userType) async {
    await Future.delayed(const Duration(seconds: 1));
    
    final newUser = UserModel(
      id: sampleUsers.length + 1,
      name: name,
      email: email,
      mobile: mobile,
      userType: userType,
      industry: 'general',
      walletBalance: 0.0,
    );

    sampleUsers.add(newUser);

    return {
      'success': true,
      'user': newUser.toJson(),
      'token': 'mock_token_${newUser.id}',
    };
  }

  // Mock Product APIs
  static Future<List<ProductModel>> mockGetProducts({String? category}) async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    if (category != null) {
      return sampleProducts.where((p) => p.category == category).toList();
    }
    return sampleProducts;
  }

  static Future<Map<String, dynamic>> mockAddProduct(ProductModel product) async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    final newProduct = ProductModel(
      id: sampleProducts.length + 1,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      industry: product.industry,
      barcode: product.barcode,
      unit: product.unit,
      minOrderQuantity: product.minOrderQuantity,
    );

    sampleProducts.add(newProduct);

    return {'success': true, 'product': newProduct.toJson()};
  }

  // Mock Dashboard Stats
  static Future<Map<String, dynamic>> mockGetDashboardStats() async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    return {
      'total_products': sampleProducts.length,
      'total_orders': sampleOrders.length,
      'total_revenue': 25000.0,
      'pending_orders': sampleOrders.where((o) => o.status == AppConstants.orderPending).length,
      'low_stock_items': sampleProducts.where((p) => p.stock < 50).length,
      'small_items_available': sampleProducts.where((p) => p.minOrderQuantity == 1).length,
      'single_unit_orders': sampleOrders.length,
    };
  }

  // Mock Orders
  static Future<List<OrderModel>> mockGetOrders({String? status}) async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    if (status != null) {
      return sampleOrders.where((o) => o.status == status).toList();
    }
    return sampleOrders;
  }

  static Future<Map<String, dynamic>> mockCreateOrder(OrderModel order) async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    final newOrder = OrderModel(
      id: sampleOrders.length + 1,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: AppConstants.orderPending,
      shippingAddress: order.shippingAddress,
      createdAt: DateTime.now(),
      items: order.items,
    );

    sampleOrders.add(newOrder);

    return {'success': true, 'order': newOrder.toJson()};
  }
}