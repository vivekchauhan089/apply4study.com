class PaymentSlipModel {
  final int? id;
  final int preInvoiceId;
  final String consumerCode;
  final String agentId;
  final double paymentAmount;
  final String paymentMethod;
  final String status;
  final String? slipImageUrl;
  final String? transactionId;
  final DateTime createdAt;
  final DateTime? releasedAt;
  final String? notes;

  PaymentSlipModel({
    this.id,
    required this.preInvoiceId,
    required this.consumerCode,
    required this.agentId,
    required this.paymentAmount,
    required this.paymentMethod,
    required this.status,
    this.slipImageUrl,
    this.transactionId,
    required this.createdAt,
    this.releasedAt,
    this.notes,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'pre_invoice_id': preInvoiceId,
    'consumer_code': consumerCode,
    'agent_id': agentId,
    'payment_amount': paymentAmount,
    'payment_method': paymentMethod,
    'status': status,
    'slip_image_url': slipImageUrl,
    'transaction_id': transactionId,
    'created_at': createdAt.toIso8601String(),
    'released_at': releasedAt?.toIso8601String(),
    'notes': notes,
  };

  factory PaymentSlipModel.fromJson(Map<String, dynamic> json) => PaymentSlipModel(
    id: json['id'],
    preInvoiceId: json['pre_invoice_id'],
    consumerCode: json['consumer_code'],
    agentId: json['agent_id'],
    paymentAmount: json['payment_amount']?.toDouble() ?? 0.0,
    paymentMethod: json['payment_method'],
    status: json['status'],
    slipImageUrl: json['slip_image_url'],
    transactionId: json['transaction_id'],
    createdAt: DateTime.parse(json['created_at']),
    releasedAt: json['released_at'] != null ? DateTime.parse(json['released_at']) : null,
    notes: json['notes'],
  );
}