import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../features/dashboard/providers/dashboard_provider.dart';
import '../features/dashboard/screens/dashboard_screen.dart';
import '../screens/planner_screen.dart';
import '../screens/discover_screen.dart';
import '../screens/profile_screen.dart';
import '../screens/courses_screen.dart';
import '../screens/course_detail.dart';
import '../screens/ai_chat_screen.dart';
import '../screens/video_player_screen.dart';
import '../shared/widgets/bottom_nav.dart';
import '../models/course.dart';

class MainNavScreen extends StatefulWidget {
  const MainNavScreen({super.key});

  @override
  State<MainNavScreen> createState() => _MainNavScreenState();
}

class _MainNavScreenState extends State<MainNavScreen> {
  int _currentIndex = 0;

  // ✅ Navigation flags
  bool _showCourses = false;
  bool _showAIChat = false;
  bool _showCourseProgress = false;

  int? _selectedCourseId;

  late final List<Widget> _pages;

  @override
  void initState() {
    super.initState();

    _pages = [
      ChangeNotifierProvider(
        create: (_) => DashboardProvider()..loadDemo(),
        child: DashboardScreen(
          onCourseSelected: _onCourseSelected,
          onAllCoursesPressed: _openCourses,
        ),
      ),
      const PlannerScreen(),
      const DiscoverScreen(),
      const ProfileScreen(),
    ];
  }

  // --- Navigation handlers ---
  void _openCourses() => setState(() {
        _showCourses = true;
        _selectedCourseId = null;
        _showAIChat = false;
        _showCourseProgress = false;
      });

  void _onCourseSelected(int courseId) => setState(() {
        _selectedCourseId = courseId;
        _showCourses = false;
        _showAIChat = false;
        _showCourseProgress = false;
      });

  void _openAIChat() => setState(() {
        _showAIChat = true;
        _showCourses = false;
        _selectedCourseId = null;
        _showCourseProgress = false;
      });

  void _openCourseProgress() => setState(() {
        _showCourseProgress = true;
        _showCourses = false;
        _showAIChat = false;
        _selectedCourseId = null;
      });

  void _onBackPressed() => setState(() {
        if (_selectedCourseId != null) {
          _selectedCourseId = null;
        } else if (_showCourseProgress) {
          _showCourseProgress = false;
        } else if (_showAIChat) {
          _showAIChat = false;
        } else if (_showCourses) {
          _showCourses = false;
        }
      });

  void _onTabTapped(int index) => setState(() {
        _currentIndex = index;
        _showCourses = false;
        _showAIChat = false;
        _showCourseProgress = false;
        _selectedCourseId = null;
      });

  @override
  Widget build(BuildContext context) {
    Widget content;

    if (_selectedCourseId != null) {
      final course = sampleCourses.firstWhere((c) => c.id == _selectedCourseId!);
      content = CourseDetail(
        courseId: _selectedCourseId!,
        onClose: _onBackPressed,
        onOpenAIChat: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => AiChatScreen(onBack: _onBackPressed)),
          );
        },
        onOpenCourseProgress: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => VideoPlayerScreen(
                videoAsset: course.videoAsset, // ✅ required
                onProgressUpdate: (p) {
                  // ❌ Cannot call _saveProgress here! It's internal to CourseDetail
                  // You can optionally update a course model's progress if needed
                  // e.g., course.progress = p;
                }, // ✅ required
                onBack: _onBackPressed,
              ),
            ),
          );
        },
      );
    } else if (_showCourseProgress) {
      final course = sampleCourses.firstWhere((c) => c.id == _selectedCourseId!);
      content = VideoPlayerScreen(
        videoAsset: course.videoAsset, // ✅ required
        onProgressUpdate: (p) {
          // ❌ Cannot call _saveProgress here! It's internal to CourseDetail
          // You can optionally update a course model's progress if needed
          // e.g., course.progress = p;
        },
        onBack: _onBackPressed,
      );
    } else if (_showAIChat) {
      content = AiChatScreen(onBack: _onBackPressed);
    } else if (_showCourses) {
      content = CoursesScreen(
        onCourseSelected: _onCourseSelected,
        onBack: _onBackPressed,
      );
    } else {
      content = _pages[_currentIndex];
    }

    return Scaffold(
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 250),
        child: content,
      ),
      bottomNavigationBar: BottomNav(
        currentIndex: _currentIndex,
        onTabTapped: _onTabTapped,
      ),
    );
  }
}
