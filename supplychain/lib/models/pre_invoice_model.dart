class PreInvoiceModel {
  final int? id;
  final String consumerCode;
  final String consumerName;
  final String agentId;
  final double demandQuantity; // in tons
  final String caneGrade;
  final double ratePerTon;
  final double totalAmount;
  final String status;
  final DateTime createdAt;
  final DateTime? confirmedAt;
  final String? notes;

  PreInvoiceModel({
    this.id,
    required this.consumerCode,
    required this.consumerName,
    required this.agentId,
    required this.demandQuantity,
    required this.caneGrade,
    required this.ratePerTon,
    required this.totalAmount,
    required this.status,
    required this.createdAt,
    this.confirmedAt,
    this.notes,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'consumer_code': consumerCode,
    'consumer_name': consumerName,
    'agent_id': agentId,
    'demand_quantity': demandQuantity,
    'cane_grade': caneGrade,
    'rate_per_ton': ratePerTon,
    'total_amount': totalAmount,
    'status': status,
    'created_at': createdAt.toIso8601String(),
    'confirmed_at': confirmedAt?.toIso8601String(),
    'notes': notes,
  };

  factory PreInvoiceModel.fromJson(Map<String, dynamic> json) => PreInvoiceModel(
    id: json['id'],
    consumerCode: json['consumer_code'],
    consumerName: json['consumer_name'],
    agentId: json['agent_id'],
    demandQuantity: json['demand_quantity']?.toDouble() ?? 0.0,
    caneGrade: json['cane_grade'],
    ratePerTon: json['rate_per_ton']?.toDouble() ?? 0.0,
    totalAmount: json['total_amount']?.toDouble() ?? 0.0,
    status: json['status'],
    createdAt: DateTime.parse(json['created_at']),
    confirmedAt: json['confirmed_at'] != null ? DateTime.parse(json['confirmed_at']) : null,
    notes: json['notes'],
  );
}