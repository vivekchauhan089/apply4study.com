import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import '../../shared/widgets/bottom_nav.dart';
import '../../providers/course_provider.dart';
import '../../screens/course_detail.dart';

class DiscoverScreen extends StatefulWidget {
  final ValueChanged<int>? onCourseSelected; // ✅ added for navigation to detail
  final VoidCallback? onBack; // ✅ added for back navigation

  const DiscoverScreen({
    super.key,
    this.onCourseSelected,
    this.onBack
  });

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen>
    with TickerProviderStateMixin {
  String searchQuery = '';
  String selectedCategory = 'All';
  late AnimationController _controller;
  late Animation<Offset> _searchOffset;
  late Animation<Offset> _categoryOffset;
  bool _isLoading = true;
  late AnimationController _shimmerController;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    _searchOffset = Tween<Offset>(
      begin: const Offset(0, -1),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.0, 0.3, curve: Curves.easeOut)),
    );

    _categoryOffset = Tween<Offset>(
      begin: const Offset(0, -1),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.2, 0.5, curve: Curves.easeOut)),
    );

    // Simulate loading delay
    Future.delayed(const Duration(seconds: 2), () {
      setState(() {
        _isLoading = false;
      });
    });

    _controller.forward();

    _shimmerController =
        AnimationController(vsync: this, duration: const Duration(seconds: 2))
          ..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  Widget _buildShimmerCard() {
    return AnimatedBuilder(
      animation: _shimmerController,
      builder: (context, child) {
        return Container(
          height: 80,
          margin: const EdgeInsets.symmetric(vertical: 6),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              colors: [
                Colors.grey.shade300,
                Colors.grey.shade100,
                Colors.grey.shade300,
              ],
              stops: [
                (_shimmerController.value - 0.3).clamp(0.0, 1.0),
                _shimmerController.value.clamp(0.0, 1.0),
                (_shimmerController.value + 0.3).clamp(0.0, 1.0)
              ],
              begin: Alignment(-1, -0.3),
              end: Alignment(1, 0.3),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final courseProvider = Provider.of<CourseProvider>(context);
    final courses = courseProvider.courses;
    final categories = courseProvider.categories;

    return Scaffold(
      appBar: AppBar(title: const Text('Discover'), centerTitle: true),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // 🔍 Animated Search Field
            SlideTransition(
              position: _searchOffset,
              child: TextField(
                decoration: const InputDecoration(
                  prefixIcon: Icon(Icons.search),
                  hintText: 'Search courses...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(12)),
                  ),
                ),
                onChanged: (val) {
                  setState(() {
                    searchQuery = val;
                    courseProvider.setQuery(searchQuery);
                  });
                },
              ),
            ),
            const SizedBox(height: 12),

            // 📂 Animated Category Chips
            SlideTransition(
              position: _categoryOffset,
              child: SizedBox(
                height: 40,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: categories.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final category = categories[index];
                    final isSelected = category == selectedCategory;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedCategory = category;
                          courseProvider.setCategory(category);
                        });
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.blue : Colors.grey.shade200,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          category,
                          style: TextStyle(
                            color: isSelected ? Colors.white : Colors.black87,
                            fontWeight:
                                isSelected ? FontWeight.bold : FontWeight.normal,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 16),

            // 📚 Courses List or Shimmer
            Expanded(
              child: _isLoading
                ? ListView.builder(
                    itemCount: 6,
                    itemBuilder: (_, __) => _buildShimmerCard(),
                  )
                : courses.isEmpty
                  ? const Center(child: Text('No courses found'))
                  : ListView.separated(
                    itemCount: courses.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final course = courses[index];

                      final courseAnimation = Tween<Offset>(
                        begin: const Offset(0, 0.3),
                        end: Offset.zero,
                      ).animate(
                        CurvedAnimation(
                          parent: _controller,
                          curve: Interval(
                            0.5 + (index / courses.length) * 0.5,
                            1.0,
                            curve: Curves.easeOut,
                          ),
                        ),
                      );

                      return SlideTransition(
                        position: courseAnimation,
                        child: GestureDetector(
                          onTap: () {
                            if (widget.onCourseSelected != null) {
                              widget.onCourseSelected!(course.id);
                            } else {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => CourseDetail(
                                    courseId: course.id,
                                    onBack: widget.onBack ?? () => Navigator.of(context).pop(),
                                  ),
                                ),
                              );
                            }
                          },
                          child: Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              boxShadow: const [
                                BoxShadow(
                                  color: Colors.black12,
                                  blurRadius: 6,
                                  offset: Offset(0, 3),
                                )
                              ],
                            ),
                            child: Row(
                              children: [
                                Container(
                                  height: 60,
                                  width: 60,
                                  decoration: BoxDecoration(
                                    color: Colors.grey.shade300,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: const Icon(
                                    Icons.play_circle_fill,
                                    size: 36, 
                                    color: Colors.white
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        course.title,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold
                                        )
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        course.subtitle,
                                        style: const TextStyle(
                                          fontSize: 14,
                                          color: Colors.grey
                                        )
                                      ),
                                    ],
                                  ),
                                ),
                                const Icon(
                                  Icons.arrow_forward_ios,
                                  size: 16, color: Colors.grey
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
            ),
          ],
        ),
      ),
      // bottomNavigationBar: const BottomNav(),
    );
  }
}
