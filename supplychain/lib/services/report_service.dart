import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../models/supply_chain_process_model.dart';
import '../models/product_model.dart';
import '../models/order_model.dart';
import 'api_service.dart';

class ReportService {
  // Generate comprehensive supply chain report
  static Future<Map<String, dynamic>> generateSupplyChainReport({
    String? industry,
    DateTime? startDate,
    DateTime? endDate,
    String? processType,
  }) async {
    final processes = await _getProcesses(industry: industry, startDate: startDate, endDate: endDate);
    final products = await ApiService.getProducts();
    final orders = await ApiService.getOrders();

    return {
      'summary': _generateSummary(processes, products, orders),
      'process_analytics': _generateProcessAnalytics(processes),
      'inventory_analytics': _generateInventoryAnalytics(products),
      'order_analytics': _generateOrderAnalytics(orders),
      'performance_metrics': _generatePerformanceMetrics(processes),
      'generated_at': DateTime.now().toIso8601String(),
    };
  }

  // Export report to Excel format (CSV for simplicity)
  static Future<String> exportToExcel(Map<String, dynamic> reportData) async {
    final directory = await getApplicationDocumentsDirectory();
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final filePath = '${directory.path}/supply_chain_report_$timestamp.csv';

    final csvContent = _generateCSVContent(reportData);
    final file = File(filePath);
    await file.writeAsString(csvContent);

    return filePath;
  }

  // Export report to PDF format (simplified text format)
  static Future<String> exportToPDF(Map<String, dynamic> reportData) async {
    final directory = await getApplicationDocumentsDirectory();
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final filePath = '${directory.path}/supply_chain_report_$timestamp.txt';

    final pdfContent = _generatePDFContent(reportData);
    final file = File(filePath);
    await file.writeAsString(pdfContent);

    return filePath;
  }

  // Export report to JSON format
  static Future<String> exportToJSON(Map<String, dynamic> reportData) async {
    final directory = await getApplicationDocumentsDirectory();
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final filePath = '${directory.path}/supply_chain_report_$timestamp.json';

    final jsonContent = jsonEncode(reportData);
    final file = File(filePath);
    await file.writeAsString(jsonContent);

    return filePath;
  }

  // Get chart data for dashboard
  static Future<Map<String, dynamic>> getChartData({String? industry}) async {
    final processes = await _getProcesses(industry: industry);
    final products = await ApiService.getProducts();
    final orders = await ApiService.getOrders();

    return {
      'process_status_chart': _getProcessStatusChart(processes),
      'inventory_levels_chart': _getInventoryLevelsChart(products),
      'order_trends_chart': _getOrderTrendsChart(orders),
      'industry_distribution_chart': _getIndustryDistributionChart(processes),
      'performance_trends_chart': _getPerformanceTrendsChart(processes),
    };
  }

  // Private helper methods
  static Future<List<SupplyChainProcessModel>> _getProcesses({
    String? industry,
    DateTime? startDate,
    DateTime? endDate,
  }) async {
    // Mock data for demonstration
    return [
      SupplyChainProcessModel(
        processId: 'PROC001',
        industry: 'agriculture',
        processType: 'procurement',
        currentStage: 'quality_check',
        status: 'in_progress',
        createdAt: DateTime.now().subtract(const Duration(days: 5)),
      ),
      SupplyChainProcessModel(
        processId: 'PROC002',
        industry: 'manufacturing',
        processType: 'production',
        currentStage: 'completed',
        status: 'completed',
        createdAt: DateTime.now().subtract(const Duration(days: 10)),
        completedAt: DateTime.now().subtract(const Duration(days: 2)),
      ),
    ];
  }

  static Map<String, dynamic> _generateSummary(
    List<SupplyChainProcessModel> processes,
    List<ProductModel> products,
    List<OrderModel> orders,
  ) {
    return {
      'total_processes': processes.length,
      'active_processes': processes.where((p) => p.status == 'in_progress').length,
      'completed_processes': processes.where((p) => p.status == 'completed').length,
      'total_products': products.length,
      'low_stock_products': products.where((p) => p.stock < 50).length,
      'total_orders': orders.length,
      'pending_orders': orders.where((o) => o.status == 'pending').length,
      'total_revenue': orders.fold(0.0, (sum, order) => sum + order.totalAmount),
    };
  }

  static Map<String, dynamic> _generateProcessAnalytics(List<SupplyChainProcessModel> processes) {
    final byIndustry = <String, int>{};
    final byStatus = <String, int>{};
    
    for (final process in processes) {
      byIndustry[process.industry] = (byIndustry[process.industry] ?? 0) + 1;
      byStatus[process.status] = (byStatus[process.status] ?? 0) + 1;
    }

    return {
      'by_industry': byIndustry,
      'by_status': byStatus,
      'average_completion_time': _calculateAverageCompletionTime(processes),
    };
  }

  static Map<String, dynamic> _generateInventoryAnalytics(List<ProductModel> products) {
    final byCategory = <String, int>{};
    final byIndustry = <String, int>{};
    
    for (final product in products) {
      byCategory[product.category] = (byCategory[product.category] ?? 0) + product.stock;
      byIndustry[product.industry] = (byIndustry[product.industry] ?? 0) + product.stock;
    }

    return {
      'by_category': byCategory,
      'by_industry': byIndustry,
      'total_value': products.fold(0.0, (sum, p) => sum + (p.price * p.stock)),
    };
  }

  static Map<String, dynamic> _generateOrderAnalytics(List<OrderModel> orders) {
    final byStatus = <String, int>{};
    final revenueByMonth = <String, double>{};
    
    for (final order in orders) {
      byStatus[order.status] = (byStatus[order.status] ?? 0) + 1;
      final monthKey = '${order.createdAt.year}-${order.createdAt.month.toString().padLeft(2, '0')}';
      revenueByMonth[monthKey] = (revenueByMonth[monthKey] ?? 0) + order.totalAmount;
    }

    return {
      'by_status': byStatus,
      'revenue_by_month': revenueByMonth,
      'average_order_value': orders.isNotEmpty 
          ? orders.fold(0.0, (sum, o) => sum + o.totalAmount) / orders.length 
          : 0.0,
    };
  }

  static Map<String, dynamic> _generatePerformanceMetrics(List<SupplyChainProcessModel> processes) {
    final completedProcesses = processes.where((p) => p.completedAt != null).toList();
    
    return {
      'completion_rate': processes.isNotEmpty 
          ? (completedProcesses.length / processes.length * 100).toStringAsFixed(2)
          : '0.00',
      'average_processing_time': _calculateAverageCompletionTime(completedProcesses),
      'efficiency_score': _calculateEfficiencyScore(processes),
    };
  }

  static double _calculateAverageCompletionTime(List<SupplyChainProcessModel> processes) {
    final completedProcesses = processes.where((p) => p.completedAt != null).toList();
    if (completedProcesses.isEmpty) return 0.0;

    final totalHours = completedProcesses.fold(0.0, (sum, process) {
      final duration = process.completedAt!.difference(process.createdAt);
      return sum + duration.inHours;
    });

    return totalHours / completedProcesses.length;
  }

  static double _calculateEfficiencyScore(List<SupplyChainProcessModel> processes) {
    if (processes.isEmpty) return 0.0;
    
    final completedOnTime = processes.where((p) => 
        p.completedAt != null && 
        p.completedAt!.difference(p.createdAt).inDays <= 7
    ).length;
    
    return (completedOnTime / processes.length * 100);
  }

  static String _generateCSVContent(Map<String, dynamic> reportData) {
    final buffer = StringBuffer();
    buffer.writeln('Supply Chain Report');
    buffer.writeln('Generated At,${reportData['generated_at']}');
    buffer.writeln('');
    
    // Summary section
    final summary = reportData['summary'] as Map<String, dynamic>;
    buffer.writeln('Summary');
    summary.forEach((key, value) {
      buffer.writeln('$key,$value');
    });
    
    return buffer.toString();
  }

  static String _generatePDFContent(Map<String, dynamic> reportData) {
    final buffer = StringBuffer();
    buffer.writeln('SUPPLY CHAIN REPORT');
    buffer.writeln('=' * 50);
    buffer.writeln('Generated: ${reportData['generated_at']}');
    buffer.writeln('');
    
    // Summary section
    buffer.writeln('SUMMARY');
    buffer.writeln('-' * 20);
    final summary = reportData['summary'] as Map<String, dynamic>;
    summary.forEach((key, value) {
      buffer.writeln('${key.replaceAll('_', ' ').toUpperCase()}: $value');
    });
    
    return buffer.toString();
  }

  static List<Map<String, dynamic>> _getProcessStatusChart(List<SupplyChainProcessModel> processes) {
    final statusCounts = <String, int>{};
    for (final process in processes) {
      statusCounts[process.status] = (statusCounts[process.status] ?? 0) + 1;
    }
    
    return statusCounts.entries.map((entry) => {
      'label': entry.key,
      'value': entry.value,
    }).toList();
  }

  static List<Map<String, dynamic>> _getInventoryLevelsChart(List<ProductModel> products) {
    final categoryStock = <String, int>{};
    for (final product in products) {
      categoryStock[product.category] = (categoryStock[product.category] ?? 0) + product.stock;
    }
    
    return categoryStock.entries.map((entry) => {
      'label': entry.key,
      'value': entry.value,
    }).toList();
  }

  static List<Map<String, dynamic>> _getOrderTrendsChart(List<OrderModel> orders) {
    final monthlyOrders = <String, int>{};
    for (final order in orders) {
      final monthKey = '${order.createdAt.year}-${order.createdAt.month.toString().padLeft(2, '0')}';
      monthlyOrders[monthKey] = (monthlyOrders[monthKey] ?? 0) + 1;
    }
    
    return monthlyOrders.entries.map((entry) => {
      'label': entry.key,
      'value': entry.value,
    }).toList();
  }

  static List<Map<String, dynamic>> _getIndustryDistributionChart(List<SupplyChainProcessModel> processes) {
    final industryCount = <String, int>{};
    for (final process in processes) {
      industryCount[process.industry] = (industryCount[process.industry] ?? 0) + 1;
    }
    
    return industryCount.entries.map((entry) => {
      'label': entry.key,
      'value': entry.value,
    }).toList();
  }

  static List<Map<String, dynamic>> _getPerformanceTrendsChart(List<SupplyChainProcessModel> processes) {
    final monthlyCompletion = <String, int>{};
    for (final process in processes.where((p) => p.completedAt != null)) {
      final monthKey = '${process.completedAt!.year}-${process.completedAt!.month.toString().padLeft(2, '0')}';
      monthlyCompletion[monthKey] = (monthlyCompletion[monthKey] ?? 0) + 1;
    }
    
    return monthlyCompletion.entries.map((entry) => {
      'label': entry.key,
      'value': entry.value,
    }).toList();
  }
}