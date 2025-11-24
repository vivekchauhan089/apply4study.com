import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class CabBooking {
  final String id;
  final String pickup;
  final String dropoff;
  final String vehicleType;
  final DateTime scheduledAt;
  final double fare;

  CabBooking({
    required this.id,
    required this.pickup,
    required this.dropoff,
    required this.vehicleType,
    required this.scheduledAt,
    required this.fare,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'pickup': pickup,
        'dropoff': dropoff,
        'vehicleType': vehicleType,
        'scheduledAt': scheduledAt.toIso8601String(),
        'fare': fare,
      };

  static CabBooking fromJson(Map<String, dynamic> j) => CabBooking(
        id: j['id'] as String,
        pickup: j['pickup'] as String,
        dropoff: j['dropoff'] as String,
        vehicleType: j['vehicleType'] as String,
        scheduledAt: DateTime.parse(j['scheduledAt'] as String),
        fare: (j['fare'] as num).toDouble(),
      );
}

class CabBookingScreen extends StatefulWidget {
  const CabBookingScreen({super.key});

  @override
  State<CabBookingScreen> createState() => _CabBookingScreenState();
}

class _CabBookingScreenState extends State<CabBookingScreen> {
  final _pickupCtrl = TextEditingController();
  final _dropCtrl = TextEditingController();
  String _vehicleType = 'Sedan';
  DateTime _scheduledAt = DateTime.now().add(const Duration(minutes: 15));
  bool _loading = false;

  List<CabBooking> _bookings = [];

  @override
  void initState() {
    super.initState();
    _loadBookings();
  }

  @override
  void dispose() {
    _pickupCtrl.dispose();
    _dropCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadBookings() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('cab_bookings') ?? [];
    setState(() {
      _bookings = raw.map((s) => CabBooking.fromJson(jsonDecode(s) as Map<String, dynamic>)).toList();
    });
  }

  Future<void> _saveBooking(CabBooking b) async {
    final prefs = await SharedPreferences.getInstance();
    _bookings.insert(0, b);
    final raw = _bookings.map((e) => jsonEncode(e.toJson())).toList();
    await prefs.setStringList('cab_bookings', raw);
    setState(() {});
  }

  Future<void> _cancelBooking(String id) async {
    final prefs = await SharedPreferences.getInstance();
    _bookings.removeWhere((b) => b.id == id);
    final raw = _bookings.map((e) => jsonEncode(e.toJson())).toList();
    await prefs.setStringList('cab_bookings', raw);
    setState(() {});
  }

  // Simple fare estimator: base fare + per-km * estDistance + vehicle multiplier
  double _estimateFare(String pickup, String drop, String vehicle) {
    final base = 40.0;
    final perKm = 12.0;
    // heuristic distance: use length difference as proxy (not accurate but deterministic)
    final estKm = (pickup.trim().length + drop.trim().length) % 12 + 3; // 3..14 km
    final vehicleMultiplier = vehicle == 'Sedan' ? 1.0 : (vehicle == 'SUV' ? 1.4 : 0.85);
    return (base + perKm * estKm) * vehicleMultiplier;
  }

  Future<void> _pickDateTime() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _scheduledAt,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 30)),
    );
    if (date == null) return;
    if (!mounted) return;
    final time = await showTimePicker(context: context, initialTime: TimeOfDay.fromDateTime(_scheduledAt));
    if (time == null) return;
    if (!mounted) return;
    setState(() => _scheduledAt = DateTime(date.year, date.month, date.day, time.hour, time.minute));
  }

  Future<void> _bookNow() async {
    final pickup = _pickupCtrl.text.trim();
    final drop = _dropCtrl.text.trim();
    if (pickup.isEmpty || drop.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Enter pickup and dropoff')));
      return;
    }
    setState(() => _loading = true);
    await Future.delayed(const Duration(milliseconds: 300));
    final fare = _estimateFare(pickup, drop, _vehicleType);
    final booking = CabBooking(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      pickup: pickup,
      dropoff: drop,
      vehicleType: _vehicleType,
      scheduledAt: _scheduledAt,
      fare: double.parse(fare.toStringAsFixed(2)),
    );
    await _saveBooking(booking);
    // Try to send booking to server
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.createBooking(userId, booking.toJson());
    } catch (_) {
      // ignore
    }
    setState(() => _loading = false);
    if (!mounted) return;
    showDialog(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Booking Confirmed'),
        content: Text('Your ${booking.vehicleType} is booked for ${booking.scheduledAt}. Fare: ₹${booking.fare}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c), child: const Text('OK')),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cab Booking')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Book a cab', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              TextField(
                controller: _pickupCtrl,
                decoration: const InputDecoration(labelText: 'Pickup location', prefixIcon: Icon(Icons.my_location)),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: _dropCtrl,
                decoration: const InputDecoration(labelText: 'Dropoff location', prefixIcon: Icon(Icons.location_on)),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Text('Vehicle: '),
                  const SizedBox(width: 8),
                  DropdownButton<String>(
                    value: _vehicleType,
                    items: const [
                      DropdownMenuItem(value: 'Sedan', child: Text('Sedan')),
                      DropdownMenuItem(value: 'SUV', child: Text('SUV')),
                      DropdownMenuItem(value: 'Mini', child: Text('Mini')),
                    ],
                    onChanged: (v) {
                      if (v == null) return;
                      setState(() => _vehicleType = v);
                    },
                  ),
                  const Spacer(),
                  TextButton.icon(
                    onPressed: _pickDateTime,
                    icon: const Icon(Icons.schedule),
                    label: Text('${_scheduledAt.day}/${_scheduledAt.month} ${_scheduledAt.hour}:${_scheduledAt.minute.toString().padLeft(2, '0')}'),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _loading ? null : _bookNow,
                      child: _loading ? const SizedBox(height: 18, width: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text('Book Now'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: () {
                      final fare = _estimateFare(_pickupCtrl.text.trim(), _dropCtrl.text.trim(), _vehicleType);
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Estimated fare: ₹${fare.toStringAsFixed(2)}')));
                    },
                    child: const Text('Estimate Fare'),
                  ),
                ],
              ),

              const SizedBox(height: 20),
              const Divider(),
              const SizedBox(height: 8),
              const Text('Your bookings', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
              const SizedBox(height: 8),
              ..._bookings.map((b) => Card(
                    child: ListTile(
                      title: Text('${b.vehicleType} • ₹${b.fare.toStringAsFixed(2)}'),
                      subtitle: Text('${b.pickup} → ${b.dropoff}\n${b.scheduledAt}'),
                      isThreeLine: true,
                      trailing: IconButton(
                        icon: const Icon(Icons.cancel),
                        onPressed: () async {
                          final ok = await showDialog<bool>(
                            context: context,
                            builder: (c) => AlertDialog(
                              title: const Text('Cancel booking?'),
                              actions: [
                                TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('No')),
                                TextButton(onPressed: () => Navigator.pop(c, true), child: const Text('Yes')),
                              ],
                            ),
                          );
                          if (!mounted) return;
                          if (ok == true) await _cancelBooking(b.id);
                        },
                      ),
                    ),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
