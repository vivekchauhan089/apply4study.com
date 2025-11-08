import 'package:flutter/material.dart';
import '../models/course.dart';
import '../widgets/course_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Learning App'),
        actions: [
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline),
            onPressed: () { Navigator.pushNamed(context, '/ai_chat'); },
          ),
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: () { Navigator.pushNamed(context, '/profile'); },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Colors.indigo, Colors.indigoAccent]),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Continue Learning', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Flutter for Beginners', style: TextStyle(color: Colors.white70)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text('Popular Courses', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: sampleCourses.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 0.9,
              ),
              itemBuilder: (context, index) {
                final course = sampleCourses[index];
                /*final bgColor = index % 2 == 0
                    ? Colors.indigo.withOpacity(0.08)
                    : Colors.grey.withOpacity(0.08);*/

                return Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    // color: bgColor,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: CourseCard(course: course),
                );
              },
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () { Navigator.pushNamed(context, '/courses'); },
        label: const Text('All Courses'),
        icon: const Icon(Icons.menu_book),
      ),
    );
  }
}
