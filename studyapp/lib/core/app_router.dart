import 'package:go_router/go_router.dart';
import '../features/dashboard/screens/dashboard_screen.dart';

class AppRoutes {
  static const home = '/';
  static const course = '/course';
}

class AppRouter {
  static final router = GoRouter(
    initialLocation: AppRoutes.home,
    routes: [
      GoRoute(path: AppRoutes.home, builder: (_, __) => const DashboardScreen()),
      // extend with additional feature routes
    ],
  );
}