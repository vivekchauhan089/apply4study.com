import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class Friend {
  final String id;
  final String name;
  DateTime lastSeen;
  double lat;
  double lng;
  bool sharing;

  Friend({
    required this.id,
    required this.name,
    DateTime? lastSeen,
    double? lat,
    double? lng,
    this.sharing = true,
  })  : lastSeen = lastSeen ?? DateTime.now(),
        lat = lat ?? 0.0,
        lng = lng ?? 0.0;

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'lastSeen': lastSeen.toIso8601String(),
        'lat': lat,
        'lng': lng,
        'sharing': sharing,
      };

  static Friend fromJson(Map<String, dynamic> j) => Friend(
        id: j['id'] as String,
        name: j['name'] as String,
        lastSeen: DateTime.parse(j['lastSeen'] as String),
        lat: (j['lat'] as num).toDouble(),
        lng: (j['lng'] as num).toDouble(),
        sharing: j['sharing'] as bool,
      );
}

class FriendTrackerScreen extends StatefulWidget {
  const FriendTrackerScreen({super.key});

  @override
  State<FriendTrackerScreen> createState() => _FriendTrackerScreenState();
}

class _FriendTrackerScreenState extends State<FriendTrackerScreen> {
  final List<Friend> _friends = [];
  Timer? _ticker;
  final Random _rng = Random();
  bool _shareMyLocation = false;

  @override
  void initState() {
    super.initState();
    _load();
    _startSimulation();
    _tryLoadFromApi();
  }

  Future<void> _tryLoadFromApi() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      final data = await ApiService.instance.fetchFriends(userId);
      if (data.isNotEmpty) {
        setState(() {
          _friends.clear();
          for (final item in data) {
            if (item is Map<String, dynamic>) {
              _friends.add(Friend(
                id: item['id']?.toString() ?? DateTime.now().millisecondsSinceEpoch.toString(),
                name: item['name'] ?? 'Friend',
                lat: (item['lat'] is num) ? (item['lat'] as num).toDouble() : 0.0,
                lng: (item['lng'] is num) ? (item['lng'] as num).toDouble() : 0.0,
                lastSeen: item['lastSeen'] != null ? DateTime.parse(item['lastSeen']) : DateTime.now(),
                sharing: item['sharing'] ?? true,
              ));
            }
          }
        });
      }
    } catch (_) {
      // ignore and use local data
    }
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getStringList('iot_friends') ?? [];
    setState(() {
      _friends.clear();
      _friends.addAll(raw.map((s) => Friend.fromJson(jsonDecode(s) as Map<String, dynamic>)));
      _shareMyLocation = prefs.getBool('iot_share_me') ?? false;
    });
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = _friends.map((f) => jsonEncode(f.toJson())).toList();
    await prefs.setStringList('iot_friends', raw);
    await prefs.setBool('iot_share_me', _shareMyLocation);
  }

  void _startSimulation() {
    // Simulate friend location updates every 8 seconds
    _ticker = Timer.periodic(const Duration(seconds: 8), (_) {
      if (!mounted) return;
      if (_friends.isEmpty) return;
      setState(() {
        for (var f in _friends) {
          // small random walk
          f.lat += (_rng.nextDouble() - 0.5) * 0.0015;
          f.lng += (_rng.nextDouble() - 0.5) * 0.0015;
          f.lastSeen = DateTime.now().subtract(Duration(seconds: _rng.nextInt(30)));
        }
      });
      _save();
    });
  }

  Future<void> _addFriendDialog() async {
    final nameCtrl = TextEditingController();
    final res = await showDialog<bool>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('Add Friend'),
        content: TextField(
          controller: nameCtrl,
          decoration: const InputDecoration(hintText: 'Friend name'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('Cancel')),
          ElevatedButton(onPressed: () => Navigator.pop(c, true), child: const Text('Add')),
        ],
      ),
    );

    if (res != true) return;
    final name = nameCtrl.text.trim();
    if (name.isEmpty) return;
    final f = Friend(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      name: name,
      lat: 12.9716 + (_rng.nextDouble() - 0.5) * 0.1,
      lng: 77.5946 + (_rng.nextDouble() - 0.5) * 0.1,
      lastSeen: DateTime.now(),
    );
    setState(() => _friends.insert(0, f));
    await _save();
    // try to inform server of new friend/location
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('username') ?? prefs.getString('mobile') ?? 'guest';
      await ApiService.instance.updateFriendLocation(userId, f.toJson());
    } catch (_) {
      // ignore
    }
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Friend added')));
  }

  Future<void> _removeFriend(Friend f) async {
    setState(() => _friends.removeWhere((x) => x.id == f.id));
    await _save();
  }

  String _timeAgo(DateTime t) {
    final diff = DateTime.now().difference(t);
    if (diff.inSeconds < 60) return '${diff.inSeconds}s ago';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }

  double _distanceEstimate(Friend f) {
    // very rough haversine-ish small-distance estimator
    final dx = (f.lat - 12.9716) * 111000; // meters per deg latitude
    final dy = (f.lng - 77.5946) * 111000 * cos(f.lat * pi / 180);
    return sqrt(dx * dx + dy * dy);
  }

  Future<void> _requestLocation(Friend f) async {
    // Simulated request: show dialog with last known coords
    await showDialog<void>(
      context: context,
      builder: (c) => AlertDialog(
        title: Text('Location for ${f.name}'),
        content: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Last seen: ${_timeAgo(f.lastSeen)}'),
          const SizedBox(height: 8),
          Text('Lat: ${f.lat.toStringAsFixed(5)}'),
          Text('Lng: ${f.lng.toStringAsFixed(5)}'),
          const SizedBox(height: 8),
          Text('Estimated distance: ${_distanceEstimate(f).toStringAsFixed(0)} m'),
        ]),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c), child: const Text('Close')),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Friend Tracker'),
        actions: [
          Row(
            children: [
              const Icon(Icons.my_location, size: 18),
              Switch(
                value: _shareMyLocation,
                onChanged: (v) async {
                  setState(() => _shareMyLocation = v);
                  await _save();
                },
              ),
            ],
          )
        ],
      ),
      body: _friends.isEmpty
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.people_outline, size: 64, color: Colors.grey),
                    const SizedBox(height: 12),
                    const Text('No friends added yet', style: TextStyle(fontSize: 18)),
                    const SizedBox(height: 8),
                    const Text('Tap + to add a friend and start tracking'),
                  ],
                ),
              ),
            )
          : RefreshIndicator(
              onRefresh: _load,
              child: ListView.builder(
                itemCount: _friends.length,
                itemBuilder: (context, i) {
                  final f = _friends[i];
                  final dist = _distanceEstimate(f);
                  return Card(
                    margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    child: ListTile(
                      leading: CircleAvatar(child: Text(f.name.substring(0, 1).toUpperCase())),
                      title: Text(f.name),
                      subtitle: Text('Last: ${_timeAgo(f.lastSeen)} • ${dist.toStringAsFixed(0)} m'),
                      trailing: PopupMenuButton<String>(
                        onSelected: (opt) async {
                          if (opt == 'request') await _requestLocation(f);
                          if (opt == 'remove') await _removeFriend(f);
                          if (opt == 'toggle') {
                            setState(() => f.sharing = !f.sharing);
                            await _save();
                          }
                        },
                        itemBuilder: (_) => [
                          const PopupMenuItem(value: 'request', child: Text('Request Location')),
                          PopupMenuItem(value: 'toggle', child: Text(f.sharing ? 'Stop Sharing' : 'Allow Sharing')),
                          const PopupMenuItem(value: 'remove', child: Text('Remove Friend')),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addFriendDialog,
        child: const Icon(Icons.person_add),
      ),
    );
  }
}
