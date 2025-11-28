class IndustryModel {
  final String id;
  final String name;
  final String description;
  final List<String> categories;
  final List<String> qualityStandards;
  final List<String> complianceRequirements;
  final Map<String, dynamic> specificFields;

  IndustryModel({
    required this.id,
    required this.name,
    required this.description,
    required this.categories,
    required this.qualityStandards,
    required this.complianceRequirements,
    this.specificFields = const {},
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'description': description,
    'categories': categories,
    'quality_standards': qualityStandards,
    'compliance_requirements': complianceRequirements,
    'specific_fields': specificFields,
  };

  factory IndustryModel.fromJson(Map<String, dynamic> json) => IndustryModel(
    id: json['id'],
    name: json['name'],
    description: json['description'],
    categories: List<String>.from(json['categories'] ?? []),
    qualityStandards: List<String>.from(json['quality_standards'] ?? []),
    complianceRequirements: List<String>.from(json['compliance_requirements'] ?? []),
    specificFields: json['specific_fields'] ?? {},
  );
}

class CompanyModel {
  final int? id;
  final String name;
  final String industry;
  final String userType;
  final String email;
  final String phone;
  final String address;
  final String? gstNumber;
  final String? licenseNumber;
  final List<String> certifications;
  final Map<String, dynamic> industrySpecificData;

  CompanyModel({
    this.id,
    required this.name,
    required this.industry,
    required this.userType,
    required this.email,
    required this.phone,
    required this.address,
    this.gstNumber,
    this.licenseNumber,
    this.certifications = const [],
    this.industrySpecificData = const {},
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'industry': industry,
    'user_type': userType,
    'email': email,
    'phone': phone,
    'address': address,
    'gst_number': gstNumber,
    'license_number': licenseNumber,
    'certifications': certifications,
    'industry_specific_data': industrySpecificData,
  };

  factory CompanyModel.fromJson(Map<String, dynamic> json) => CompanyModel(
    id: json['id'],
    name: json['name'],
    industry: json['industry'],
    userType: json['user_type'],
    email: json['email'],
    phone: json['phone'],
    address: json['address'],
    gstNumber: json['gst_number'],
    licenseNumber: json['license_number'],
    certifications: List<String>.from(json['certifications'] ?? []),
    industrySpecificData: json['industry_specific_data'] ?? {},
  );
}