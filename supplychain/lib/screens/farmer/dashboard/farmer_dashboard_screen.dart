import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/pre_invoice_model.dart';
import '../../../models/weighted_slip_model.dart';
import '../../../utils/constants.dart';

class FarmerDashboardScreen extends StatefulWidget {
  const FarmerDashboardScreen({super.key});

  @override
  State<FarmerDashboardScreen> createState() => _FarmerDashboardScreenState();
}

class _FarmerDashboardScreenState extends State<FarmerDashboardScreen> {
  List<PreInvoiceModel> _availableInvoices = [];
  List<WeightedSlipModel> _mySupplies = [];
  bool _loading = true;
  Map<String, dynamic> _stats = {};

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    try {
      final invoices = await ApiService.getPreInvoices(status: AppConstants.invoiceConfirmed);
      final supplies = await ApiService.getWeightedSlips();
      final stats = await ApiService.getSugarCaneDashboardStats();
      
      setState(() {
        _availableInvoices = invoices;
        _mySupplies = supplies;
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
        title: const Text('Farmer Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Navigator.pushNamed(context, '/farmer/profile'),
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
                Row(
                  children: [
                    Expanded(child: _buildStatCard('Available Orders', '${_availableInvoices.length}', Icons.assignment, Colors.blue)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('My Supplies', '${_mySupplies.length}', Icons.local_shipping, Colors.green)),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: _buildStatCard('Total Earnings', '₹${_stats['total_earnings'] ?? 0}', Icons.currency_rupee, Colors.orange)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('This Month', '₹${_stats['month_earnings'] ?? 0}', Icons.trending_up, Colors.purple)),
                  ],
                ),
                const SizedBox(height: 24),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Available Orders', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 12),
                        if (_availableInvoices.isEmpty)
                          const Center(
                            child: Padding(
                              padding: EdgeInsets.all(20),
                              child: Text('No orders available'),
                            ),
                          )
                        else
                          ...(_availableInvoices.take(3).map((invoice) => ListTile(
                            leading: CircleAvatar(
                              backgroundColor: Colors.blue,
                              child: Text(invoice.consumerCode.substring(0, 2).toUpperCase()),
                            ),
                            title: Text(invoice.consumerName),
                            subtitle: Text('${invoice.demandQuantity} tons • ${invoice.caneGrade}'),
                            trailing: Text('₹${invoice.ratePerTon}/ton'),
                            onTap: () => _showSupplyDialog(invoice),
                          ))),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) Navigator.pushNamed(context, '/farmer/available-orders');
          if (index == 2) Navigator.pushNamed(context, '/farmer/my-supplies');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Orders'),
          BottomNavigationBarItem(icon: Icon(Icons.local_shipping), label: 'Supplies'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/farmer/scan-supply'),
        child: const Icon(Icons.qr_code_scanner),
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

  void _showSupplyDialog(PreInvoiceModel invoice) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Supply to ${invoice.consumerName}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Consumer Code: ${invoice.consumerCode}'),
            Text('Demand: ${invoice.demandQuantity} tons'),
            Text('Grade: ${invoice.caneGrade}'),
            Text('Rate: ₹${invoice.ratePerTon}/ton'),
            Text('Total Value: ₹${invoice.totalAmount}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/farmer/create-supply', arguments: invoice);
            },
            child: const Text('Supply Now'),
          ),
        ],
      ),
    );
  }
}