import 'package:flutter/material.dart';
import '../../utils/constants.dart';

class IndustrySelectionScreen extends StatefulWidget {
  const IndustrySelectionScreen({super.key});

  @override
  State<IndustrySelectionScreen> createState() => _IndustrySelectionScreenState();
}

class _IndustrySelectionScreenState extends State<IndustrySelectionScreen> {
  String? selectedIndustry;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Your Industry'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Choose your industry to customize the supply chain experience:',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 1.2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: AppConstants.industries.length,
                itemBuilder: (context, index) {
                  final entry = AppConstants.industries.entries.elementAt(index);
                  final isSelected = selectedIndustry == entry.key;
                  
                  return GestureDetector(
                    onTap: () => setState(() => selectedIndustry = entry.key),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected ? Colors.blue.shade50 : Colors.white,
                        border: Border.all(
                          color: isSelected ? Colors.blue.shade600 : Colors.grey.shade300,
                          width: isSelected ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            _getIndustryIcon(entry.key),
                            size: 40,
                            color: isSelected ? Colors.blue.shade600 : Colors.grey.shade600,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            entry.value,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              color: isSelected ? Colors.blue.shade600 : Colors.grey.shade800,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: selectedIndustry != null ? _continueToUserType : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue.shade600,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text('Continue', style: TextStyle(fontSize: 16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData _getIndustryIcon(String industry) {
    switch (industry) {
      case 'agriculture': return Icons.agriculture;
      case 'manufacturing': return Icons.precision_manufacturing;
      case 'pharmaceutical': return Icons.medical_services;
      case 'automotive': return Icons.directions_car;
      case 'textile': return Icons.checkroom;
      case 'electronics': return Icons.memory;
      case 'food_processing': return Icons.restaurant;
      case 'retail': return Icons.store;
      case 'construction': return Icons.construction;
      case 'chemical': return Icons.science;
      case 'energy': return Icons.bolt;
      case 'healthcare': return Icons.local_hospital;
      default: return Icons.business;
    }
  }

  void _continueToUserType() {
    Navigator.pushNamed(
      context,
      '/user-type-selection',
      arguments: selectedIndustry,
    );
  }
}