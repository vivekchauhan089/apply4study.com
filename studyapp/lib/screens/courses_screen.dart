import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/course_provider.dart';
import '../theme/theme_notifier.dart';
import '../widgets/course_card.dart';

class CoursesScreen extends StatefulWidget {
  final ValueChanged<int>? onCourseSelected; // ✅ added for navigation to detail
  final VoidCallback? onBack; // ✅ added for back navigation

  const CoursesScreen({
    super.key,
    this.onCourseSelected,
    this.onBack,
  });

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  String selectedCategory = 'All';
  String selectedDate = 'Newest';

  final List<String> dateOptions = ['Newest', 'Oldest'];

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Courses'),
        leading: widget.onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: widget.onBack,
              )
            : null,
        actions: [
          IconButton(
            icon: Icon(themeNotifier.isDarkMode
                ? Icons.dark_mode
                : Icons.light_mode),
            onPressed: () => themeNotifier.toggleTheme(),
          ),
        ],
      ),
      body: Consumer<CourseProvider>(
        builder: (context, courseProvider, _) {
          // ✅ Build category filter
          final categories =
              courseProvider.categories.toSet().toList()..remove('All');

          if (selectedCategory != 'All' &&
              !categories.contains(selectedCategory)) {
            selectedCategory = 'All';
          }

          // ✅ Filter by category
          List courses = courseProvider.courses;
          if (selectedCategory != 'All') {
            courses = courses
                .where((c) => c.category == selectedCategory)
                .toList();
          }

          // ✅ Sort by newest/oldest
          courses.sort((a, b) {
            return selectedDate == 'Newest'
                ? b.id.compareTo(a.id)
                : a.id.compareTo(b.id);
          });

          return Column(
            children: [
              // 🔹 Filters
              Padding(
                padding: const EdgeInsets.all(12.0),
                child: Row(
                  children: [
                    // Category Dropdown
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: selectedCategory,
                        decoration: const InputDecoration(
                          labelText: 'Category',
                          border: OutlineInputBorder(),
                          contentPadding:
                              EdgeInsets.symmetric(horizontal: 12),
                        ),
                        items: ['All', ...categories]
                            .map((cat) => DropdownMenuItem(
                                  value: cat,
                                  child: Text(cat),
                                ))
                            .toList(),
                        onChanged: (val) {
                          if (val != null) {
                            setState(() {
                              selectedCategory = val;
                            });
                          }
                        },
                      ),
                    ),
                    const SizedBox(width: 12),
                    // Date Dropdown
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: selectedDate,
                        decoration: const InputDecoration(
                          labelText: 'Date',
                          border: OutlineInputBorder(),
                          contentPadding:
                              EdgeInsets.symmetric(horizontal: 12),
                        ),
                        items: dateOptions
                            .map((d) => DropdownMenuItem(
                                  value: d,
                                  child: Text(d),
                                ))
                            .toList(),
                        onChanged: (val) {
                          if (val != null) {
                            setState(() {
                              selectedDate = val;
                            });
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),

              // 🔹 Course List
              Expanded(
                child: courses.isEmpty
                    ? const Center(child: Text('No courses available'))
                    : ListView.builder(
                        itemCount: courses.length,
                        itemBuilder: (context, index) {
                          final course = courses[index];
                          final backgroundColor = index % 2 == 0
                              ? Colors.indigo.withOpacity(0.08)
                              : Colors.grey.withOpacity(0.08);

                          return Container(
                            color: backgroundColor,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            child: CourseCard(
                              course: course,
                              onCourseSelected: widget.onCourseSelected, // ✅ key fix
                            ),
                          );
                        },
                      ),
              ),
            ],
          );
        },
      ),
    );
  }
}
