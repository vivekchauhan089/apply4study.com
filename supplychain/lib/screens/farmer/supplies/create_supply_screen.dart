import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import '../../../services/api_service.dart';
import '../../../services/storage_service.dart';
import '../../../models/pre_invoice_model.dart';
import '../../../models/weighted_slip_model.dart';
import '../../../utils/constants.dart';

class CreateSupplyScreen extends StatefulWidget {
  final PreInvoiceModel? preInvoice;
  
  const CreateSupplyScreen({super.key, this.preInvoice});

  @override
  State<CreateSupplyScreen> createState() => _CreateSupplyScreenState();
}

class _CreateSupplyScreenState extends State<CreateSupplyScreen> {
  final _consumerCodeCtrl = TextEditingController();
  final _actualWeightCtrl = TextEditingController();
  final _rateCtrl = TextEditingController();
  String _selectedGrade = AppConstants.caneGrades.first;
  String? _slipImagePath;
  String? _scannedQrCode;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    if (widget.preInvoice != null) {
      _consumerCodeCtrl.text = widget.preInvoice!.consumerCode;
      _rateCtrl.text = widget.preInvoice!.ratePerTon.toString();
      _selectedGrade = widget.preInvoice!.caneGrade;
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final image = await picker.pickImage(source: ImageSource.camera);
    if (image != null) {
      setState(() {
        _slipImagePath = image.path;
      });
    }
  }

  Future<void> _scanQrCode() async {
    final result = await Navigator.push<String>(
      context,
      MaterialPageRoute(
        builder: (context) => const QrScannerScreen(),
      ),
    );
    if (result != null) {
      setState(() {
        _scannedQrCode = result;
      });
    }
  }

  Future<void> _submitSupply() async {
    if (_consumerCodeCtrl.text.isEmpty || _actualWeightCtrl.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all required fields')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      final user = await StorageService.getUser();
      final actualWeight = double.parse(_actualWeightCtrl.text);
      final rate = double.parse(_rateCtrl.text);
      
      final weightedSlip = WeightedSlipModel(
        preInvoiceId: widget.preInvoice?.id ?? 0,
        consumerCode: _consumerCodeCtrl.text,
        farmerCode: user!.id.toString(),
        actualWeight: actualWeight,
        caneGrade: _selectedGrade,
        ratePerTon: rate,
        totalAmount: actualWeight * rate,
        status: AppConstants.supplyPending,
        slipImageUrl: _slipImagePath,
        qrCode: _scannedQrCode,
        createdAt: DateTime.now(),
      );

      final response = await ApiService.uploadWeightedSlip(weightedSlip);
      if (response['success'] == true) {
        if (!mounted) return;
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Supply submitted successfully')),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
    setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Supply')),
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
              enabled: widget.preInvoice == null,
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _actualWeightCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Actual Weight (tons) *',
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
              controller: _rateCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Rate per Ton (₹)',
                prefixIcon: Icon(Icons.currency_rupee),
              ),
              enabled: widget.preInvoice == null,
            ),
            const SizedBox(height: 24),
            
            // Image and QR Code Section
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Attachments', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: _pickImage,
                            icon: const Icon(Icons.camera_alt),
                            label: Text(_slipImagePath != null ? 'Image Added' : 'Add Weight Slip'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: _scanQrCode,
                            icon: const Icon(Icons.qr_code_scanner),
                            label: Text(_scannedQrCode != null ? 'QR Scanned' : 'Scan QR Code'),
                          ),
                        ),
                      ],
                    ),
                    if (_scannedQrCode != null)
                      Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: Text('QR Code: $_scannedQrCode', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // Total Amount Display
            if (_actualWeightCtrl.text.isNotEmpty && _rateCtrl.text.isNotEmpty)
              Card(
                color: Colors.blue.shade50,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Total Amount:', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      Text(
                        '₹${(double.tryParse(_actualWeightCtrl.text) ?? 0) * (double.tryParse(_rateCtrl.text) ?? 0)}',
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue),
                      ),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 24),
            
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _submitSupply,
                child: _loading
                  ? const CircularProgressIndicator()
                  : const Text('Submit Supply'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class QrScannerScreen extends StatefulWidget {
  const QrScannerScreen({super.key});

  @override
  State<QrScannerScreen> createState() => _QrScannerScreenState();
}

class _QrScannerScreenState extends State<QrScannerScreen> {
  MobileScannerController cameraController = MobileScannerController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan QR Code'),
        actions: [
          IconButton(
            icon: const Icon(Icons.flash_on),
            onPressed: () => cameraController.toggleTorch(),
          ),
        ],
      ),
      body: MobileScanner(
        controller: cameraController,
        onDetect: (capture) {
          final List<Barcode> barcodes = capture.barcodes;
          for (final barcode in barcodes) {
            if (barcode.rawValue != null) {
              Navigator.pop(context, barcode.rawValue!);
              break;
            }
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    cameraController.dispose();
    super.dispose();
  }
}