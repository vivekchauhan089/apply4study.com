import 'dart:math';

import 'package:flutter/material.dart';
import '../../services/api_service.dart';

class NearbyPlace {
  final String id;
  final String name;
  final String category;
  final double distanceKm;

  NearbyPlace({required this.id, required this.name, required this.category, required this.distanceKm});
}

class NearbyScreen extends StatefulWidget {
  const NearbyScreen({super.key});

  @override
  State<NearbyScreen> createState() => _NearbyScreenState();
}

class _NearbyScreenState extends State<NearbyScreen> {
  final List<NearbyPlace> _all = [];
  String _filter = 'All';

  @override
  void initState() {
    super.initState();
    _generateMock();
    _tryLoadFromApi();
  }

  Future<void> _tryLoadFromApi() async {
    try {
      final data = await ApiService.instance.fetchNearby();
      setState(() {
        _all.clear();
        for (final item in data) {
          if (item is Map<String, dynamic>) {
            _all.add(NearbyPlace(
              id: item['id']?.toString() ?? DateTime.now().millisecondsSinceEpoch.toString(),
              name: item['name'] ?? item['title'] ?? 'Place',
              category: item['category'] ?? 'Other',
              distanceKm: (item['distanceKm'] is num) ? (item['distanceKm'] as num).toDouble() : 0.0,
            ));
          }
        }
      });
    } catch (_) {
      // keep mock data
    }
  }

  void _generateMock() {
    final rnd = Random(42);
    final cats = ['Restaurants', 'Hospitals', 'ATMs', 'Gas', 'Shops'];
    for (var i = 0; i < 12; i++) {
      final cat = cats[i % cats.length];
      _all.add(NearbyPlace(
        id: i.toString(),
        name: '$cat ${i + 1}',
        category: cat,
        distanceKm: (0.2 + rnd.nextDouble() * 5.0),
      ));
    }
  }

  List<NearbyPlace> get _visible => _filter == 'All' ? _all : _all.where((p) => p.category == _filter).toList();

  @override
  Widget build(BuildContext context) {
    final cats = <String>{'All'}..addAll(_all.map((e) => e.category));
    return Scaffold(
      appBar: AppBar(title: const Text('Nearby Services')),
      body: Column(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.all(8),
            child: Row(
              children: cats.map((c) {
                final sel = c == _filter;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  child: ChoiceChip(
                    label: Text(c),
                    selected: sel,
                    onSelected: (_) => setState(() => _filter = c),
                  ),
                );
              }).toList(),
            ),
          ),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(12),
              itemCount: _visible.length,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, i) {
                final p = _visible[i];
                return ListTile(
                  title: Text(p.name),
                  subtitle: Text('${p.category} • ${p.distanceKm.toStringAsFixed(1)} km'),
                  trailing: ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Opening navigation to ${p.name}')));
                    },
                    child: const Text('Navigate'),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
