import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../screens/login_screen.dart';
import '../screens/signup_screen.dart';
import '../screens/forgot_password_screen.dart';
import '../screens/main_nav_screen.dart';
import '../screens/courses_screen.dart';
import '../screens/course_detail.dart';
import '../screens/profile_screen.dart';
import '../screens/ai_chat_screen.dart';
import '../screens/progress_screen.dart';
import '../models/course.dart';
// import '../features/dashboard/screens/dashboard_screen.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const EntryDecider());

      case '/home':
        return MaterialPageRoute(builder: (_) => const MainNavScreen());

      case '/login':
        return MaterialPageRoute(builder: (_) => const LoginScreen());

      case '/signup':
        return MaterialPageRoute(builder: (_) => const SignUpScreen());

      case '/forgotPassword':
        return MaterialPageRoute(builder: (_) => const ForgotPasswordScreen());

      case '/courses':
        return MaterialPageRoute(builder: (_) => const CoursesScreen());

      case '/courseDetail':
        final course = settings.arguments as Course;
        return MaterialPageRoute(
          builder: (_) => CourseDetail(courseId: course.id),
        );

      case '/profile':
        return MaterialPageRoute(builder: (_) => const ProfileScreen());

      case '/ai_chat':
        return MaterialPageRoute(builder: (_) => const AiChatScreen());

      case '/progress':
        return MaterialPageRoute(builder: (_) => const ProgressScreen());

      default:
        return MaterialPageRoute(
          builder: (_) => const Scaffold(
            body: Center(child: Text('404 - Page not found')),
          ),
        );
    }
  }
}

class EntryDecider extends StatefulWidget {
  const EntryDecider({super.key});

  @override
  State<EntryDecider> createState() => _EntryDeciderState();
}

class _EntryDeciderState extends State<EntryDecider> {
  bool _loading = true;
  String? _username;

  @override
  void initState() {
    super.initState();
    _checkLogin();
  }

  Future<void> _checkLogin() async {
    final prefs = await SharedPreferences.getInstance();
    final username = prefs.getString('username');
    setState(() {
      _username = username;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_username == null) {
      return const LoginScreen();
    }

    // ✅ Load MainNavScreen instead of Dashboard directly
    return const MainNavScreen();
  }
}
