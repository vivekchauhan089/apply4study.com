import 'package:flutter/material.dart';

class HealthScanResult {
  final String title;
  final String value;
  final String status;
  final Color statusColor;
  final IconData icon;
  final Color color;
  final List<String> recommendations;

  HealthScanResult({
    required this.title,
    required this.value,
    required this.status,
    required this.statusColor,
    required this.icon,
    required this.color,
    required this.recommendations,
  });

  factory HealthScanResult.fromJson(Map<String, dynamic> json, String scanType) {
    return HealthScanResult(
      title: scanType,
      value: json['value'] ?? 'N/A',
      status: json['status'] ?? 'Normal',
      statusColor: _getStatusColor(json['status']),
      icon: _getIcon(scanType),
      color: _getColor(scanType),
      recommendations: List<String>.from(json['recommendations'] ?? []),
    );
  }

  static Color _getStatusColor(String? status) {
    switch (status?.toLowerCase()) {
      case 'normal':
      case 'good':
        return Colors.green;
      case 'warning':
      case 'moderate':
        return Colors.orange;
      case 'critical':
      case 'high':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  static IconData _getIcon(String scanType) {
    switch (scanType) {
      case 'Heart Rate':
        return Icons.favorite;
      case 'Skin Disease':
        return Icons.face;
      case 'Eye Disease':
        return Icons.remove_red_eye;
      case 'Nail Analysis':
        return Icons.back_hand;
      case 'Tongue Scan':
        return Icons.coronavirus;
      case 'Hair Analysis':
        return Icons.face_retouching_natural;
      case 'Wound Check':
        return Icons.healing;
      case 'Breathe Rate':
        return Icons.air;
      case 'Temperature':
        return Icons.thermostat;
      case 'Blood Pressure':
        return Icons.monitor_heart;
      case 'Oxygen Level':
        return Icons.water_drop;
      default:
        return Icons.health_and_safety;
    }
  }

  static Color _getColor(String scanType) {
    switch (scanType) {
      case 'Heart Rate':
        return Colors.red;
      case 'Skin Disease':
        return Colors.orange;
      case 'Eye Disease':
        return Colors.teal;
      case 'Nail Analysis':
        return Colors.brown;
      case 'Tongue Scan':
        return Colors.redAccent;
      case 'Hair Analysis':
        return Colors.amber;
      case 'Wound Check':
        return Colors.deepOrange;
      case 'Breathe Rate':
        return Colors.blue;
      case 'Temperature':
        return Colors.purple;
      case 'Blood Pressure':
        return Colors.pink;
      case 'Oxygen Level':
        return Colors.cyan;
      default:
        return Colors.grey;
    }
  }
}
