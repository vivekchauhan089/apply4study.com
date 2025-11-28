class QualityControlModel {
  final int? id;
  final int productId;
  final String productName;
  final String batchNumber;
  final String inspectionType;
  final String status;
  final int inspectorId;
  final String inspectorName;
  final DateTime inspectionDate;
  final List<QualityParameterModel> parameters;
  final String? notes;
  final List<String> attachments;
  final bool passed;
  final String? rejectionReason;
  final DateTime createdAt;

  QualityControlModel({
    this.id,
    required this.productId,
    required this.productName,
    required this.batchNumber,
    required this.inspectionType,
    required this.status,
    required this.inspectorId,
    required this.inspectorName,
    required this.inspectionDate,
    this.parameters = const [],
    this.notes,
    this.attachments = const [],
    required this.passed,
    this.rejectionReason,
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'product_id': productId,
    'product_name': productName,
    'batch_number': batchNumber,
    'inspection_type': inspectionType,
    'status': status,
    'inspector_id': inspectorId,
    'inspector_name': inspectorName,
    'inspection_date': inspectionDate.toIso8601String(),
    'parameters': parameters.map((p) => p.toJson()).toList(),
    'notes': notes,
    'attachments': attachments,
    'passed': passed,
    'rejection_reason': rejectionReason,
    'created_at': createdAt.toIso8601String(),
  };

  factory QualityControlModel.fromJson(Map<String, dynamic> json) => QualityControlModel(
    id: json['id'],
    productId: json['product_id'],
    productName: json['product_name'],
    batchNumber: json['batch_number'],
    inspectionType: json['inspection_type'],
    status: json['status'],
    inspectorId: json['inspector_id'],
    inspectorName: json['inspector_name'],
    inspectionDate: DateTime.parse(json['inspection_date']),
    parameters: (json['parameters'] as List? ?? [])
        .map((p) => QualityParameterModel.fromJson(p))
        .toList(),
    notes: json['notes'],
    attachments: List<String>.from(json['attachments'] ?? []),
    passed: json['passed'] ?? false,
    rejectionReason: json['rejection_reason'],
    createdAt: DateTime.parse(json['created_at']),
  );
}

class QualityParameterModel {
  final String name;
  final String expectedValue;
  final String actualValue;
  final String unit;
  final bool passed;
  final String? remarks;

  QualityParameterModel({
    required this.name,
    required this.expectedValue,
    required this.actualValue,
    required this.unit,
    required this.passed,
    this.remarks,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'expected_value': expectedValue,
    'actual_value': actualValue,
    'unit': unit,
    'passed': passed,
    'remarks': remarks,
  };

  factory QualityParameterModel.fromJson(Map<String, dynamic> json) => QualityParameterModel(
    name: json['name'],
    expectedValue: json['expected_value'],
    actualValue: json['actual_value'],
    unit: json['unit'],
    passed: json['passed'] ?? false,
    remarks: json['remarks'],
  );
}