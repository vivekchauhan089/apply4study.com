import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  static const _notifKey = 'settings_notifications';
  static const _darkKey = 'settings_darkmode';
  bool _notifications = true;
  bool _darkMode = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _notifications = prefs.getBool(_notifKey) ?? true;
      _darkMode = prefs.getBool(_darkKey) ?? false;
    });
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_notifKey, _notifications);
    await prefs.setBool(_darkKey, _darkMode);
  }

  Future<void> _clearAppData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('App data cleared.')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          SwitchListTile(
            title: const Text('Enable notifications'),
            value: _notifications,
            onChanged: (v) => setState(() {
              _notifications = v;
              _save();
            }),
          ),
          SwitchListTile(
            title: const Text('Enable dark mode (app)') ,
            value: _darkMode,
            onChanged: (v) => setState(() {
              _darkMode = v;
              _save();
            }),
          ),
          ListTile(
            leading: const Icon(Icons.person_outline),
            title: const Text('Account'),
            subtitle: const Text('View and edit account details'),
            onTap: () => Navigator.pushNamed(context, '/profile'),
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Logout'),
            onTap: () => Navigator.pushNamed(context, '/logout'),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: _clearAppData,
            child: const Text('Clear app data'),
          ),
        ],
      ),
    );
  }
}
