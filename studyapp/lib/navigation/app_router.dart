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
import '../screens/skin_scanner/skin_scanner_screen.dart';
import '../screens/skin_scanner/health_report_screen.dart';
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
import '../screens/whatsapp_chat/whatsapp_chat_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/auth/set_password_screen.dart';
// import '../features/dashboard/screens/dashboard_screen.dart';

class AppRouter {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const SplashScreen());

      case '/home':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: MainNavScreen()));

      case '/notifications':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: NotificationScreen())); 

      case '/login':
        return MaterialPageRoute(builder: (_) => const LoginScreen());

      case '/otp':
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(builder: (_) => OtpScreen(mobile: args?['mobile'] ?? '', mode: args?['mode'] ?? ''));

      case '/signup':
        return MaterialPageRoute(builder: (_) => const SignUpScreen());

      case '/forgotPassword':
        return MaterialPageRoute(builder: (_) => const ForgotPasswordScreen());

      case '/setPassword':
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(builder: (_) => SetPasswordScreen(mobile: args?['mobile'] ?? ''));

      case '/courses':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: CoursesScreen()));

      case '/courseDetail':
        final course = settings.arguments as Course;
        return MaterialPageRoute(
          builder: (_) => AuthGuard(child: CourseDetail(courseId: course.id)),
        );

      case '/profile':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: ProfileScreen()));

      case '/ai_chat':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: AiChatScreen()));

      case '/progress':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: ProgressScreen()));
      
      case '/ocr':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: ReceiptScanScreen()));

      case '/skin-scanner':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: SkinScannerScreen()));

      case '/health-report':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: HealthReportScreen()));

      case '/food':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: FoodHomeScreen()));

      case '/cab':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: CabBookingScreen()));

      case '/deals':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: DealsScreen()));

      case '/jobs':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: JobsScreen()));

      case '/qrscan':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: ScanPayScreen()));

      case '/reminders':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: RemindersScreen()));

      case '/track':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: FriendTrackerScreen()));

      case '/orders':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: OrdersScreen()));

      case '/compare':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: CompareScreen()));

      case '/expenses':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: ExpensesScreen()));

      case '/nearby':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: NearbyScreen()));

      case '/support':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: SupportScreen()));

      case '/whatsapp-chat':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: WhatsAppChatScreen()));

      case '/settings':
        return MaterialPageRoute(builder: (_) => const AuthGuard(child: SettingsScreen()));

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

class AuthGuard extends StatefulWidget {
  final Widget child;
  const AuthGuard({super.key, required this.child});

  @override
  State<AuthGuard> createState() => _AuthGuardState();
}

class _AuthGuardState extends State<AuthGuard> {
  bool _checking = true;
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final mobile = prefs.getString('mobile');
    if (!mounted) return;
    setState(() {
      _isAuthenticated = mobile != null && mobile.isNotEmpty;
      _checking = false;
    });
    
    if (!_isAuthenticated) {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_checking) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
    
    return _isAuthenticated ? widget.child : const SizedBox.shrink();
  }
}
