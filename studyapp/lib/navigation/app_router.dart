import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/otp_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/auth/forgot_password_screen.dart';
import '../screens/auth/logout_screen.dart';
import '../screens/navigation/main_nav_screen.dart';
import '../screens/courses/courses_screen.dart';
import '../screens/courses/course_detail.dart';
import '../screens/profile/profile_screen.dart';
import '../screens/chat/ai_chat_screen.dart';
import '../screens/courses/progress_screen.dart';
import '../models/course.dart';
import '../screens/notifications/notification_screen.dart';
import '../screens/ocr/receipt_scan_screen.dart';
import '../screens/food/food_home_screen.dart';
import '../screens/cab/cab_booking_screen.dart';
import '../screens/ecommerce/deals_screen.dart';
import '../screens/jobs/jobs_screen.dart';
import '../screens/payments/scan_pay_screen.dart';
import '../screens/payments/reminders_screen.dart';
import '../screens/iot/friend_tracker_screen.dart';
import '../screens/orders/orders_screen.dart';
import '../screens/compare/compare_screen.dart';
import '../screens/expenses/expenses_screen.dart';
import '../screens/nearby/nearby_screen.dart';
import '../screens/support/support_screen.dart';
import '../screens/settings/settings_screen.dart';
// import '../features/dashboard/screens/dashboard_screen.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const SplashScreen());

      case '/home':
        return MaterialPageRoute(builder: (_) => const MainNavScreen());

      case '/notifications':
        return MaterialPageRoute(builder: (_) => const NotificationScreen()); 

      case '/login':
        return MaterialPageRoute(builder: (_) => const LoginScreen());

      case '/otp':
        return MaterialPageRoute(builder: (_) => const OtpScreen());

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
      
      case '/ocr':
        return MaterialPageRoute(builder: (_) => const ReceiptScanScreen());

      case '/food':
        return MaterialPageRoute(builder: (_) => const FoodHomeScreen());

      case '/cab':
        return MaterialPageRoute(builder: (_) => const CabBookingScreen());

      case '/deals':
        return MaterialPageRoute(builder: (_) => const DealsScreen());

      case '/jobs':
        return MaterialPageRoute(builder: (_) => const JobsScreen());

      case '/qrscan':
        return MaterialPageRoute(builder: (_) => const ScanPayScreen());

      case '/reminders':
        return MaterialPageRoute(builder: (_) => const RemindersScreen());

      case '/track':
        return MaterialPageRoute(builder: (_) => const FriendTrackerScreen());

      case '/orders':
        return MaterialPageRoute(builder: (_) => const OrdersScreen());

      case '/compare':
        return MaterialPageRoute(builder: (_) => const CompareScreen());

      case '/expenses':
        return MaterialPageRoute(builder: (_) => const ExpensesScreen());

      case '/nearby':
        return MaterialPageRoute(builder: (_) => const NearbyScreen());

      case '/support':
        return MaterialPageRoute(builder: (_) => const SupportScreen());

      case '/settings':
        return MaterialPageRoute(builder: (_) => const SettingsScreen());

      case '/logout':
        return MaterialPageRoute(builder: (_) => const LogoutScreen());

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
    final username = prefs.getString('mobile');
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
