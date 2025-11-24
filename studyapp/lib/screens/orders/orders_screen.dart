import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

enum OrderStatus { placed, preparing, onTheWay, delivered, cancelled }

class Order {
  final String id;
  final String title;
  final double amount;
  OrderStatus status;
  final DateTime createdAt;

  Order({
    required this.id,
    required this.title,
    required this.amount,
    required this.status,
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'amount': amount,
        'status': status.index,
        'createdAt': createdAt.toIso8601String(),
      };

  static Order fromJson(Map<String, dynamic> m) => Order(
        id: m['id'] as String,
        title: m['title'] as String,
        amount: (m['amount'] as num).toDouble(),
        status: OrderStatus.values[(m['status'] as int)],
        createdAt: DateTime.parse(m['createdAt'] as String),
      );
}

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  static const _prefsKey = 'orders';
  List<Order> _orders = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
    // Try fetch from API, otherwise fall back to local storage
    try {
      final data = await ApiService.instance.fetchOrders(userId);
      setState(() {
        _orders = data.map<Order>((e) => Order.fromJson(e as Map<String, dynamic>)).toList();
        _loading = false;
      });
      return;
    } catch (_) {
      // ignore and fallback
    }

    final raw = prefs.getStringList(_prefsKey) ?? [];
    setState(() {
      _orders = raw.map((s) => Order.fromJson(jsonDecode(s) as Map<String, dynamic>)).toList();
      _loading = false;
    });
  }

  Future<void> _saveOrders() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = _orders.map((o) => jsonEncode(o.toJson())).toList();
    await prefs.setStringList(_prefsKey, raw);
  }

  Future<void> _addSampleOrder() async {
    final now = DateTime.now();
    final order = Order(
      id: now.millisecondsSinceEpoch.toString(),
      title: 'Sample Order ${_orders.length + 1}',
      amount: (50 + (_orders.length * 10)).toDouble(),
      status: OrderStatus.placed,
      createdAt: now,
    );
    setState(() => _orders.insert(0, order));
    await _saveOrders();
  }

  Future<void> _cancelOrder(Order order) async {
    final idx = _orders.indexWhere((o) => o.id == order.id);
    if (idx == -1) return;
    setState(() => _orders[idx].status = OrderStatus.cancelled);
    await _saveOrders();
  }

  String _statusLabel(OrderStatus s) {
    switch (s) {
      case OrderStatus.placed:
        return 'Placed';
      case OrderStatus.preparing:
        return 'Preparing';
      case OrderStatus.onTheWay:
        return 'On the way';
      case OrderStatus.delivered:
        return 'Delivered';
      case OrderStatus.cancelled:
        return 'Cancelled';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Orders')),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _orders.isEmpty
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('No orders yet'),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: _addSampleOrder,
                        child: const Text('Create sample order'),
                      ),
                    ],
                  ),
                )
              : ListView.separated(
                  padding: const EdgeInsets.all(12),
                  itemBuilder: (context, i) {
                    final o = _orders[i];
                    return ListTile(
                      tileColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      title: Text(o.title),
                      subtitle: Text('${_statusLabel(o.status)} • ${o.createdAt.toLocal()}'),
                      trailing: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('₹${o.amount.toStringAsFixed(2)}'),
                          const SizedBox(height: 6),
                          if (o.status != OrderStatus.delivered && o.status != OrderStatus.cancelled)
                            TextButton(
                              onPressed: () => showDialog<void>(
                                context: context,
                                builder: (_) => AlertDialog(
                                  title: const Text('Cancel order?'),
                                  content: const Text('Are you sure you want to cancel this order?'),
                                  actions: [
                                    TextButton(onPressed: () => Navigator.pop(context), child: const Text('No')),
                                    TextButton(
                                      onPressed: () async {
                                        Navigator.pop(context);
                                        await _cancelOrder(o);
                                      },
                                      child: const Text('Yes'),
                                    ),
                                  ],
                                ),
                              ),
                              child: const Text('Cancel'),
                            ),
                        ],
                      ),
                      onTap: () => showDialog<void>(
                        context: context,
                        builder: (_) => AlertDialog(
                          title: Text(o.title),
                          content: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Amount: ₹${o.amount.toStringAsFixed(2)}'),
                              const SizedBox(height: 8),
                              Text('Status: ${_statusLabel(o.status)}'),
                              const SizedBox(height: 8),
                              Text('Ordered at: ${o.createdAt.toLocal()}'),
                            ],
                          ),
                          actions: [
                            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Close')),
                          ],
                        ),
                      ),
                    );
                  },
                  separatorBuilder: (_, __) => const SizedBox(height: 8),
                  itemCount: _orders.length,
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _addSampleOrder,
        icon: const Icon(Icons.add_shopping_cart),
        label: const Text('New Order'),
      ),
    );
  }
}
