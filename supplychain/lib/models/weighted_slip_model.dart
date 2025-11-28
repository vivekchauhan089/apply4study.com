class WeightedSlipModel {
  final int? id;
  final int preInvoiceId;
  final String consumerCode;
  final String farmerCode;
  final double actualWeight; // in tons
  final String caneGrade;
  final double ratePerTon;
  final double totalAmount;
  final String status;
  final String? slipImageUrl;
  final String? qrCode;
  final DateTime createdAt;
  final DateTime? verifiedAt;
  final String? verifiedBy;

  WeightedSlipModel({
    this.id,
    required this.preInvoiceId,
    required this.consumerCode,
    required this.farmerCode,
    required this.actualWeight,
    required this.caneGrade,
    required this.ratePerTon,
    required this.totalAmount,
    required this.status,
    this.slipImageUrl,
    this.qrCode,
    required this.createdAt,
    this.verifiedAt,
    this.verifiedBy,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'pre_invoice_id': preInvoiceId,
    'consumer_code': consumerCode,
    'farmer_code': farmerCode,
    'actual_weight': actualWeight,
    'cane_grade': caneGrade,
    'rate_per_ton': ratePerTon,
    'total_amount': totalAmount,
    'status': status,
    'slip_image_url': slipImageUrl,
    'qr_code': qrCode,
    'created_at': createdAt.toIso8601String(),
    'verified_at': verifiedAt?.toIso8601String(),
    'verified_by': verifiedBy,
  };

  factory WeightedSlipModel.fromJson(Map<String, dynamic> json) => WeightedSlipModel(
    id: json['id'],
    preInvoiceId: json['pre_invoice_id'],
    consumerCode: json['consumer_code'],
    farmerCode: json['farmer_code'],
    actualWeight: json['actual_weight']?.toDouble() ?? 0.0,
    caneGrade: json['cane_grade'],
    ratePerTon: json['rate_per_ton']?.toDouble() ?? 0.0,
    totalAmount: json['total_amount']?.toDouble() ?? 0.0,
    status: json['status'],
    slipImageUrl: json['slip_image_url'],
    qrCode: json['qr_code'],
    createdAt: DateTime.parse(json['created_at']),
    verifiedAt: json['verified_at'] != null ? DateTime.parse(json['verified_at']) : null,
    verifiedBy: json['verified_by'],
  );
}