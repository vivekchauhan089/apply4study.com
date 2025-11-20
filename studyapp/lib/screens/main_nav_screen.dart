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
import '../screens/notification_screen.dart';
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
  int? _selectedCourseId;
  bool _showAIChat = false;
  bool _showVideo = false;
  bool _showNotifications = false;

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
          onOpenAIChat: _openAIChat,
          onProfilePressed: () => _onTabTapped(3),
          onOpenNotifications: _openNotifications,
        ),
      ),
      const PlannerScreen(),
      DiscoverScreen(
        onCourseSelected: _onCourseSelected, // ← FIX
      ),
      const ProfileScreen(),
    ];
  }

  // ---------- Handlers ----------
  void _openCourses() {
    setState(() {
      _showCourses = true;
      _selectedCourseId = null;
      _showAIChat = false;
      _showVideo = false;
      _showNotifications = false;
    });
  }

  void _onCourseSelected(int courseId) {
    setState(() {
      _selectedCourseId = courseId;
      _showAIChat = false;
      _showVideo = false;
      _showNotifications = false;
    });
  }

  void _openAIChat() {
    setState(() {
      _showAIChat = true;
      _showVideo = false;
      _showNotifications = false;
    });
  }

  void _openNotifications() {
    setState(() {
      _showNotifications = true;
      _showAIChat = false;
      _showVideo = false;
    });
  }

  void _openCourseProgress(Course course) {
    setState(() {
      _showVideo = true;
      _showAIChat = false;
      _showNotifications = false;
    });
  }

  void _onBackPressed() {
    setState(() {
      if (_showAIChat || _showVideo || _showNotifications) {
        _showAIChat = false;
        _showVideo = false;
        _showNotifications = false;
      } else if (_selectedCourseId != null) {
        _selectedCourseId = null;
      } else if (_showCourses) {
        _showCourses = false;
      }
    });
  }

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
      _showCourses = false;
      _selectedCourseId = null;
      _showAIChat = false;
      _showVideo = false;
      _showNotifications = false;
    });
  }

  // ---------- Build ----------
  @override
  Widget build(BuildContext context) {
    Widget content;

    if (_showVideo && _selectedCourseId != null) {
      final course =
          sampleCourses.firstWhere((c) => c.id == _selectedCourseId!);
      content = VideoPlayerScreen(
        videoAsset: course.videoAsset,
        onProgressUpdate: course.updateProgress,
        onBack: _onBackPressed,
      );
    } else if (_showAIChat) {
      content = AiChatScreen(onBack: _onBackPressed);
    } else if (_selectedCourseId != null) {
      content = CourseDetail(
        courseId: _selectedCourseId!,
        onBack: _onBackPressed,
        onOpenAIChat: _openAIChat,
        onOpenCourseProgress: _openCourseProgress,
      );
    } else if (_showCourses) {
      content = CoursesScreen(
        onCourseSelected: _onCourseSelected,
        onBack: _onBackPressed,
      );
    } else if (_showNotifications) {
      content = NotificationScreen(
        onBack: _onBackPressed,
      );
    } else {
      content = _pages[_currentIndex];
    }

    return Scaffold(
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        child: content,
      ),

      // ✅ Always show bottom nav, even for AI/Video
      bottomNavigationBar: BottomNav(
        currentIndex: _currentIndex,
        onTabTapped: _onTabTapped,
      ),
    );
  }
}
