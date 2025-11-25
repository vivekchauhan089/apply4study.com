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
  final List<File> _images = [];
  bool _processing = false;
  String _rawText = '';
  List<Map<String, dynamic>> _items = [];
  double _calculatedTotal = 0.0;
  String? _errorMessage;
  String _summary = '';

  final ImagePicker _picker = ImagePicker();
  final NumberFormat _nf = NumberFormat.currency(
    symbol: '₹', 
    decimalDigits: 2, 
    locale: 'en_IN',
  );

  final MethodChannel _channel = const MethodChannel('com.example.ocr/channel');

  void _showImageSourceDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add File(s)'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Camera'),
              onTap: () {
                Navigator.pop(context);
                _addImage(ImageSource.camera);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Gallery'),
              onTap: () {
                Navigator.pop(context);
                _addImage(ImageSource.gallery);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library_outlined),
              title: const Text('Scan File(s)'),
              onTap: () {
                Navigator.pop(context);
                _addMultipleImages();
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _addImage(ImageSource source) async {
    final XFile? picked = await _picker.pickImage(source: source, imageQuality: 85);
    if (picked != null) {
      setState(() {
        _images.add(File(picked.path));
      });
    }
  }

  Future<void> _addMultipleImages() async {
    final List<XFile> picked = await _picker.pickMultipleMedia();
    if (picked.isNotEmpty) {
      setState(() {
        _images.addAll(picked.map((xfile) => File(xfile.path)));
      });
    }
  }

  Future<void> _processAllImages() async {
    if (_images.isEmpty) return;
    
    setState(() {
      _processing = true;
      _rawText = '';
      _items = [];
      _calculatedTotal = 0.0;
      _summary = '';
    });
    
    String combinedText = '';
    final allItems = <Map<String, dynamic>>[];
    
    for (int i = 0; i < _images.length; i++) {
      final text = await _runSingleOcr(_images[i]);
      if (text.isNotEmpty) {
        combinedText += 'Page ${i + 1}:\n$text\n\n';
        final pageItems = _extractItemsFromText(text, i + 1);
        allItems.addAll(pageItems);
      }
    }
    
    final total = allItems.fold(0.0, (sum, item) => sum + item['amount']);
    final summary = _generateSummary(combinedText, allItems, total);
    
    setState(() {
      _rawText = combinedText;
      _items = allItems;
      _calculatedTotal = total;
      _summary = summary;
      _processing = false;
    });
  }

  Future<String> _runSingleOcr(File imageFile) async {
    try {
      final text = await _channel.invokeMethod(
        'runOcr',
        {'path': imageFile.path},
      );
      return text ?? '';
    } catch (e) {
      debugPrint("OCR failed for ${imageFile.path}: $e");
      return '';
    }
  }

  List<Map<String, dynamic>> _extractItemsFromText(String text, int pageNumber) {
    final lines = text.split('\n');
    final items = <Map<String, dynamic>>[];
    final numberRegex = RegExp(r'([0-9]+(?:[.,][0-9]{1,2})?)');

    for (int i = 0; i < lines.length; i++) {
      final line = lines[i].trim();
      if (line.isEmpty) continue;

      final numbers = numberRegex.allMatches(line).map((m) {
        var s = m.group(1)!;
        if (s.contains(',') && !s.contains('.')) s = s.replaceAll(',', '.');
        return double.tryParse(s.replaceAll(',', ''));
      }).whereType<double>().toList();

      if (numbers.isNotEmpty && numbers.last > 0) {
        final itemName = line.replaceAll(numberRegex, '').trim();
        final amount = numbers.last;
        
        items.add({
          'name': itemName.isEmpty ? 'Page $pageNumber Item ${i + 1}' : itemName,
          'amount': amount,
        });
      }
    }
    return items;
  }

  String _generateSummary(String text, List<Map<String, dynamic>> items, double total) {
    final lines = text.split('\n').where((line) => line.trim().isNotEmpty).toList();
    final wordCount = text.split(RegExp(r'\s+')).where((word) => word.isNotEmpty).length;
    final lowerText = text.toLowerCase();
    
    String docType = 'Document';
    String additionalInfo = '';
    
    if (lowerText.contains('receipt') || lowerText.contains('bill')) {
      docType = 'Receipt/Bill';
      additionalInfo = 'Items Found: ${items.length}\nTotal Amount: ${_nf.format(total)}';
    } else if (lowerText.contains('invoice')) {
      docType = 'Invoice';
      additionalInfo = 'Items Found: ${items.length}\nTotal Amount: ${_nf.format(total)}';
    } else if (lowerText.contains('menu')) {
      docType = 'Menu';
    } else if (_isEducationalContent(lowerText)) {
      docType = _getSubjectType(lowerText);
      additionalInfo = _generateEducationalSummary(text);
    }
    
    return '''Document Type: $docType
Total Lines: ${lines.length}
Word Count: $wordCount
$additionalInfo''';
  }
  
  bool _isEducationalContent(String text) {
    final educationalKeywords = ['question', 'solve', 'find', 'calculate', 'prove', 'answer', 'equation', 'formula', 'theorem', 'problem'];
    return educationalKeywords.any((keyword) => text.contains(keyword));
  }
  
  String _getSubjectType(String text) {
    if (text.contains(RegExp(r'[+\-*/=]|equation|algebra|geometry|calculus|trigonometry'))) {
      return 'Math Question Paper';
    } else if (text.contains(RegExp(r'physics|chemistry|biology|science|experiment|formula|atom|molecule'))) {
      return 'Science Question Paper';
    }
    return 'Educational Content';
  }
  
  String _generateEducationalSummary(String text) {
    final questions = text.split(RegExp(r'\d+[.):]')).where((q) => q.trim().isNotEmpty).toList();
    final mathSymbols = RegExp(r'[+\-*/=]').allMatches(text).length;
    
    String hints = '';
    if (text.toLowerCase().contains('solve')) {
      hints += '• Look for key variables and given values\n';
    }
    if (mathSymbols > 0) {
      hints += '• Apply appropriate mathematical formulas\n';
    }
    if (text.toLowerCase().contains('prove')) {
      hints += '• Start with given conditions and work step by step\n';
    }
    
    return '''Questions Detected: ${questions.length}
Solution Hints:
$hints• Break down complex problems into smaller steps
• Show all working clearly''';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Scan Receipt")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _processing ? null : _showImageSourceDialog,
                    icon: const Icon(Icons.add_a_photo),
                    label: const Text("Add Image"),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _processing ? null : _processAllImages,
                    icon: const Icon(Icons.scanner),
                    label: const Text("Scan Files"),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.orange),
                  ),
                ),
              ],
            ),
          ),
          
          if (_images.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text("${_images.length} file(s) selected", style: const TextStyle(fontWeight: FontWeight.bold)),
            ),

          if (_images.length == 1)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.file(_images.first, height: 150, fit: BoxFit.contain),
              ),
            )
          else if (_images.length > 1)
            SizedBox(
              height: 100,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                itemCount: _images.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.file(_images[index], width: 80, height: 100, fit: BoxFit.cover),
                    ),
                  );
                },
              ),
            ),

          if (_errorMessage != null)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
            ),

          if (_summary.isNotEmpty) ...[
            Padding(
              padding: const EdgeInsets.all(12),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Summary", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Text(_summary, style: const TextStyle(fontSize: 14)),
                    ],
                  ),
                ),
              ),
            ),
          ],
          
          if (_items.isNotEmpty) ...[
            const Padding(
              padding: EdgeInsets.all(12),
              child: Text("Scanned Items", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            
            Container(
              color: Colors.grey[200],
              child: const Padding(
                padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                child: Row(
                  children: [
                    Expanded(flex: 3, child: Text("Item", style: TextStyle(fontWeight: FontWeight.bold))),
                    Expanded(flex: 1, child: Text("Amount", style: TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.right)),
                  ],
                ),
              ),
            ),
            
            Expanded(
              child: ListView.builder(
                itemCount: _items.length,
                itemBuilder: (context, index) {
                  final item = _items[index];
                  return Container(
                    decoration: BoxDecoration(
                      border: Border(bottom: BorderSide(color: Colors.grey[300]!)),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 3,
                            child: Text(item['name'], style: const TextStyle(fontSize: 14)),
                          ),
                          Expanded(
                            flex: 1,
                            child: Text(
                              _nf.format(item['amount']),
                              style: const TextStyle(fontSize: 14),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            
            Container(
              color: Colors.orange[100],
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
                child: Row(
                  children: [
                    const Expanded(
                      flex: 3,
                      child: Text("TOTAL", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                    Expanded(
                      flex: 1,
                      child: Text(
                        _nf.format(_calculatedTotal),
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        textAlign: TextAlign.right,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ] else if (_rawText.isNotEmpty)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: SingleChildScrollView(
                  child: Text(_rawText),
                ),
              ),
            ),
        ],
      ),
    );
  }
}