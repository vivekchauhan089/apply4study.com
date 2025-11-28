class RFQModel {
  final int? id;
  final String title;
  final String description;
  final String industry;
  final String category;
  final int quantity;
  final String unit;
  final DateTime requiredDate;
  final String priority;
  final String status;
  final int buyerId;
  final String buyerName;
  final List<String> specifications;
  final List<String> qualityRequirements;
  final String? budgetRange;
  final String? deliveryLocation;
  final List<RFQResponseModel> responses;
  final DateTime createdAt;
  final DateTime? updatedAt;

  RFQModel({
    this.id,
    required this.title,
    required this.description,
    required this.industry,
    required this.category,
    required this.quantity,
    required this.unit,
    required this.requiredDate,
    required this.priority,
    required this.status,
    required this.buyerId,
    required this.buyerName,
    this.specifications = const [],
    this.qualityRequirements = const [],
    this.budgetRange,
    this.deliveryLocation,
    this.responses = const [],
    required this.createdAt,
    this.updatedAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'description': description,
    'industry': industry,
    'category': category,
    'quantity': quantity,
    'unit': unit,
    'required_date': requiredDate.toIso8601String(),
    'priority': priority,
    'status': status,
    'buyer_id': buyerId,
    'buyer_name': buyerName,
    'specifications': specifications,
    'quality_requirements': qualityRequirements,
    'budget_range': budgetRange,
    'delivery_location': deliveryLocation,
    'responses': responses.map((r) => r.toJson()).toList(),
    'created_at': createdAt.toIso8601String(),
    'updated_at': updatedAt?.toIso8601String(),
  };

  factory RFQModel.fromJson(Map<String, dynamic> json) => RFQModel(
    id: json['id'],
    title: json['title'],
    description: json['description'],
    industry: json['industry'],
    category: json['category'],
    quantity: json['quantity'],
    unit: json['unit'],
    requiredDate: DateTime.parse(json['required_date']),
    priority: json['priority'],
    status: json['status'],
    buyerId: json['buyer_id'],
    buyerName: json['buyer_name'],
    specifications: List<String>.from(json['specifications'] ?? []),
    qualityRequirements: List<String>.from(json['quality_requirements'] ?? []),
    budgetRange: json['budget_range'],
    deliveryLocation: json['delivery_location'],
    responses: (json['responses'] as List? ?? [])
        .map((r) => RFQResponseModel.fromJson(r))
        .toList(),
    createdAt: DateTime.parse(json['created_at']),
    updatedAt: json['updated_at'] != null ? DateTime.parse(json['updated_at']) : null,
  );
}

class RFQResponseModel {
  final int? id;
  final int rfqId;
  final int supplierId;
  final String supplierName;
  final double quotedPrice;
  final int availableQuantity;
  final DateTime deliveryDate;
  final String status;
  final String? notes;
  final List<String> attachments;
  final DateTime createdAt;

  RFQResponseModel({
    this.id,
    required this.rfqId,
    required this.supplierId,
    required this.supplierName,
    required this.quotedPrice,
    required this.availableQuantity,
    required this.deliveryDate,
    required this.status,
    this.notes,
    this.attachments = const [],
    required this.createdAt,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'rfq_id': rfqId,
    'supplier_id': supplierId,
    'supplier_name': supplierName,
    'quoted_price': quotedPrice,
    'available_quantity': availableQuantity,
    'delivery_date': deliveryDate.toIso8601String(),
    'status': status,
    'notes': notes,
    'attachments': attachments,
    'created_at': createdAt.toIso8601String(),
  };

  factory RFQResponseModel.fromJson(Map<String, dynamic> json) => RFQResponseModel(
    id: json['id'],
    rfqId: json['rfq_id'],
    supplierId: json['supplier_id'],
    supplierName: json['supplier_name'],
    quotedPrice: json['quoted_price']?.toDouble() ?? 0.0,
    availableQuantity: json['available_quantity'],
    deliveryDate: DateTime.parse(json['delivery_date']),
    status: json['status'],
    notes: json['notes'],
    attachments: List<String>.from(json['attachments'] ?? []),
    createdAt: DateTime.parse(json['created_at']),
  );
}