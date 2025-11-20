import 'package:flutter/material.dart';
import '../models/notification.dart';

class NotificationDetailScreen extends StatelessWidget {
  const NotificationDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final n = ModalRoute.of(context)!.settings.arguments as NotificationModel;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Notification Details"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (n.image != null)
              Image.network(n.image!, height: 150),
            const SizedBox(height: 20),
            Text(
              n.title,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              n.message,
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 20),
            Text(
              n.timestamp.toString(),
              style: TextStyle(color: Colors.grey.shade600),
            ),
          ],
        ),
      ),
    );
  }
}
