class BankStatementModel {
  final int? id;
  final int preInvoiceId;
  final String consumerCode;
  final double receivedAmount;
  final String bankName;
  final String accountNumber;
  final String transactionId;
  final String status;
  final String? statementImageUrl;
  final DateTime transactionDate;
  final DateTime createdAt;
  final DateTime? confirmedAt;
  final String? notes;

  BankStatementModel({
    this.id,
    required this.preInvoiceId,
    required this.consumerCode,
    required this.receivedAmount,
    required this.bankName,
    required this.accountNumber,
    required this.transactionId,
    required this.status,
    this.statementImageUrl,
    required this.transactionDate,
    required this.createdAt,
    this.confirmedAt,
    this.notes,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'pre_invoice_id': preInvoiceId,
    'consumer_code': consumerCode,
    'received_amount': receivedAmount,
    'bank_name': bankName,
    'account_number': accountNumber,
    'transaction_id': transactionId,
    'status': status,
    'statement_image_url': statementImageUrl,
    'transaction_date': transactionDate.toIso8601String(),
    'created_at': createdAt.toIso8601String(),
    'confirmed_at': confirmedAt?.toIso8601String(),
    'notes': notes,
  };

  factory BankStatementModel.fromJson(Map<String, dynamic> json) => BankStatementModel(
    id: json['id'],
    preInvoiceId: json['pre_invoice_id'],
    consumerCode: json['consumer_code'],
    receivedAmount: json['received_amount']?.toDouble() ?? 0.0,
    bankName: json['bank_name'],
    accountNumber: json['account_number'],
    transactionId: json['transaction_id'],
    status: json['status'],
    statementImageUrl: json['statement_image_url'],
    transactionDate: DateTime.parse(json['transaction_date']),
    createdAt: DateTime.parse(json['created_at']),
    confirmedAt: json['confirmed_at'] != null ? DateTime.parse(json['confirmed_at']) : null,
    notes: json['notes'],
  );
}