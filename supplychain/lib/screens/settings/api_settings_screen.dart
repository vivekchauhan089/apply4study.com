import 'package:flutter/material.dart';
import '../../services/api_service.dart';
import '../../services/mock_data_service.dart';

class ApiSettingsScreen extends StatefulWidget {
  const ApiSettingsScreen({super.key});

  @override
  State<ApiSettingsScreen> createState() => _ApiSettingsScreenState();
}

class _ApiSettingsScreenState extends State<ApiSettingsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('API Settings'),
        backgroundColor: Colors.blue.shade600,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          ApiService.isApiActive ? Icons.cloud_done : Icons.cloud_off,
                          color: ApiService.isApiActive ? Colors.green : Colors.red,
                          size: 32,
                        ),
                        const SizedBox(width: 12),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'API Status',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            Text(
                              ApiService.isApiActive ? 'Active' : 'Inactive (Using Mock Data)',
                              style: TextStyle(
                                color: ApiService.isApiActive ? Colors.green : Colors.orange,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SwitchListTile(
                      title: const Text('Enable API'),
                      subtitle: const Text('Toggle between real API and mock data'),
                      value: ApiService.isApiActive,
                      onChanged: (value) {
                        setState(() {
                          ApiService.setApiStatus(value);
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                              value ? 'API Enabled' : 'Using Mock Data',
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Sample Login Credentials',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            _buildCredentialCard(
              'Distributor',
              'distributor@test.com',
              'dist123',
              Icons.warehouse,
              Colors.blue,
            ),
            _buildCredentialCard(
              'Consumer',
              'consumer@test.com',
              'cons123',
              Icons.store,
              Colors.green,
            ),
            _buildCredentialCard(
              'Farmer',
              'farmer@test.com',
              'farm123',
              Icons.agriculture,
              Colors.orange,
            ),
            const SizedBox(height: 24),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Mock Data Statistics',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 12),
                    Text('Products: ${MockDataService.sampleProducts.length}'),
                    Text('Users: ${MockDataService.sampleUsers.length}'),
                    Text('Orders: ${MockDataService.sampleOrders.length}'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCredentialCard(String role, String email, String password, IconData icon, Color color) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(icon, color: color),
        title: Text(role),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Email: $email'),
            Text('Password: $password'),
          ],
        ),
        trailing: IconButton(
          icon: const Icon(Icons.copy),
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('$role credentials noted')),
            );
          },
        ),
      ),
    );
  }
}