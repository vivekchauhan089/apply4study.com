import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

class ReceiptScanScreen extends StatefulWidget {
  const ReceiptScanScreen({super.key});

  @override
  State<ReceiptScanScreen> createState() => _ReceiptScanScreenState();
}

class _ReceiptScanScreenState extends State<ReceiptScanScreen> {
  File? _image;
  bool _processing = false;
  String _rawText = '';
  List<double> _amounts = [];
  double? _foundTotal;
  String? _errorMessage;

  final ImagePicker _picker = ImagePicker();
  final NumberFormat _nf = NumberFormat.currency(
    symbol: '₹', 
    decimalDigits: 2, 
    locale: 'en_IN',
  );

  final MethodChannel _channel = const MethodChannel('com.example.ocr/channel');

  Future<void> _pickImage() async {
    final XFile? picked = await _picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 85,
    );
    if (picked == null) return;

    setState(() {
      _image = File(picked.path);
      _rawText = '';
      _amounts = [];
      _foundTotal = null;
    });

    await runNativeOcr(_image!);
  }

  Future<void> _pickFromGallery() async {
    final XFile? picked = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 85,
    );
    if (picked == null) return;

    setState(() {
      _image = File(picked.path);
      _rawText = '';
      _amounts = [];
      _foundTotal = null;
    });

    await runNativeOcr(_image!);
  }

  Future<void> runNativeOcr(File imageFile) async {
    try {
      final text = await _channel.invokeMethod(
        'runOcr',
        {'path': imageFile.path},
      );

      debugPrint("OCR Result: $text");

      if (text.trim().isEmpty) {
        setState(() {
          _errorMessage = "No text detected.";
        });
        return;
      }

      setState(() => _rawText = text);

      // 🔢 Extract numbers
      final lines = text.split('\n');
      final amounts = <double>[];

      final numberRegex = RegExp(
        r'(?:₹|Rs\.?|INR|\$)?\s*([0-9]{1,3}(?:[,\s][0-9]{3})*(?:[.,][0-9]{1,2})?|[0-9]+(?:[.,][0-9]{1,2})?)'
      );

      for (final line in lines) {
        for (final m in numberRegex.allMatches(line)) {
          var s = m.group(1)!.replaceAll(' ', '');

          final commaCount = RegExp(',').allMatches(s).length;
          if (commaCount == 1 && !s.contains('.') && s.contains(',')) {
            s = s.replaceAll(',', '.');
          } else {
            s = s.replaceAll(',', '');
          }

          try {
            amounts.add(double.parse(s));
          } catch (_) {}
        }
      }

      // 🧠 Detect total using keywords
      double? candidateTotal;
      final lower = lines.map((e) => e.toLowerCase()).toList();
      final keywords = [
        "total", "grand total", "amount due", "amount paid",
        "balance", "bill amount", "payable",
      ];

      for (int i = 0; i < lower.length; i++) {
        for (final kw in keywords) {
          if (lower[i].contains(kw)) {
            final matches = numberRegex
                .allMatches(lines[i])
                .map((m) => double.tryParse(m.group(1)!.replaceAll(',', '')))
                .whereType<double>()
                .toList();
            if (matches.isNotEmpty) {
              candidateTotal = matches.reduce((a, b) => a > b ? a : b);
            }
          }
        }
      }

      if (candidateTotal == null && amounts.isNotEmpty) {
        candidateTotal = amounts.reduce((a, b) => a > b ? a : b);
      }

      setState(() {
        _amounts = amounts;
        _foundTotal = candidateTotal;
      });
    } catch (e) {
      setState(() => _errorMessage = "OCR failed: $e");
    } finally {
      if (mounted) setState(() => _processing = false);
    }
  }

  double _fallbackSum() {
    final filtered = _amounts.where((v) => v < 10000).toList();
    return filtered.fold(0.0, (a, b) => a + b);
  }

  @override
  Widget build(BuildContext context) {
    final fallback = _fallbackSum();
    final displayTotal = _foundTotal ?? fallback;

    return Scaffold(
      appBar: AppBar(title: const Text("Scan Receipt")),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _processing ? null : _pickImage,
                    icon: const Icon(Icons.camera_alt),
                    label: Text(_processing ? "Processing..." : "Scan (Camera)"),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _processing ? null : _pickFromGallery,
                    icon: const Icon(Icons.photo_library),
                    label: const Text("Pick Image"),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 12),

            if (_image != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.file(_image!, height: 220, fit: BoxFit.contain),
              ),

            const SizedBox(height: 12),

            if (_errorMessage != null)
              Text(_errorMessage!, style: const TextStyle(color: Colors.red)),

            const SizedBox(height: 8),
            const Text("Recognized Text:", style: TextStyle(fontWeight: FontWeight.bold)),
            Expanded(
              child: SingleChildScrollView(
                child: Text(_rawText.isEmpty ? "No text yet." : _rawText),
              ),
            ),

            const Divider(),

            ListTile(
              title: const Text("Detected Amounts"),
              subtitle: Text(_amounts.isEmpty ? "-" : _amounts.map(_nf.format).join(", ")),
            ),

            ListTile(
              title: const Text("Detected Total"),
              subtitle: Text(displayTotal == 0 ? "-" : _nf.format(displayTotal)),
            ),
          ],
        ),
      ),
    );
  }
}
