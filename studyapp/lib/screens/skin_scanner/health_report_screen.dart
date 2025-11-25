import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../data/local_db.dart';

class HealthReportScreen extends StatefulWidget {
  const HealthReportScreen({super.key});

  @override
  State<HealthReportScreen> createState() => _HealthReportScreenState();
}

class _HealthReportScreenState extends State<HealthReportScreen> {
  final LocalDb _db = LocalDb();
  String _selectedScan = 'Heart Rate';
  int _selectedDays = 7;
  List<HealthScan> _scans = [];
  bool _loading = true;

  final List<String> _scanTypes = [
    'Heart Rate',
    'Breathe Rate',
    'Temperature',
    'Blood Pressure',
    'Oxygen Level',
    'Skin Disease',
    'Eye Disease',
    'Nail Analysis',
    'Tongue Scan',
    'Hair Analysis',
    'Wound Check',
    'X-ray Scan',
  ];

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _loading = true);
    final prefs = await SharedPreferences.getInstance();
    final mobile = prefs.getString('mobile') ?? '';
    final scans = await _db.getHealthScansByType(mobile, _selectedScan, days: _selectedDays);
    setState(() {
      _scans = scans;
      _loading = false;
    });
  }

  List<FlSpot> _getChartData() {
    if (_scans.isEmpty) return [];
    
    return _scans.asMap().entries.map((entry) {
      final value = _extractNumericValue(entry.value.value);
      return FlSpot(entry.key.toDouble(), value);
    }).toList();
  }

  double _extractNumericValue(String value) {
    final regex = RegExp(r'(\d+\.?\d*)');
    final match = regex.firstMatch(value);
    return match != null ? double.tryParse(match.group(1)!) ?? 0 : 0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Health Report'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField<String>(
                  initialValue: _selectedScan,
                  decoration: const InputDecoration(labelText: 'Scan Type'),
                  items: _scanTypes.map((type) => DropdownMenuItem(value: type, child: Text(type))).toList(),
                  onChanged: (value) {
                    if (value != null) {
                      setState(() => _selectedScan = value);
                      _loadData();
                    }
                  },
                ),
                const SizedBox(height: 12),
                SegmentedButton<int>(
                  segments: const [
                    ButtonSegment(value: 7, label: Text('7 Days')),
                    ButtonSegment(value: 30, label: Text('30 Days')),
                    ButtonSegment(value: 90, label: Text('90 Days')),
                  ],
                  selected: {_selectedDays},
                  onSelectionChanged: (Set<int> selected) {
                    setState(() => _selectedDays = selected.first);
                    _loadData();
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _scans.isEmpty
                    ? const Center(child: Text('No data available'))
                    : SingleChildScrollView(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          children: [
                            Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      _selectedScan,
                                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                                    ),
                                    const SizedBox(height: 20),
                                    SizedBox(
                                      height: 250,
                                      child: LineChart(
                                        LineChartData(
                                          gridData: const FlGridData(show: true),
                                          titlesData: FlTitlesData(
                                            leftTitles: AxisTitles(
                                              sideTitles: SideTitles(
                                                showTitles: true,
                                                reservedSize: 40,
                                                getTitlesWidget: (value, meta) => Text(
                                                  value.toInt().toString(),
                                                  style: const TextStyle(fontSize: 10),
                                                ),
                                              ),
                                            ),
                                            bottomTitles: AxisTitles(
                                              sideTitles: SideTitles(
                                                showTitles: true,
                                                getTitlesWidget: (value, meta) {
                                                  if (value.toInt() >= 0 && value.toInt() < _scans.length) {
                                                    final date = _scans[value.toInt()].scanDate;
                                                    return Text(
                                                      '${date.day}/${date.month}',
                                                      style: const TextStyle(fontSize: 10),
                                                    );
                                                  }
                                                  return const Text('');
                                                },
                                              ),
                                            ),
                                            rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                                            topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                                          ),
                                          borderData: FlBorderData(show: true),
                                          lineBarsData: [
                                            LineChartBarData(
                                              spots: _getChartData(),
                                              isCurved: true,
                                              color: Colors.blue,
                                              barWidth: 3,
                                              dotData: const FlDotData(show: true),
                                              belowBarData: BarAreaData(
                                                show: true,
                                                color: Colors.blue.withAlpha((0.3 * 255).round()),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Card(
                              child: ListView.separated(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                itemCount: _scans.length,
                                separatorBuilder: (_, __) => const Divider(),
                                itemBuilder: (context, index) {
                                  final scan = _scans[index];
                                  return ListTile(
                                    leading: CircleAvatar(
                                      child: Text('${index + 1}'),
                                    ),
                                    title: Text(scan.value, style: const TextStyle(fontWeight: FontWeight.bold)),
                                    subtitle: Text(scan.status),
                                    trailing: Text(
                                      '${scan.scanDate.day}/${scan.scanDate.month}/${scan.scanDate.year}',
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
          ),
        ],
      ),
    );
  }
}
