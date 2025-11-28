class OrderModel {
  final int? id;
  final int userId;
  final double totalAmount;
  final String status;
  final String? shippingAddress;
  final String? courierService;
  final String? trackingNumber;
  final DateTime? deliveryDate;
  final DateTime createdAt;
  final List<OrderItem>? items;

  OrderModel({
    this.id,
    required this.userId,
    required this.totalAmount,
    required this.status,
    this.shippingAddress,
    this.courierService,
    this.trackingNumber,
    this.deliveryDate,
    required this.createdAt,
    this.items,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'user_id': userId,
    'total_amount': totalAmount,
    'status': status,
    'shipping_address': shippingAddress,
    'courier_service': courierService,
    'tracking_number': trackingNumber,
    'delivery_date': deliveryDate?.toIso8601String(),
    'created_at': createdAt.toIso8601String(),
  };

  factory OrderModel.fromJson(Map<String, dynamic> json) => OrderModel(
    id: json['id'],
    userId: json['user_id'],
    totalAmount: json['total_amount']?.toDouble() ?? 0.0,
    status: json['status'],
    shippingAddress: json['shipping_address'],
    courierService: json['courier_service'],
    trackingNumber: json['tracking_number'],
    deliveryDate: json['delivery_date'] != null ? DateTime.parse(json['delivery_date']) : null,
    createdAt: DateTime.parse(json['created_at']),
    items: json['items'] != null ? (json['items'] as List).map((i) => OrderItem.fromJson(i)).toList() : null,
  );
}

class OrderItem {
  final int? id;
  final int orderId;
  final int productId;
  final String productName;
  final int quantity;
  final double price;

  OrderItem({
    this.id,
    required this.orderId,
    required this.productId,
    required this.productName,
    required this.quantity,
    required this.price,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'order_id': orderId,
    'product_id': productId,
    'product_name': productName,
    'quantity': quantity,
    'price': price,
  };

  factory OrderItem.fromJson(Map<String, dynamic> json) => OrderItem(
    id: json['id'],
    orderId: json['order_id'],
    productId: json['product_id'],
    productName: json['product_name'],
    quantity: json['quantity'],
    price: json['price']?.toDouble() ?? 0.0,
  );
}
