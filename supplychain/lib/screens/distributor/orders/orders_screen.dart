import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../services/api_service.dart';
import '../../../models/order_model.dart';
import '../../../utils/constants.dart';

class DistributorOrdersScreen extends StatefulWidget {
  const DistributorOrdersScreen({super.key});

  @override
  State<DistributorOrdersScreen> createState() => _DistributorOrdersScreenState();
}

class _DistributorOrdersScreenState extends State<DistributorOrdersScreen> {
  List<OrderModel> _orders = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadOrders();
  }

  Future<void> _loadOrders() async {
    try {
      final orders = await ApiService.getOrders();
      setState(() {
        _orders = orders;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  void _showShipmentDialog(OrderModel order) {
    String? selectedCourier;
    final trackingCtrl = TextEditingController();
    DateTime? deliveryDate;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text('Ship Order #${order.id}'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<String>(
                  initialValue: selectedCourier,
                  decoration: const InputDecoration(labelText: 'Courier Service'),
                  items: AppConstants.courierServices.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                  onChanged: (val) => setDialogState(() => selectedCourier = val),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: trackingCtrl,
                  decoration: const InputDecoration(labelText: 'Tracking Number'),
                ),
                const SizedBox(height: 12),
                ListTile(
                  title: Text(deliveryDate != null ? DateFormat('dd MMM yyyy').format(deliveryDate!) : 'Select Delivery Date'),
                  trailing: const Icon(Icons.calendar_today),
                  onTap: () async {
                    final date = await showDatePicker(
                      context: context,
                      initialDate: DateTime.now().add(const Duration(days: 3)),
                      firstDate: DateTime.now(),
                      lastDate: DateTime.now().add(const Duration(days: 30)),
                    );
                    if (date != null) setDialogState(() => deliveryDate = date);
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final messenger = ScaffoldMessenger.of(context);
                if (selectedCourier == null || trackingCtrl.text.isEmpty) {
                  messenger.showSnackBar(
                    const SnackBar(content: Text('Fill all fields')),
                  );
                  return;
                }
                final navigator = Navigator.of(context);
                await ApiService.updateOrderShipment(
                  order.id!,
                  selectedCourier!,
                  trackingCtrl.text,
                  deliveryDate,
                );
                if (!mounted) return;
                navigator.pop();
                await _loadOrders();
                if (!mounted) return;
                messenger.showSnackBar(
                  const SnackBar(content: Text('Shipment updated')),
                );
              },
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Orders')),
      body: _loading
        ? const Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: _loadOrders,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _orders.length,
              itemBuilder: (context, index) {
                final order = _orders[index];
                return Card(
                  child: ListTile(
                    title: Text('Order #${order.id}'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Amount: ₹${order.totalAmount}'),
                        Text('Status: ${order.status}'),
                        if (order.trackingNumber != null)
                          Text('Tracking: ${order.trackingNumber}'),
                      ],
                    ),
                    trailing: order.status == 'confirmed'
                      ? IconButton(
                          icon: const Icon(Icons.local_shipping),
                          onPressed: () => _showShipmentDialog(order),
                        )
                      : null,
                  ),
                );
              },
            ),
          ),
    );
  }
}
