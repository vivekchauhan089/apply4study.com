import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../services/api_service.dart';
import '../../../models/order_model.dart';

class OrderDetailScreen extends StatefulWidget {
  final int orderId;
  const OrderDetailScreen({super.key, required this.orderId});

  @override
  State<OrderDetailScreen> createState() => _OrderDetailScreenState();
}

class _OrderDetailScreenState extends State<OrderDetailScreen> {
  OrderModel? _order;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadOrder();
  }

  Future<void> _loadOrder() async {
    try {
      final order = await ApiService.getOrderById(widget.orderId);
      setState(() {
        _order = order;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Order #${widget.orderId}')),
      body: _loading
        ? const Center(child: CircularProgressIndicator())
        : _order == null
          ? const Center(child: Text('Order not found'))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Order Details', style: Theme.of(context).textTheme.titleLarge),
                          const Divider(),
                          _buildRow('Order ID', '#${_order!.id}'),
                          _buildRow('Status', _order!.status.toUpperCase()),
                          _buildRow('Total Amount', '₹${_order!.totalAmount}'),
                          _buildRow('Order Date', DateFormat('dd MMM yyyy, hh:mm a').format(_order!.createdAt)),
                          if (_order!.shippingAddress != null)
                            _buildRow('Shipping Address', _order!.shippingAddress!),
                        ],
                      ),
                    ),
                  ),
                  if (_order!.courierService != null) ...[
                    const SizedBox(height: 16),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Shipping Details', style: Theme.of(context).textTheme.titleLarge),
                            const Divider(),
                            _buildRow('Courier', _order!.courierService!),
                            if (_order!.trackingNumber != null)
                              _buildRow('Tracking Number', _order!.trackingNumber!),
                            if (_order!.deliveryDate != null)
                              _buildRow('Expected Delivery', DateFormat('dd MMM yyyy').format(_order!.deliveryDate!)),
                          ],
                        ),
                      ),
                    ),
                  ],
                  if (_order!.items != null && _order!.items!.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Items', style: Theme.of(context).textTheme.titleLarge),
                            const Divider(),
                            ..._order!.items!.map((item) => ListTile(
                              title: Text(item.productName),
                              subtitle: Text('Qty: ${item.quantity}'),
                              trailing: Text('₹${item.price * item.quantity}'),
                            )),
                          ],
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
    );
  }

  Widget _buildRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
          ),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}
