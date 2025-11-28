import 'package:flutter/material.dart';
import '../../models/rfq_model.dart';

class RFQManagementScreen extends StatefulWidget {
  const RFQManagementScreen({super.key});

  @override
  State<RFQManagementScreen> createState() => _RFQManagementScreenState();
}

class _RFQManagementScreenState extends State<RFQManagementScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<RFQModel> myRFQs = [];
  List<RFQModel> availableRFQs = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadRFQs();
  }

  Future<void> _loadRFQs() async {
    setState(() => isLoading = true);
    try {
      // Load user's RFQs and available RFQs from API
      // This would be implemented based on your API structure
      await Future.delayed(const Duration(seconds: 1)); // Simulate API call
      setState(() => isLoading = false);
    } catch (e) {
      setState(() => isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error loading RFQs: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RFQ Management'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
        bottom: TabBar(
          controller: _tabController,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white70,
          tabs: const [
            Tab(text: 'My RFQs'),
            Tab(text: 'Available RFQs'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildMyRFQsTab(),
          _buildAvailableRFQsTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _createNewRFQ,
        backgroundColor: Colors.blue.shade600,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildMyRFQsTab() {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (myRFQs.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.request_quote, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('No RFQs created yet'),
            Text('Tap + to create your first RFQ'),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: myRFQs.length,
      itemBuilder: (context, index) => _buildRFQCard(myRFQs[index], true),
    );
  }

  Widget _buildAvailableRFQsTab() {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (availableRFQs.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.search, size: 64, color: Colors.grey),
            SizedBox(height: 16),
            Text('No RFQs available'),
            Text('Check back later for new opportunities'),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: availableRFQs.length,
      itemBuilder: (context, index) => _buildRFQCard(availableRFQs[index], false),
    );
  }

  Widget _buildRFQCard(RFQModel rfq, bool isOwner) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    rfq.title,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getStatusColor(rfq.status),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    rfq.status.toUpperCase(),
                    style: const TextStyle(color: Colors.white, fontSize: 12),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(rfq.description, maxLines: 2, overflow: TextOverflow.ellipsis),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.category, size: 16, color: Colors.grey.shade600),
                const SizedBox(width: 4),
                Text('${rfq.category} • ${rfq.quantity} ${rfq.unit}'),
              ],
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.schedule, size: 16, color: Colors.grey.shade600),
                const SizedBox(width: 4),
                Text('Required by: ${rfq.requiredDate.toString().split(' ')[0]}'),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  isOwner ? '${rfq.responses.length} responses' : 'By: ${rfq.buyerName}',
                  style: TextStyle(color: Colors.grey.shade600),
                ),
                ElevatedButton(
                  onPressed: () => _viewRFQDetails(rfq, isOwner),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue.shade600,
                    foregroundColor: Colors.white,
                  ),
                  child: Text(isOwner ? 'View Details' : 'Submit Quote'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'open': return Colors.green;
      case 'closed': return Colors.red;
      case 'awarded': return Colors.blue;
      default: return Colors.orange;
    }
  }

  void _createNewRFQ() {
    Navigator.pushNamed(context, '/create-rfq');
  }

  void _viewRFQDetails(RFQModel rfq, bool isOwner) {
    Navigator.pushNamed(
      context,
      '/rfq-details',
      arguments: {'rfq': rfq, 'isOwner': isOwner},
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
}