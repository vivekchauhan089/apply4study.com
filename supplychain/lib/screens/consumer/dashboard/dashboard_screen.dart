import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:badges/badges.dart' as badges;
import '../../../services/api_service.dart';

import '../../../models/pre_invoice_model.dart';
import '../../../models/bank_statement_model.dart';
import '../../../providers/cart_provider.dart';

import '../../../utils/constants.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {

  List<PreInvoiceModel> _myInvoices = [];
  List<BankStatementModel> _bankStatements = [];
  Map<String, dynamic> _stats = {};
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
    context.read<CartProvider>().loadCart();
  }

  Future<void> _loadDashboardData() async {
    try {
      final invoices = await ApiService.getPreInvoices();
      final statements = await ApiService.getBankStatements();
      final stats = await ApiService.getSugarCaneDashboardStats();
      
      setState(() {
        _myInvoices = invoices;
        _bankStatements = statements;
        _stats = stats;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.store),
            onPressed: () => Navigator.pushNamed(context, '/marketplace'),
          ),
          Consumer<CartProvider>(
            builder: (context, cart, child) => badges.Badge(
              badgeContent: Text('${cart.itemCount}', style: const TextStyle(color: Colors.white)),
              showBadge: cart.itemCount > 0,
              child: IconButton(
                icon: const Icon(Icons.shopping_cart),
                onPressed: () => Navigator.pushNamed(context, '/consumer/cart'),
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Navigator.pushNamed(context, '/consumer/profile'),
          ),
        ],
      ),
      body: _loading
        ? const Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: _loadDashboardData,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                // Stats Cards
                Row(
                  children: [
                    Expanded(child: _buildStatCard('Active Orders', '${_myInvoices.length}', Icons.assignment, Colors.blue)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('Total Value', '₹${_stats['total_value'] ?? 0}', Icons.currency_rupee, Colors.green)),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: _buildStatCard('Pending Payments', '${_stats['pending_payments'] ?? 0}', Icons.payment, Colors.orange)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('Completed', '${_stats['completed_orders'] ?? 0}', Icons.check_circle, Colors.purple)),
                  ],
                ),
                const SizedBox(height: 24),
                
                // My Pre-Invoices
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('My Orders', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                            TextButton(
                              onPressed: () => Navigator.pushNamed(context, '/consumer/my-orders'),
                              child: const Text('View All'),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        if (_myInvoices.isEmpty)
                          const Center(
                            child: Padding(
                              padding: EdgeInsets.all(20),
                              child: Text('No orders yet'),
                            ),
                          )
                        else
                          ...(_myInvoices.take(3).map((invoice) => ListTile(
                            leading: CircleAvatar(
                              backgroundColor: _getInvoiceStatusColor(invoice.status),
                              child: const Icon(Icons.receipt, color: Colors.white),
                            ),
                            title: Text('${invoice.demandQuantity} tons'),
                            subtitle: Text('${invoice.caneGrade} • ₹${invoice.ratePerTon}/ton'),
                            trailing: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('₹${invoice.totalAmount}'),
                                Text(invoice.status, style: TextStyle(color: _getInvoiceStatusColor(invoice.status), fontSize: 12)),
                              ],
                            ),
                            onTap: () => _showInvoiceActions(invoice),
                          ))),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                
                // Bank Statements
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Payment Confirmations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                            TextButton(
                              onPressed: () => Navigator.pushNamed(context, '/consumer/bank-statements'),
                              child: const Text('View All'),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        if (_bankStatements.isEmpty)
                          const Center(
                            child: Padding(
                              padding: EdgeInsets.all(20),
                              child: Text('No payment confirmations yet'),
                            ),
                          )
                        else
                          ...(_bankStatements.take(3).map((statement) => ListTile(
                            leading: CircleAvatar(
                              backgroundColor: _getPaymentStatusColor(statement.status),
                              child: const Icon(Icons.account_balance, color: Colors.white),
                            ),
                            title: Text(statement.bankName),
                            subtitle: Text('Transaction: ${statement.transactionId}'),
                            trailing: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('₹${statement.receivedAmount}'),
                                Text(statement.status, style: TextStyle(color: _getPaymentStatusColor(statement.status), fontSize: 12)),
                              ],
                            ),
                          ))),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) Navigator.pushNamed(context, '/marketplace');
          if (index == 2) Navigator.pushNamed(context, '/consumer/orders');
          if (index == 3) Navigator.pushNamed(context, '/consumer/wallet');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.store), label: 'Shop'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt), label: 'Orders'),
          BottomNavigationBarItem(icon: Icon(Icons.account_balance_wallet), label: 'Wallet'),
        ],
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, size: 32, color: color),
            const SizedBox(height: 8),
            Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color)),
            Text(title, style: const TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }

  Color _getInvoiceStatusColor(String status) {
    switch (status) {
      case 'pending': return Colors.orange;
      case 'confirmed': return Colors.blue;
      case 'supplied': return Colors.green;
      case 'paid': return Colors.purple;
      case 'completed': return Colors.teal;
      default: return Colors.grey;
    }
  }

  Color _getPaymentStatusColor(String status) {
    switch (status) {
      case 'pending': return Colors.orange;
      case 'released': return Colors.blue;
      case 'confirmed': return Colors.green;
      default: return Colors.grey;
    }
  }

  void _showInvoiceActions(PreInvoiceModel invoice) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Order #${invoice.id}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Consumer Code: ${invoice.consumerCode}'),
            Text('Quantity: ${invoice.demandQuantity} tons'),
            Text('Grade: ${invoice.caneGrade}'),
            Text('Rate: ₹${invoice.ratePerTon}/ton'),
            Text('Total: ₹${invoice.totalAmount}'),
            Text('Status: ${invoice.status}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
          if (invoice.status == AppConstants.invoicePaid)
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/consumer/upload-bank-statement', arguments: invoice);
              },
              child: const Text('Upload Bank Statement'),
            ),
        ],
      ),
    );
  }
}
