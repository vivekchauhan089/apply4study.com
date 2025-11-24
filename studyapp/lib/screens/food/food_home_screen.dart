import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class Restaurant {
  final String id;
  final String name;
  final String cuisine;
  final double rating;

  Restaurant({required this.id, required this.name, required this.cuisine, required this.rating});
}

class MenuItemModel {
  final String id;
  final String restaurantId;
  final String name;
  final String desc;
  final double price;

  MenuItemModel({required this.id, required this.restaurantId, required this.name, required this.desc, required this.price});
}

class CartItem {
  final MenuItemModel item;
  int qty;
  CartItem({required this.item, this.qty = 1});

  double get total => item.price * qty;
}

class OrderModel {
  final String id;
  final String restaurantName;
  final List<CartItem> items;
  String status; // e.g., placed, preparing, on_the_way, delivered
  final DateTime placedAt;

  OrderModel({required this.id, required this.restaurantName, required this.items, required this.status, required this.placedAt});

  Map<String, dynamic> toJson() => {
        'id': id,
        'restaurantName': restaurantName,
        'items': items.map((c) => {'id': c.item.id, 'name': c.item.name, 'price': c.item.price, 'qty': c.qty}).toList(),
        'status': status,
        'placedAt': placedAt.toIso8601String()
      };

  static OrderModel fromJson(Map<String, dynamic> j) {
    final itemsJson = (j['items'] as List).cast<Map<String, dynamic>>();
    final items = itemsJson.map((m) {
      final mi = MenuItemModel(id: m['id'], restaurantId: 'unknown', name: m['name'], desc: '', price: (m['price'] as num).toDouble());
      return CartItem(item: mi, qty: (m['qty'] as num).toInt());
    }).toList();
    return OrderModel(id: j['id'], restaurantName: j['restaurantName'], items: items, status: j['status'], placedAt: DateTime.parse(j['placedAt']));
  }
}

class FoodHomeScreen extends StatefulWidget {
  const FoodHomeScreen({super.key});

  @override
  State<FoodHomeScreen> createState() => _FoodHomeScreenState();
}

class _FoodHomeScreenState extends State<FoodHomeScreen> {
  final List<Restaurant> _restaurants = [
    Restaurant(id: 'r1', name: 'Spice Villa', cuisine: 'Indian', rating: 4.5),
    Restaurant(id: 'r2', name: 'Green Bowl', cuisine: 'Healthy', rating: 4.3),
    Restaurant(id: 'r3', name: 'Pasta Corner', cuisine: 'Italian', rating: 4.6),
  ];

  final List<MenuItemModel> _menuItems = [];

  final List<CartItem> _cart = [];
  final List<OrderModel> _orders = [];

  int _selectedIndex = 0; // 0: Browse, 1: Cart, 2: Orders
  String _search = '';

  @override
  void initState() {
    super.initState();
    _buildMockMenu();
    _loadOrders();
    _tryLoadFromApi();
  }

  Future<void> _tryLoadFromApi() async {
    try {
      final data = await ApiService.instance.fetchRestaurants();
      final List<Restaurant> fromApi = [];
      for (final item in data) {
        if (item is Map<String, dynamic>) {
          fromApi.add(Restaurant(
            id: item['id']?.toString() ?? DateTime.now().millisecondsSinceEpoch.toString(),
            name: item['name'] ?? item['title'] ?? 'Restaurant',
            cuisine: item['cuisine'] ?? 'Various',
            rating: (item['rating'] is num) ? (item['rating'] as num).toDouble() : 4.0,
          ));
        }
      }
      if (fromApi.isNotEmpty) {
        setState(() {
          _restaurants.clear();
          _restaurants.addAll(fromApi);
        });
      }
    } catch (_) {
      // ignore and use mock data
    }
  }

  void _buildMockMenu() {
    _menuItems.addAll([
      MenuItemModel(id: 'm1', restaurantId: 'r1', name: 'Butter Chicken', desc: 'Creamy tomato gravy', price: 250),
      MenuItemModel(id: 'm2', restaurantId: 'r1', name: 'Paneer Tikka', desc: 'Grilled cottage cheese', price: 180),
      MenuItemModel(id: 'm3', restaurantId: 'r2', name: 'Quinoa Salad', desc: 'Healthy greens and quinoa', price: 160),
      MenuItemModel(id: 'm4', restaurantId: 'r2', name: 'Smoothie Bowl', desc: 'Fruits and seeds', price: 140),
      MenuItemModel(id: 'm5', restaurantId: 'r3', name: 'Spaghetti Alfredo', desc: 'Creamy alfredo sauce', price: 220),
      MenuItemModel(id: 'm6', restaurantId: 'r3', name: 'Margherita Pizza', desc: 'Classic cheese pizza', price: 280),
    ]);
  }

  Future<void> _loadOrders() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('orders') ?? [];
    setState(() {
      _orders.clear();
      _orders.addAll(raw.map((s) => OrderModel.fromJson(jsonDecode(s) as Map<String, dynamic>)));
    });
  }

  Future<void> _saveOrders() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = _orders.map((o) => jsonEncode(o.toJson())).toList();
    await prefs.setStringList('orders', raw);
  }

  void _addToCart(MenuItemModel item) {
    final existing = _cart.where((c) => c.item.id == item.id).toList();
    setState(() {
      if (existing.isNotEmpty) {
        existing.first.qty++;
      } else {
        _cart.add(CartItem(item: item, qty: 1));
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Added to cart')));
  }

  void _removeFromCart(CartItem c) {
    setState(() {
      _cart.removeWhere((x) => x.item.id == c.item.id);
    });
  }

  double get _cartTotal => _cart.fold(0.0, (p, e) => p + e.total);

  Future<void> _checkout(Restaurant r) async {
    if (_cart.isEmpty) return;
    final id = DateTime.now().millisecondsSinceEpoch.toString();
    final order = OrderModel(id: id, restaurantName: r.name, items: List.from(_cart), status: 'placed', placedAt: DateTime.now());
    setState(() {
      _orders.insert(0, order);
      _cart.clear();
      _selectedIndex = 2; // switch to orders
    });
    await _saveOrders();
    // Try to send order to server (best-effort)
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.createOrder(userId, order.toJson());
    } catch (_) {
      // ignore
    }
    if (!mounted) return;
    _simulateOrderProgress(order);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Order placed')));
  }

  void _simulateOrderProgress(OrderModel order) {
    // progress through statuses over time
    final steps = ['preparing', 'on_the_way', 'delivered'];
    var i = 0;
    Timer.periodic(const Duration(seconds: 8), (t) async {
      if (!mounted) {
        t.cancel();
        return;
      }
      setState(() {
        order.status = steps[i];
      });
      await _saveOrders();
      i++;
      if (i >= steps.length) t.cancel();
    });
  }

  Widget _buildBrowse() {
    final filtered = _restaurants.where((r) => r.name.toLowerCase().contains(_search.toLowerCase()) || r.cuisine.toLowerCase().contains(_search.toLowerCase())).toList();
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Search restaurants or cuisine'),
            onChanged: (v) => setState(() => _search = v),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: filtered.length,
            itemBuilder: (context, idx) {
              final r = filtered[idx];
              final items = _menuItems.where((m) => m.restaurantId == r.id).toList();
              return ExpansionTile(
                title: Text(r.name),
                subtitle: Text('${r.cuisine} • ${r.rating} ⭐'),
                children: items.map((m) => ListTile(
                      title: Text(m.name),
                      subtitle: Text('${m.desc} • ₹${m.price.toStringAsFixed(0)}'),
                      trailing: ElevatedButton(onPressed: () => _addToCart(m), child: const Text('Add')),
                    )).toList(),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCart() {
    return Column(
      children: [
        Expanded(
          child: _cart.isEmpty
              ? const Center(child: Text('Cart is empty'))
              : ListView.builder(
                  itemCount: _cart.length,
                  itemBuilder: (context, i) {
                    final c = _cart[i];
                    return ListTile(
                      title: Text(c.item.name),
                      subtitle: Text('₹${c.item.price.toStringAsFixed(0)} x ${c.qty}'),
                      trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                        IconButton(
                          icon: const Icon(Icons.remove),
                          onPressed: () => setState(() {
                            if (c.qty > 1) {
                              c.qty--;
                            } else {
                              _removeFromCart(c);
                            }
                          }),
                        ),
                        Text('${c.qty}'),
                        IconButton(
                          icon: const Icon(Icons.add),
                          onPressed: () => setState(() {
                            c.qty++;
                          }),
                        ),
                      ]),
                    );
                  },
                ),
        ),
        Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text('Total: ₹${_cartTotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              ElevatedButton(
                onPressed: _cart.isEmpty ? null : () {
                  // pick a restaurant from cart items (assume same restaurant for simplicity)
                  final restId = _cart.first.item.restaurantId;
                  final rest = _restaurants.firstWhere((r) => r.id == restId);
                  _checkout(rest);
                },
                child: const Text('Checkout'),
              )
            ],
          ),
        )
      ],
    );
  }

  Widget _buildOrders() {
    if (_orders.isEmpty) return const Center(child: Text('No orders yet'));
    return ListView.builder(
      itemCount: _orders.length,
      itemBuilder: (context, i) {
        final o = _orders[i];
        final total = o.items.fold(0.0, (p, c) => p + c.total);
        return Card(
          child: ListTile(
            title: Text('${o.restaurantName} • ₹${total.toStringAsFixed(2)}'),
            subtitle: Text('${o.status} • ${o.placedAt}'),
            onTap: () {
              showModalBottomSheet(context: context, builder: (c) => Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('Order ${o.id}', style: const TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  ...o.items.map((ci) => Text('${ci.item.name} x${ci.qty} - ₹${ci.total.toStringAsFixed(0)}')),
                  const SizedBox(height: 8),
                  Text('Status: ${o.status}'),
                ]),
              ));
            },
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final body = _selectedIndex == 0 ? _buildBrowse() : (_selectedIndex == 1 ? _buildCart() : _buildOrders());
    return Scaffold(
      appBar: AppBar(title: const Text('Food Delivery')),
      body: SafeArea(child: body),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (i) => setState(() => _selectedIndex = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.restaurant), label: 'Browse'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: 'Cart'),
          BottomNavigationBarItem(icon: Icon(Icons.list_alt), label: 'Orders'),
        ],
      ),
    );
  }
}
