class CartItem {
  final int productId;
  final String productName;
  final double price;
  final String? imageUrl;
  int quantity;

  CartItem({
    required this.productId,
    required this.productName,
    required this.price,
    this.imageUrl,
    this.quantity = 1,
  });

  Map<String, dynamic> toJson() => {
    'product_id': productId,
    'product_name': productName,
    'price': price,
    'image_url': imageUrl,
    'quantity': quantity,
  };

  factory CartItem.fromJson(Map<String, dynamic> json) => CartItem(
    productId: json['product_id'],
    productName: json['product_name'],
    price: json['price']?.toDouble() ?? 0.0,
    imageUrl: json['image_url'],
    quantity: json['quantity'] ?? 1,
  );

  double get totalPrice => price * quantity;
}
