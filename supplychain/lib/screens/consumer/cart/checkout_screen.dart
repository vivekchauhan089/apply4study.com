import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import '../../../providers/cart_provider.dart';
import '../../../services/api_service.dart';
import '../../../services/storage_service.dart';
import '../../../models/order_model.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _addressCtrl = TextEditingController();
  late Razorpay _razorpay;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
  }

  @override
  void dispose() {
    _razorpay.clear();
    super.dispose();
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) async {
    await _createOrder();
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Payment failed: ${response.message}')),
    );
  }

  Future<void> _createOrder() async {
    setState(() => _loading = true);
    try {
      final cart = context.read<CartProvider>();
      final user = await StorageService.getUser();
      
      final order = OrderModel(
        userId: user!.id!,
        totalAmount: cart.totalAmount,
        status: 'pending',
        shippingAddress: _addressCtrl.text,
        createdAt: DateTime.now(),
      );

      final response = await ApiService.createOrder(order);
      if (response['success'] == true) {
        await cart.clearCart();
        if (!mounted) return;
        Navigator.pushNamedAndRemoveUntil(context, '/consumer/home', (route) => false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Order placed successfully')),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
    setState(() => _loading = false);
  }

  void _startPayment() {
    final cart = context.read<CartProvider>();
    var options = {
      'key': 'YOUR_RAZORPAY_KEY',
      'amount': (cart.totalAmount * 100).toInt(),
      'name': 'SupplyChain',
      'description': 'Order Payment',
      'prefill': {'contact': '', 'email': ''},
    };
    _razorpay.open(options);
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text('Checkout')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Shipping Address', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            TextField(
              controller: _addressCtrl,
              maxLines: 3,
              decoration: const InputDecoration(
                hintText: 'Enter your address',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 24),
            const Text('Order Summary', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...cart.items.map((item) => ListTile(
              title: Text(item.productName),
              subtitle: Text('Qty: ${item.quantity}'),
              trailing: Text('₹${item.totalPrice}'),
            )),
            const Divider(),
            ListTile(
              title: const Text('Total', style: TextStyle(fontWeight: FontWeight.bold)),
              trailing: Text('₹${cart.totalAmount}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _startPayment,
                child: _loading
                  ? const CircularProgressIndicator()
                  : const Text('Pay Now'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
