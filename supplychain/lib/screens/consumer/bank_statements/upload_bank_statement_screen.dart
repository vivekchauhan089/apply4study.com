import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../services/api_service.dart';
import '../../../services/storage_service.dart';
import '../../../models/pre_invoice_model.dart';
import '../../../models/bank_statement_model.dart';
import '../../../utils/constants.dart';

class UploadBankStatementScreen extends StatefulWidget {
  final PreInvoiceModel preInvoice;
  
  const UploadBankStatementScreen({super.key, required this.preInvoice});

  @override
  State<UploadBankStatementScreen> createState() => _UploadBankStatementScreenState();
}

class _UploadBankStatementScreenState extends State<UploadBankStatementScreen> {
  final _receivedAmountCtrl = TextEditingController();
  final _bankNameCtrl = TextEditingController();
  final _accountNumberCtrl = TextEditingController();
  final _transactionIdCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  DateTime? _transactionDate;
  String? _statementImagePath;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _receivedAmountCtrl.text = widget.preInvoice.totalAmount.toString();
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final image = await picker.pickImage(source: ImageSource.camera);
    if (image != null) {
      setState(() {
        _statementImagePath = image.path;
      });
    }
  }

  Future<void> _selectDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now().subtract(const Duration(days: 30)),
      lastDate: DateTime.now(),
    );
    if (date != null) {
      setState(() {
        _transactionDate = date;
      });
    }
  }

  Future<void> _uploadBankStatement() async {
    if (_receivedAmountCtrl.text.isEmpty || 
        _bankNameCtrl.text.isEmpty || 
        _accountNumberCtrl.text.isEmpty || 
        _transactionIdCtrl.text.isEmpty ||
        _transactionDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all required fields')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      await StorageService.getUser();
      
      final bankStatement = BankStatementModel(
        preInvoiceId: widget.preInvoice.id!,
        consumerCode: widget.preInvoice.consumerCode,
        receivedAmount: double.parse(_receivedAmountCtrl.text),
        bankName: _bankNameCtrl.text,
        accountNumber: _accountNumberCtrl.text,
        transactionId: _transactionIdCtrl.text,
        transactionDate: _transactionDate!,
        status: AppConstants.paymentPending,
        statementImageUrl: _statementImagePath,
        createdAt: DateTime.now(),
        notes: _notesCtrl.text.isNotEmpty ? _notesCtrl.text : null,
      );

      final response = await ApiService.uploadBankStatement(bankStatement);
      if (response['success'] == true) {
        if (!mounted) return;
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Bank statement uploaded successfully')),
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
      appBar: AppBar(title: const Text('Upload Bank Statement')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Card(
              color: Colors.blue.shade50,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Pre-Invoice Details', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    Text('Consumer: ${widget.preInvoice.consumerName}'),
                    Text('Code: ${widget.preInvoice.consumerCode}'),
                    Text('Amount: ₹${widget.preInvoice.totalAmount}'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _receivedAmountCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Received Amount (₹) *',
                prefixIcon: Icon(Icons.currency_rupee),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _bankNameCtrl,
              decoration: const InputDecoration(
                labelText: 'Bank Name *',
                prefixIcon: Icon(Icons.account_balance),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _accountNumberCtrl,
              decoration: const InputDecoration(
                labelText: 'Account Number *',
                prefixIcon: Icon(Icons.account_box),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _transactionIdCtrl,
              decoration: const InputDecoration(
                labelText: 'Transaction ID *',
                prefixIcon: Icon(Icons.receipt_long),
              ),
            ),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.calendar_today),
              title: Text(_transactionDate != null 
                ? 'Transaction Date: ${_transactionDate!.day}/${_transactionDate!.month}/${_transactionDate!.year}'
                : 'Select Transaction Date *'),
              onTap: _selectDate,
              tileColor: Colors.grey.shade100,
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Bank Statement Image', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _pickImage,
                        icon: const Icon(Icons.camera_alt),
                        label: Text(_statementImagePath != null ? 'Image Added' : 'Add Statement Image'),
                      ),
                    ),
                  ],
                ),
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
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _uploadBankStatement,
                child: _loading
                  ? const CircularProgressIndicator()
                  : const Text('Upload Bank Statement'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}