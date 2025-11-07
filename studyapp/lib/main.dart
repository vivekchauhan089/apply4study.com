import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'providers/app_provider.dart';

import 'providers/course_provider.dart';
import 'models/course.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/courses_screen.dart';

import 'screens/course_detail.dart';
import 'screens/progress_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/ai_chat_screen.dart';

import 'theme/theme_notifier.dart';
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  final darkMode = prefs.getBool('darkMode') ?? false;
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CourseProvider()),
        ChangeNotifierProvider(create: (_) => ThemeNotifier()),
        ChangeNotifierProvider(create: (_) => AppProvider(darkMode: darkMode)),
      ],
      child: const LearningApp(), // ✅ use LearningApp here
    ),  
  );
}

class LearningApp extends StatelessWidget {
  const LearningApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(builder: (context, app, _) {
      return MaterialApp(
        title: 'Learning App',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorSchemeSeed: Colors.indigo,
          brightness: Brightness.light,
        ),
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          colorSchemeSeed: Colors.indigo,
        ),
        themeMode: app.isDarkMode ? ThemeMode.dark : ThemeMode.light,
        initialRoute: '/',
        routes: {
          '/': (context) => const EntryDecider(),
          '/home': (context) => const HomeScreen(),
          '/courses': (context) => const CoursesScreen(),

          '/courseDetail': (context) {
            final args = ModalRoute.of(context)!.settings.arguments as Course;
            return CourseDetail(courseId: args.id);
          },          '/progress': (context) => const ProgressScreen(),
          '/profile': (context) => const ProfileScreen(),
          '/ai_chat': (context) => const AiChatScreen(),
        },
        onGenerateRoute: (settings) {
          if (settings.name == '/courseDetail') {
            final course= settings.arguments as Course;
            return MaterialPageRoute(
              builder: (_) => CourseDetail(courseId: course.id),
            );
          }
          return null;
        },
      );
    });
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
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    if (_username == null) {
      return const LoginScreen();
    }
    return const HomeScreen();
  }
}
