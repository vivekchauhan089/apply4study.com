import 'package:flutter/material.dart';
import '../models/cart_model.dart';
import '../database/database_helper.dart';

class CartProvider with ChangeNotifier {
  List<CartItem> _items = [];
  final _db = DatabaseHelper.instance;

  List<CartItem> get items => _items;
  int get itemCount => _items.length;
  double get totalAmount => _items.fold(0, (sum, item) => sum + item.totalPrice);

  Future<void> loadCart() async {
    _items = await _db.getCartItems();
    notifyListeners();
  }

  Future<void> addItem(dynamic item) async {
    CartItem cartItem;
    if (item is CartItem) {
      cartItem = item;
    } else {
      // Convert ProductModel to CartItem
      cartItem = CartItem(
        productId: item.id ?? 0,
        productName: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1,
      );
    }
    await _db.addToCart(cartItem);
    await loadCart();
  }

  Future<void> updateQuantity(int productId, int quantity) async {
    if (quantity <= 0) {
      await removeItem(productId);
    } else {
      await _db.updateCartItem(productId, quantity);
      await loadCart();
    }
  }

  Future<void> removeItem(int productId) async {
    await _db.removeFromCart(productId);
    await loadCart();
  }

  Future<void> clearCart() async {
    await _db.clearCart();
    _items = [];
    notifyListeners();
  }
}
