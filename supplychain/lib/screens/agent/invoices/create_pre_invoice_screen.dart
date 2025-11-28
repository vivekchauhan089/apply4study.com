import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../services/api_service.dart';
import '../../../services/storage_service.dart';
import '../../../models/pre_invoice_model.dart';
import '../../../utils/constants.dart';

class CreatePreInvoiceScreen extends StatefulWidget {
  const CreatePreInvoiceScreen({super.key});

  @override
  State<CreatePreInvoiceScreen> createState() => _CreatePreInvoiceScreenState();
}

class _CreatePreInvoiceScreenState extends State<CreatePreInvoiceScreen> {
  final _consumerCodeCtrl = TextEditingController();
  final _consumerNameCtrl = TextEditingController();
  final _demandQuantityCtrl = TextEditingController();
  final _ratePerTonCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  String _selectedGrade = AppConstants.caneGrades.first;
  bool _loading = false;
  Future<void> _scanPreInvoiceImage() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(source: ImageSource.camera);
      
      if (image != null) {
        await _processScannedInvoice(image.path);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error scanning image: $e')),
        );
      }
    }
  }

  Future<void> _processScannedInvoice(String imagePath) async {
    setState(() => _loading = true);
    
    // Mock OCR processing
    await Future.delayed(const Duration(seconds: 2));
    
    // Auto-fill form with extracted data
    setState(() {
      _consumerCodeCtrl.text = 'SC${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}';
      _consumerNameCtrl.text = 'Sugar Mill Ltd';
      _demandQuantityCtrl.text = '50';
      _ratePerTonCtrl.text = '3500';
      _selectedGrade = AppConstants.caneGrades.first;
      _loading = false;
    });
    
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invoice data extracted from image')),
      );
    }
  }

  Future<void> _createPreInvoice() async {
    if (_consumerCodeCtrl.text.isEmpty || 
        _consumerNameCtrl.text.isEmpty || 
        _demandQuantityCtrl.text.isEmpty || 
        _ratePerTonCtrl.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all required fields')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      final user = await StorageService.getUser();
      final demandQuantity = double.parse(_demandQuantityCtrl.text);
      final ratePerTon = double.parse(_ratePerTonCtrl.text);
      
      final preInvoice = PreInvoiceModel(
        consumerCode: _consumerCodeCtrl.text,
        consumerName: _consumerNameCtrl.text,
        agentId: user!.id.toString(),
        demandQuantity: demandQuantity,
        caneGrade: _selectedGrade,
        ratePerTon: ratePerTon,
        totalAmount: demandQuantity * ratePerTon,
        status: AppConstants.invoicePending,
        createdAt: DateTime.now(),
        notes: _notesCtrl.text.isNotEmpty ? _notesCtrl.text : null,
      );

      final response = await ApiService.createPreInvoice(preInvoice);
      if (response['success'] == true) {
        if (!mounted) return;
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Pre-invoice created successfully')),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
    if (mounted) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Pre-Invoice')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _consumerCodeCtrl,
              decoration: const InputDecoration(
                labelText: 'Consumer Code *',
                prefixIcon: Icon(Icons.qr_code),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _consumerNameCtrl,
              decoration: const InputDecoration(
                labelText: 'Consumer Name *',
                prefixIcon: Icon(Icons.business),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _demandQuantityCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Demand Quantity (tons) *',
                prefixIcon: Icon(Icons.scale),
              ),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              initialValue: _selectedGrade,
              decoration: const InputDecoration(
                labelText: 'Sugar Cane Grade',
                prefixIcon: Icon(Icons.grade),
              ),
              items: AppConstants.caneGrades.map((grade) => 
                DropdownMenuItem(value: grade, child: Text(grade))
              ).toList(),
              onChanged: (val) => setState(() => _selectedGrade = val!),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _ratePerTonCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Rate per Ton (₹) *',
                prefixIcon: Icon(Icons.currency_rupee),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _notesCtrl,
              maxLines: 3,
              decoration: const InputDecoration(
                labelText: 'Notes (Optional)',
                prefixIcon: Icon(Icons.note),
              ),
            ),
            const SizedBox(height: 24),
            
            // Total Amount Display
            if (_demandQuantityCtrl.text.isNotEmpty && _ratePerTonCtrl.text.isNotEmpty)
              Card(
                color: Colors.blue.shade50,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Total Amount:', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      Text(
                        '₹${(double.tryParse(_demandQuantityCtrl.text) ?? 0) * (double.tryParse(_ratePerTonCtrl.text) ?? 0)}',
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 24),
            
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _scanPreInvoiceImage,
                    icon: const Icon(Icons.camera_alt),
                    label: const Text('Scan Invoice'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _loading ? null : _createPreInvoice,
                    child: _loading
                      ? const CircularProgressIndicator()
                      : const Text('Create Manual'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}