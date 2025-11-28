import 'package:flutter/material.dart';
import '../../../services/api_service.dart';
import '../../../models/pre_invoice_model.dart';
import '../../../utils/constants.dart';

class AgentDashboardScreen extends StatefulWidget {
  const AgentDashboardScreen({super.key});

  @override
  State<AgentDashboardScreen> createState() => _AgentDashboardScreenState();
}

class _AgentDashboardScreenState extends State<AgentDashboardScreen> {
  List<PreInvoiceModel> _myInvoices = [];
  bool _loading = true;
  Map<String, dynamic> _stats = {};

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    try {
      final invoices = await ApiService.getPreInvoices();
      final stats = await ApiService.getSugarCaneDashboardStats();
      
      setState(() {
        _myInvoices = invoices;
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
        title: const Text('Agent Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Navigator.pushNamed(context, '/agent/profile'),
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
                    Expanded(child: _buildStatCard('Total Invoices', '${_myInvoices.length}', Icons.receipt, Colors.blue)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('Confirmed', '${_myInvoices.where((i) => i.status == AppConstants.invoiceConfirmed).length}', Icons.check_circle, Colors.green)),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: _buildStatCard('Total Value', '₹${_stats['total_value'] ?? 0}', Icons.currency_rupee, Colors.orange)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildStatCard('This Month', '₹${_stats['month_value'] ?? 0}', Icons.trending_up, Colors.purple)),
                  ],
                ),
                const SizedBox(height: 24),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Recent Pre-Invoices', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 12),
                        if (_myInvoices.isEmpty)
                          const Center(
                            child: Padding(
                              padding: EdgeInsets.all(20),
                              child: Text('No invoices created yet'),
                            ),
                          )
                        else
                          ...(_myInvoices.take(5).map((invoice) => ListTile(
                            leading: CircleAvatar(
                              backgroundColor: _getStatusColor(invoice.status),
                              child: Text(invoice.consumerCode.substring(0, 2).toUpperCase()),
                            ),
                            title: Text(invoice.consumerName),
                            subtitle: Text('${invoice.demandQuantity} tons • ${invoice.caneGrade}'),
                            trailing: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('₹${invoice.totalAmount}'),
                                Text(
                                  invoice.status,
                                  style: TextStyle(
                                    color: _getStatusColor(invoice.status),
                                    fontSize: 12,
                                  ),
                                ),
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
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) Navigator.pushNamed(context, '/agent/invoices');
          if (index == 2) Navigator.pushNamed(context, '/agent/reports');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt), label: 'Invoices'),
          BottomNavigationBarItem(icon: Icon(Icons.analytics), label: 'Reports'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/agent/create-invoice'),
        child: const Icon(Icons.add),
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

  Color _getStatusColor(String status) {
    switch (status) {
      case AppConstants.invoicePending:
        return Colors.orange;
      case AppConstants.invoiceConfirmed:
        return Colors.green;
      case AppConstants.invoiceRejected:
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}