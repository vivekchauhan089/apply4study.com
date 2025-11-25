import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/dashboard_provider.dart';
import '../widgets/course_card.dart';
// Using PNG fallbacks for web stability; avoid parsing large SVGs at runtime
import 'package:carousel_slider/carousel_slider.dart';
import '../../../shared/widgets/search_bar.dart';

class DashboardScreen extends StatelessWidget {
  final ValueChanged<int>? onCourseSelected; // ✅ added for navigation to detail
  final VoidCallback? onAllCoursesPressed;
  final VoidCallback? onOpenAIChat;
  final VoidCallback? onProfilePressed;
  final VoidCallback? onOpenNotifications;

  const DashboardScreen({super.key, this.onCourseSelected, this.onAllCoursesPressed, this.onOpenAIChat, this.onProfilePressed, this.onOpenNotifications});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DashboardProvider>(context);
    final courses = provider.courses;
    final cats = provider.categories;

    return Scaffold(
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [

            // ⭐ Avatar Image Section
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 18),
              child: Center(
                child: CircleAvatar(
                  radius: 24,
                  backgroundColor: Colors.orange.shade600,
                  backgroundImage: AssetImage('assets/images/avatar_male.png'),
                ),
              ),
            ),

            // 🔸 Thin Orange Line Divider
            Container(
              height: 2,
              color: Colors.orange.shade900,
              margin: const EdgeInsets.symmetric(horizontal: 20),
            ),

            const SizedBox(height: 10),

            // -------------------------------
            // 📌 MOST USED BY ALL USERS
            // -------------------------------
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text("Quick Actions",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            ),

            ListTile(
              leading: const Icon(Icons.document_scanner_outlined),
              title: const Text('OCR Scanner (Bills, Notes)'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/ocr');
              },
            ),

            ListTile(
              leading: const Icon(Icons.health_and_safety),
              title: const Text('Health Scanner'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/skin-scanner');
              },
            ),

            ListTile(
              leading: const Icon(Icons.qr_code_scanner),
              title: const Text('Scan & Pay'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/qrscan');
              },
            ),

            ListTile(
              leading: const Icon(Icons.local_shipping),
              title: const Text('Food Delivery'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/food');
              },
            ),

            ListTile(
              leading: const Icon(Icons.local_taxi),
              title: const Text('Cab Booking'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/cab');
              },
            ),

            ListTile(
              leading: const Icon(Icons.local_offer),
              title: const Text('Best Deals & Discounts'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/deals');
              },
            ),

            ListTile(
              leading: const Icon(Icons.shopping_bag),
              title: const Text('Orders'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/orders');
              },
            ),

            // -------------------------------
            // 🎓 STUDENT-SPECIFIC UTILITIES
            // -------------------------------
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text("Student Tools",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            ),

            ListTile(
              leading: const Icon(Icons.work_outline),
              title: const Text('Jobs & Internships'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/jobs');
              },
            ),

            ListTile(
              leading: const Icon(Icons.school_outlined),
              title: const Text('Courses & Learning'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/courses');
              },
            ),

            ListTile(
              leading: const Icon(Icons.compare_arrows),
              title: const Text('Compare Colleges / Courses'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/compare');
              },
            ),

            // -------------------------------
            // 🧰 DAILY UTILITIES
            // -------------------------------
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text("Utilities",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            ),

            ListTile(
              leading: const Icon(Icons.receipt_long),
              title: const Text('Expense Tracker'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/expenses');
              },
            ),

            ListTile(
              leading: const Icon(Icons.map_outlined),
              title: const Text('Nearby Services'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/nearby');
              },
            ),

            ListTile(
                leading: const Icon(Icons.support_agent),
                title: const Text('Help & Support'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/support');
              },
            ),

            ListTile(
              leading: const Icon(Icons.notifications_active_outlined),
              title: const Text('Payment Reminders'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/reminders');
              },
            ),

            ListTile(
              leading: const Icon(Icons.track_changes),
              title: const Text('Friend Tracker'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/track');
              },
            ),

            // -------------------------------
            // ⚙️ SETTINGS
            // -------------------------------
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text("App Settings",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            ),

            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Profile'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/profile');
              },
            ),

            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/settings');
              },
            ),

            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Logout'),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/logout');
              },
            ),
          ],
        ),
      ),
      
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Row(children: [
          Builder(
            builder: (context) => IconButton(
              icon: const Icon(Icons.menu),   // ← Drawer icon
              onPressed: () => Scaffold.of(context).openDrawer(),
            ),
          ),
          const SizedBox(width: 6),
          Image.asset('assets/images/logo.png', width: 36, height: 36),
          const SizedBox(width: 12),
        ]),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: onOpenNotifications ?? () { 
              Navigator.pushNamed(context, '/notifications');
            },
          ),
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline),
            onPressed: onOpenAIChat ?? () { 
              Navigator.pushNamed(context, '/ai_chat');
            },
          ),
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: onProfilePressed ?? () { 
              Navigator.pushNamed(context, '/profile');
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
        child: Column(
          children: [
            CarouselSlider(
              items: [
                'assets/images/banner1.png',
                'assets/images/banner2.png',
              ].map((path) {
                return Image.asset(
                  path,
                  fit: BoxFit.cover,
                  width: double.infinity,
                );
              }).toList(),
              options: CarouselOptions(
                height: 140,
                autoPlay: true,
                enlargeCenterPage: true,
                viewportFraction: 0.9,
                autoPlayInterval: const Duration(seconds: 4),
              ),
            ),
            const SizedBox(height: 12),
            CustomSearchBar(onChanged: provider.setQuery),
            const SizedBox(height: 12),
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: cats.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final cat = cats[i];
                  final selected = provider.category == cat;
                  return GestureDetector(
                    onTap: () => provider.setCategory(cat),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.symmetric(
                          horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        color: selected
                            ? Theme.of(context).colorScheme.primary
                            : Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: const [
                          BoxShadow(color: Color(0x04000000), blurRadius: 6)
                        ],
                      ),
                      child: Text(
                        cat,
                        style: TextStyle(
                          color:
                              selected ? Colors.white : Colors.grey[800],
                          fontWeight: selected
                              ? FontWeight.w600
                              : FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: courses.isEmpty
                  ? const Center(child: Text("No courses found"))
                  : GridView.builder(
                      itemCount: courses.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.95,
                      ),
                      itemBuilder: (context, idx) {
                        final course = courses[idx];
                        return Container(
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: CourseCard(
                            course: course,
                            onTap: () => onCourseSelected?.call(course.id), // ✅ FIX HERE
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: onAllCoursesPressed ??
        () {
          // Fallback: navigate via route if not handled by parent
          Navigator.pushNamed(context, '/courses');
        },
        label: const Text('All Courses'),
        icon: const Icon(Icons.menu_book),
      ),
    );
  }
}
