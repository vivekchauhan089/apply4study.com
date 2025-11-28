import 'package:flutter/material.dart';
import '../../models/supply_chain_process_model.dart';
import '../../utils/constants.dart';

class ProcessTrackingScreen extends StatefulWidget {
  const ProcessTrackingScreen({super.key});

  @override
  State<ProcessTrackingScreen> createState() => _ProcessTrackingScreenState();
}

class _ProcessTrackingScreenState extends State<ProcessTrackingScreen> {
  List<SupplyChainProcessModel> processes = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadProcesses();
  }

  Future<void> _loadProcesses() async {
    setState(() => isLoading = true);
    
    // Mock data for demonstration
    await Future.delayed(const Duration(seconds: 1));
    
    setState(() {
      processes = [
        SupplyChainProcessModel(
          processId: 'PROC001',
          industry: 'agriculture',
          processType: 'procurement',
          currentStage: 'quality_check',
          status: AppConstants.orderInProduction,
          createdAt: DateTime.now().subtract(const Duration(days: 5)),
          stages: [
            ProcessStageModel(
              stageId: 'stage1',
              stageName: 'RFQ Creation',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 5)),
              completedAt: DateTime.now().subtract(const Duration(days: 4)),
            ),
            ProcessStageModel(
              stageId: 'stage2',
              stageName: 'Supplier Selection',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 4)),
              completedAt: DateTime.now().subtract(const Duration(days: 3)),
            ),
            ProcessStageModel(
              stageId: 'stage3',
              stageName: 'Quality Check',
              status: AppConstants.orderInProduction,
              startedAt: DateTime.now().subtract(const Duration(days: 3)),
            ),
            ProcessStageModel(
              stageId: 'stage4',
              stageName: 'Payment Release',
              status: AppConstants.orderPending,
            ),
          ],
        ),
        SupplyChainProcessModel(
          processId: 'PROC002',
          industry: 'manufacturing',
          processType: 'production',
          currentStage: 'completed',
          status: AppConstants.orderCompleted,
          createdAt: DateTime.now().subtract(const Duration(days: 10)),
          completedAt: DateTime.now().subtract(const Duration(days: 2)),
          stages: [
            ProcessStageModel(
              stageId: 'stage1',
              stageName: 'Material Sourcing',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 10)),
              completedAt: DateTime.now().subtract(const Duration(days: 8)),
            ),
            ProcessStageModel(
              stageId: 'stage2',
              stageName: 'Production',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 8)),
              completedAt: DateTime.now().subtract(const Duration(days: 5)),
            ),
            ProcessStageModel(
              stageId: 'stage3',
              stageName: 'Quality Assurance',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 5)),
              completedAt: DateTime.now().subtract(const Duration(days: 3)),
            ),
            ProcessStageModel(
              stageId: 'stage4',
              stageName: 'Packaging & Shipping',
              status: AppConstants.orderCompleted,
              startedAt: DateTime.now().subtract(const Duration(days: 3)),
              completedAt: DateTime.now().subtract(const Duration(days: 2)),
            ),
          ],
        ),
      ];
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Process Tracking'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: processes.length,
              itemBuilder: (context, index) => _buildProcessCard(processes[index]),
            ),
    );
  }

  Widget _buildProcessCard(SupplyChainProcessModel process) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: ExpansionTile(
        title: Text(
          'Process ${process.processId}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Industry: ${process.industry}'),
            Text('Type: ${process.processType}'),
            Text('Status: ${process.status}'),
          ],
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: _getStatusColor(process.status),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            process.status.toUpperCase(),
            style: const TextStyle(color: Colors.white, fontSize: 12),
          ),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Process Timeline',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                ...process.stages.map((stage) => _buildStageItem(stage)),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Created: ${_formatDate(process.createdAt)}'),
                    if (process.completedAt != null)
                      Text('Completed: ${_formatDate(process.completedAt!)}'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStageItem(ProcessStageModel stage) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: _getStageStatusColor(stage.status),
            ),
            child: stage.status == AppConstants.orderCompleted
                ? const Icon(Icons.check, size: 14, color: Colors.white)
                : stage.status == AppConstants.orderInProduction
                    ? const Icon(Icons.play_arrow, size: 14, color: Colors.white)
                    : null,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  stage.stageName,
                  style: const TextStyle(fontWeight: FontWeight.w500),
                ),
                if (stage.startedAt != null)
                  Text(
                    'Started: ${_formatDate(stage.startedAt!)}',
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                if (stage.completedAt != null)
                  Text(
                    'Completed: ${_formatDate(stage.completedAt!)}',
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: _getStageStatusColor(stage.status),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              stage.status,
              style: const TextStyle(color: Colors.white, fontSize: 10),
            ),
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case AppConstants.orderCompleted: return Colors.green;
      case AppConstants.orderInProduction: return Colors.blue;
      case AppConstants.orderQualityCheck: return Colors.orange;
      case AppConstants.orderPending: return Colors.orange;
      case AppConstants.orderCancelled: return Colors.red;
      case AppConstants.orderShipped: return Colors.purple;
      case AppConstants.orderDelivered: return Colors.teal;
      default: return Colors.grey;
    }
  }

  Color _getStageStatusColor(String status) {
    switch (status) {
      case AppConstants.orderCompleted: return Colors.green;
      case AppConstants.orderInProduction: return Colors.blue;
      case AppConstants.orderQualityCheck: return Colors.orange;
      case AppConstants.orderPending: return Colors.grey;
      default: return Colors.grey;
    }
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}