class AppConstants {
  static const String baseUrl = 'https://your-api-url.com/api';
  static const String appName = 'Universal Supply Chain';
  
  // User Types
  static const String userTypeSupplier = 'supplier';
  static const String userTypeManufacturer = 'manufacturer';
  static const String userTypeDistributor = 'distributor';
  static const String userTypeRetailer = 'retailer';
  static const String userTypeConsumer = 'consumer';
  static const String userTypeAgent = 'agent';
  static const String userTypeFarmer = 'farmer';
  static const String userTypeLogistics = 'logistics';
  static const String userTypeQualityControl = 'quality_control';
  static const String userTypeAdmin = 'admin';
  
  // Industries
  static const Map<String, String> industries = {
    'agriculture': 'Agriculture & Farming',
    'manufacturing': 'Manufacturing',
    'pharmaceutical': 'Pharmaceutical',
    'automotive': 'Automotive',
    'textile': 'Textile & Apparel',
    'electronics': 'Electronics',
    'food_processing': 'Food Processing',
    'retail': 'Retail & E-commerce',
    'construction': 'Construction',
    'chemical': 'Chemical',
    'energy': 'Energy & Utilities',
    'healthcare': 'Healthcare',
  };
  
  // Product Categories by Industry
  static const Map<String, List<String>> productCategories = {
    'agriculture': ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Crops', 'Livestock'],
    'manufacturing': ['Raw Materials', 'Components', 'Machinery', 'Tools', 'Finished Goods'],
    'pharmaceutical': ['APIs', 'Excipients', 'Packaging', 'Equipment', 'Finished Drugs'],
    'automotive': ['Parts', 'Components', 'Accessories', 'Tools', 'Vehicles'],
    'textile': ['Fibers', 'Yarns', 'Fabrics', 'Dyes', 'Garments', 'Accessories'],
    'electronics': ['Components', 'Semiconductors', 'PCBs', 'Devices', 'Accessories'],
    'food_processing': ['Ingredients', 'Packaging', 'Equipment', 'Processed Foods'],
    'retail': ['Consumer Goods', 'Apparel', 'Electronics', 'Home & Garden'],
  };
  
  // Quality Standards
  static const Map<String, List<String>> qualityStandards = {
    'agriculture': ['Organic', 'GAP Certified', 'Fair Trade', 'Non-GMO'],
    'pharmaceutical': ['GMP', 'FDA Approved', 'WHO Prequalified', 'ISO 13485'],
    'automotive': ['ISO/TS 16949', 'IATF 16949', 'ISO 9001', 'Six Sigma'],
    'food_processing': ['HACCP', 'FDA', 'USDA', 'Halal', 'Kosher', 'Organic'],
    'electronics': ['ISO 9001', 'RoHS', 'CE', 'FCC', 'UL'],
  };
  
  // Order Status
  static const String orderPending = 'pending';
  static const String orderConfirmed = 'confirmed';
  static const String orderInProduction = 'in_production';
  static const String orderQualityCheck = 'quality_check';
  static const String orderShipped = 'shipped';
  static const String orderInTransit = 'in_transit';
  static const String orderDelivered = 'delivered';
  static const String orderCompleted = 'completed';
  static const String orderCancelled = 'cancelled';
  static const String orderReturned = 'returned';
  
  // Invoice Status
  static const String invoicePending = 'pending';
  static const String invoiceConfirmed = 'confirmed';
  static const String invoiceSupplied = 'supplied';
  static const String invoicePaid = 'paid';
  static const String invoiceCompleted = 'completed';
  static const String invoiceRejected = 'rejected';
  
  // Supply Status
  static const String supplyPending = 'pending';
  static const String supplyDelivered = 'delivered';
  static const String supplyVerified = 'verified';
  
  // Payment Status
  static const String paymentPending = 'pending';
  static const String paymentReleased = 'released';
  static const String paymentConfirmed = 'confirmed';
  
  // Priority Levels
  static const String priorityLow = 'low';
  static const String priorityMedium = 'medium';
  static const String priorityHigh = 'high';
  static const String priorityUrgent = 'urgent';
  
  // Courier Services
  static const List<String> courierServices = [
    'DTDC Courier', 'Blue Dart', 'FedEx Express', 'First Flight',
    'Shipway', 'Delhivery', 'Borzo/Bigship', 'Trackon Courier',
    'NimbusPost', 'Same Day Delivery', 'Custom Schedule',
  ];
  
  // Temperature Requirements
  static const List<String> temperatureRequirements = [
    'Ambient', 'Refrigerated (2-8°C)', 'Frozen (-18°C)', 'Controlled Room Temperature',
  ];
  
  // Compliance Requirements
  static const Map<String, List<String>> complianceRequirements = {
    'pharmaceutical': ['GDP', 'Cold Chain', 'Serialization', 'Track & Trace'],
    'food_processing': ['Cold Chain', 'FIFO', 'Expiry Management', 'Batch Tracking'],
    'automotive': ['Just-in-Time', 'Kanban', 'Supplier Certification'],
    'electronics': ['ESD Protection', 'Moisture Control', 'Component Traceability'],
  };
  
  // Legacy Sugar Cane Grades (for backward compatibility)
  static const List<String> caneGrades = [
    'Grade A (High Sucrose)',
    'Grade B (Medium Sucrose)',
    'Grade C (Low Sucrose)',
  ];
}
