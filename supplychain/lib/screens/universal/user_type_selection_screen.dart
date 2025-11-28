import 'package:flutter/material.dart';
import '../../utils/constants.dart';

class UserTypeSelectionScreen extends StatefulWidget {
  const UserTypeSelectionScreen({super.key});

  @override
  State<UserTypeSelectionScreen> createState() => _UserTypeSelectionScreenState();
}

class _UserTypeSelectionScreenState extends State<UserTypeSelectionScreen> {
  String? selectedUserType;
  String? industry;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    industry = ModalRoute.of(context)?.settings.arguments as String?;
  }

  @override
  Widget build(BuildContext context) {
    final userTypes = _getUserTypesForIndustry(industry ?? '');
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select User Type'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select your role in the ${AppConstants.industries[industry]} supply chain:',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: ListView.builder(
                itemCount: userTypes.length,
                itemBuilder: (context, index) {
                  final userType = userTypes[index];
                  final isSelected = selectedUserType == userType['type'];
                  
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    decoration: BoxDecoration(
                      color: isSelected ? Colors.blue.shade50 : null,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: isSelected ? Colors.blue.shade600 : Colors.grey.shade300,
                      ),
                    ),
                    child: ListTile(
                      onTap: () => setState(() => selectedUserType = userType['type']),
                      leading: Icon(
                        userType['icon'],
                        color: isSelected ? Colors.blue.shade600 : Colors.grey.shade600,
                      ),
                      title: Text(
                        userType['title'],
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: isSelected ? Colors.blue.shade600 : Colors.grey.shade800,
                        ),
                      ),
                      subtitle: Text(
                        userType['description'],
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                      trailing: isSelected
                          ? Icon(Icons.check_circle, color: Colors.blue.shade600)
                          : Icon(Icons.radio_button_unchecked, color: Colors.grey.shade400),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: selectedUserType != null ? _continueToSignup : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue.shade600,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text('Continue to Signup', style: TextStyle(fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Map<String, dynamic>> _getUserTypesForIndustry(String industry) {
    final commonTypes = [
      {
        'type': AppConstants.userTypeSupplier,
        'title': 'Supplier',
        'description': 'Provide raw materials or components',
        'icon': Icons.local_shipping,
      },
      {
        'type': AppConstants.userTypeManufacturer,
        'title': 'Manufacturer',
        'description': 'Process and manufacture products',
        'icon': Icons.precision_manufacturing,
      },
      {
        'type': AppConstants.userTypeDistributor,
        'title': 'Distributor',
        'description': 'Distribute products to retailers',
        'icon': Icons.warehouse,
      },
      {
        'type': AppConstants.userTypeRetailer,
        'title': 'Retailer',
        'description': 'Sell products to end consumers',
        'icon': Icons.store,
      },
    ];

    switch (industry) {
      case 'agriculture':
        return [
          {
            'type': AppConstants.userTypeFarmer,
            'title': 'Farmer',
            'description': 'Grow and harvest crops',
            'icon': Icons.agriculture,
          },
          {
            'type': AppConstants.userTypeAgent,
            'title': 'Agent',
            'description': 'Facilitate transactions between parties',
            'icon': Icons.person_outline,
          },
          ...commonTypes,
        ];
      case 'pharmaceutical':
        return [
          ...commonTypes,
          {
            'type': AppConstants.userTypeQualityControl,
            'title': 'Quality Control',
            'description': 'Ensure product quality and compliance',
            'icon': Icons.verified,
          },
        ];
      default:
        return commonTypes;
    }
  }

  void _continueToSignup() {
    Navigator.pushNamed(
      context,
      '/signup',
      arguments: {
        'industry': industry,
        'userType': selectedUserType,
      },
    );
  }
}