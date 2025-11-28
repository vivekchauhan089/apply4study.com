import 'package:flutter/material.dart';
import '../../../services/storage_service.dart';
import '../../../models/user_model.dart';

class DistributorProfileScreen extends StatefulWidget {
  const DistributorProfileScreen({super.key});

  @override
  State<DistributorProfileScreen> createState() => _DistributorProfileScreenState();
}

class _DistributorProfileScreenState extends State<DistributorProfileScreen> {
  UserModel? _user;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    final user = await StorageService.getUser();
    setState(() => _user = user);
  }

  Future<void> _logout() async {
    await StorageService.logout();
    if (!mounted) return;
    Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: _user == null
        ? const Center(child: CircularProgressIndicator())
        : ListView(
            padding: const EdgeInsets.all(16),
            children: [
              const CircleAvatar(radius: 50, child: Icon(Icons.business, size: 50)),
              const SizedBox(height: 16),
              Text(_user!.name, textAlign: TextAlign.center, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              Text(_user!.email, textAlign: TextAlign.center, style: const TextStyle(color: Colors.grey)),
              const Chip(label: Text('Distributor'), backgroundColor: Colors.blue),
              const SizedBox(height: 24),
              ListTile(
                leading: const Icon(Icons.phone),
                title: const Text('Mobile'),
                subtitle: Text(_user!.mobile),
              ),
              ListTile(
                leading: const Icon(Icons.location_on),
                title: const Text('Address'),
                subtitle: Text(_user!.address ?? 'Not set'),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _logout,
                icon: const Icon(Icons.logout),
                label: const Text('Logout'),
                style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              ),
            ],
          ),
    );
  }
}
