class UserModel {
  final int? id;
  final String name;
  final String email;
  final String mobile;
  final String userType;
  final String? address;
  final double? walletBalance;
  final String? industry;
  final int? companyId;
  final String? companyName;
  final String? designation;
  final List<String> permissions;
  final Map<String, dynamic> preferences;
  final bool isActive;
  final DateTime? lastLogin;

  UserModel({
    this.id,
    required this.name,
    required this.email,
    required this.mobile,
    required this.userType,
    this.address,
    this.walletBalance,
    this.industry,
    this.companyId,
    this.companyName,
    this.designation,
    this.permissions = const [],
    this.preferences = const {},
    this.isActive = true,
    this.lastLogin,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'mobile': mobile,
    'user_type': userType,
    'address': address,
    'wallet_balance': walletBalance,
    'industry': industry,
    'company_id': companyId,
    'company_name': companyName,
    'designation': designation,
    'permissions': permissions,
    'preferences': preferences,
    'is_active': isActive,
    'last_login': lastLogin?.toIso8601String(),
  };

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
    id: json['id'],
    name: json['name'],
    email: json['email'],
    mobile: json['mobile'],
    userType: json['user_type'],
    address: json['address'],
    walletBalance: json['wallet_balance']?.toDouble(),
    industry: json['industry'],
    companyId: json['company_id'],
    companyName: json['company_name'],
    designation: json['designation'],
    permissions: List<String>.from(json['permissions'] ?? []),
    preferences: json['preferences'] ?? {},
    isActive: json['is_active'] ?? true,
    lastLogin: json['last_login'] != null ? DateTime.parse(json['last_login']) : null,
  );
}
