class ProductModel {
  final int? id;
  final String name;
  final String description;
  final double price;
  final String? imageUrl;
  final String? barcode;
  final String? qrCode;
  final int stock;
  final String category;
  final String industry;
  final String? batchNumber;
  final DateTime? expiryDate;
  final DateTime? manufacturingDate;
  final String? temperatureRequirement;
  final List<String> qualityStandards;
  final List<String> certifications;
  final String? hsn;
  final String? skuCode;
  final double? weight;
  final String? unit;
  final int? minOrderQuantity;
  final String priority;
  final Map<String, dynamic> industrySpecificData;

  ProductModel({
    this.id,
    required this.name,
    required this.description,
    required this.price,
    this.imageUrl,
    this.barcode,
    this.qrCode,
    required this.stock,
    required this.category,
    required this.industry,
    this.batchNumber,
    this.expiryDate,
    this.manufacturingDate,
    this.temperatureRequirement,
    this.qualityStandards = const [],
    this.certifications = const [],
    this.hsn,
    this.skuCode,
    this.weight,
    this.unit,
    this.minOrderQuantity,
    this.priority = 'medium',
    this.industrySpecificData = const {},
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'description': description,
    'price': price,
    'image_url': imageUrl,
    'barcode': barcode,
    'qr_code': qrCode,
    'stock': stock,
    'category': category,
    'industry': industry,
    'batch_number': batchNumber,
    'expiry_date': expiryDate?.toIso8601String(),
    'manufacturing_date': manufacturingDate?.toIso8601String(),
    'temperature_requirement': temperatureRequirement,
    'quality_standards': qualityStandards,
    'certifications': certifications,
    'hsn': hsn,
    'sku_code': skuCode,
    'weight': weight,
    'unit': unit,
    'min_order_quantity': minOrderQuantity,
    'priority': priority,
    'industry_specific_data': industrySpecificData,
  };

  factory ProductModel.fromJson(Map<String, dynamic> json) => ProductModel(
    id: json['id'],
    name: json['name'],
    description: json['description'],
    price: json['price']?.toDouble() ?? 0.0,
    imageUrl: json['image_url'],
    barcode: json['barcode'],
    qrCode: json['qr_code'],
    stock: json['stock'] ?? 0,
    category: json['category'] ?? '',
    industry: json['industry'] ?? '',
    batchNumber: json['batch_number'],
    expiryDate: json['expiry_date'] != null ? DateTime.parse(json['expiry_date']) : null,
    manufacturingDate: json['manufacturing_date'] != null ? DateTime.parse(json['manufacturing_date']) : null,
    temperatureRequirement: json['temperature_requirement'],
    qualityStandards: List<String>.from(json['quality_standards'] ?? []),
    certifications: List<String>.from(json['certifications'] ?? []),
    hsn: json['hsn'],
    skuCode: json['sku_code'],
    weight: json['weight']?.toDouble(),
    unit: json['unit'],
    minOrderQuantity: json['min_order_quantity'],
    priority: json['priority'] ?? 'medium',
    industrySpecificData: json['industry_specific_data'] ?? {},
  );
}
