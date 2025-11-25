import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'health_scan_service.dart';
import 'models/health_scan_result.dart';

class SkinScannerScreen extends StatefulWidget {
  const SkinScannerScreen({super.key});

  @override
  State<SkinScannerScreen> createState() => _SkinScannerScreenState();
}

class _SkinScannerScreenState extends State<SkinScannerScreen> {
  File? _image;
  bool _scanning = false;
  HealthScanResult? _result;
  String _selectedScan = '';
  final List<HealthScanResult> _scanHistory = [];

  final ImagePicker _picker = ImagePicker();
  final HealthScanService _service = HealthScanService();

  Future<void> _performScan(String scanType) async {
    setState(() {
      _selectedScan = scanType;
      _result = null;
      _scanning = true;
      _image = null;
    });

    final diseaseScans = ['Skin Disease', 'Eye Disease', 'Nail Analysis', 'Tongue Scan', 'Hair Analysis', 'Wound Check', 'X-ray Scan'];
    if (diseaseScans.contains(scanType)) {
      final source = await _showImageSourceDialog();
      if (source == null) {
        setState(() => _scanning = false);
        return;
      }
      final XFile? picked = await _picker.pickImage(source: source, imageQuality: 85);
      if (picked != null) {
        setState(() => _image = File(picked.path));
      } else {
        setState(() => _scanning = false);
        return;
      }
    }

    final result = await _service.performHealthScan(scanType, _image);
    
    if (!mounted) return;
    setState(() {
      _result = result;
      _scanHistory.add(result);
      _scanning = false;
    });
  }

  Future<ImageSource?> _showImageSourceDialog() async {
    return showDialog<ImageSource>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Select Image Source'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Camera'),
              onTap: () => Navigator.pop(context, ImageSource.camera),
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Gallery'),
              onTap: () => Navigator.pop(context, ImageSource.gallery),
            ),
          ],
        ),
      ),
    );
  }

  void _clearHistory() {
    setState(() => _scanHistory.clear());
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Scan history cleared')),
    );
  }

  void _showDiseaseReport() {
    final diseaseScans = _scanHistory.where((s) => 
      ['Skin Disease', 'Eye Disease', 'Nail Analysis', 'Tongue Scan', 'Hair Analysis', 'Wound Check', 'X-ray Scan'].contains(s.title)
    ).toList();

    if (diseaseScans.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No disease scans performed yet')),
      );
      return;
    }

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) => Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const Text(
                'Disease Report Summary',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                '${diseaseScans.length} scans performed',
                style: TextStyle(color: Colors.grey[600]),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  controller: scrollController,
                  itemCount: diseaseScans.length,
                  itemBuilder: (context, index) {
                    final scan = diseaseScans[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: scan.color.withAlpha((0.2 * 255).round()),
                          child: Icon(scan.icon, color: scan.color),
                        ),
                        title: Text(scan.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 4),
                            Text('Result: ${scan.value}', style: const TextStyle(fontSize: 15)),
                            const SizedBox(height: 2),
                            Text(
                              scan.status,
                              style: TextStyle(color: scan.statusColor, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                        isThreeLine: true,
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {
                        Navigator.pop(context);
                        _clearHistory();
                      },
                      icon: const Icon(Icons.delete_outline),
                      label: const Text('Clear History'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.close),
                      label: const Text('Close'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Health Scanner'),
        actions: [
          IconButton(
            icon: const Icon(Icons.bar_chart),
            onPressed: () => Navigator.pushNamed(context, '/health-report'),
            tooltip: 'View Report',
          ),
          if (_scanHistory.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.delete_outline),
              onPressed: _clearHistory,
              tooltip: 'Clear History',
            ),
          IconButton(
            icon: Badge(
              label: Text('${_scanHistory.where((s) => ['Skin Disease', 'Eye Disease', 'Nail Analysis', 'Tongue Scan', 'Hair Analysis', 'Wound Check', 'X-ray Scan'].contains(s.title)).length}'),
              isLabelVisible: _scanHistory.isNotEmpty,
              child: const Icon(Icons.summarize),
            ),
            onPressed: _showDiseaseReport,
            tooltip: 'Disease Report',
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Text(
              'Vital Signs',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.2,
              children: [
                _buildScanCard('Heart Rate', Icons.favorite, Colors.red),
                _buildScanCard('Breathe Rate', Icons.air, Colors.blue),
                _buildScanCard('Temperature', Icons.thermostat, Colors.purple),
                _buildScanCard('Blood Pressure', Icons.monitor_heart, Colors.pink),
                _buildScanCard('Oxygen Level', Icons.water_drop, Colors.cyan),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Disease Detection',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                TextButton.icon(
                  onPressed: _showDiseaseReport,
                  icon: const Icon(Icons.summarize, size: 18),
                  label: const Text('View Report'),
                ),
              ],
            ),
            const SizedBox(height: 12),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.2,
              children: [
                _buildScanCard('Skin Disease', Icons.face, Colors.orange),
                _buildScanCard('Eye Disease', Icons.remove_red_eye, Colors.teal),
                _buildScanCard('Nail Analysis', Icons.back_hand, Colors.brown),
                _buildScanCard('Tongue Scan', Icons.coronavirus, Colors.redAccent),
                _buildScanCard('Hair Analysis', Icons.face_retouching_natural, Colors.amber),
                _buildScanCard('Wound Check', Icons.healing, Colors.deepOrange),
                _buildScanCard('X-ray Scan', Icons.medical_information, Colors.indigo),
              ],
            ),

            if (_scanning)
              const Padding(
                padding: EdgeInsets.all(20),
                child: CircularProgressIndicator(),
              ),

            if (_image != null && ['Skin Disease', 'Eye Disease', 'Nail Analysis', 'Tongue Scan', 'Hair Analysis', 'Wound Check', 'X-ray Scan'].contains(_selectedScan))
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.file(_image!, height: 200, fit: BoxFit.cover),
                ),
              ),

            if (_result != null) ...[
              const SizedBox(height: 20),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(_result!.icon, color: _result!.color, size: 32),
                          const SizedBox(width: 12),
                          Text(
                            _result!.title,
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      
                      Center(
                        child: Text(
                          _result!.value,
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                            color: _result!.color,
                          ),
                        ),
                      ),
                      
                      Center(
                        child: Text(
                          _result!.status,
                          style: TextStyle(
                            fontSize: 18,
                            color: _result!.statusColor,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      
                      const SizedBox(height: 16),
                      const Divider(),
                      const SizedBox(height: 8),
                      
                      const Text(
                        'Recommendations:',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      
                      ..._result!.recommendations.map((rec) => Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('• ', style: TextStyle(fontSize: 16)),
                            Expanded(child: Text(rec)),
                          ],
                        ),
                      )),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildScanCard(String title, IconData icon, Color color) {
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: () => _performScan(title),
        borderRadius: BorderRadius.circular(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: color),
            const SizedBox(height: 8),
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}
