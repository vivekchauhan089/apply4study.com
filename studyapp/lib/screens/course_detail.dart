import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:confetti/confetti.dart';
import '../models/course.dart';
import 'video_player_screen.dart';
import 'ai_chat_screen.dart';
// import '../shared/widgets/bottom_nav.dart';
import '../core/app_theme.dart';
// import 'dart:math';

class CourseDetail extends StatefulWidget {
  static const routeName = '/courseDetail';
  final int courseId;
  final VoidCallback? onClose; // ✅ callback to close overlay
  final VoidCallback? onOpenAIChat;
  final VoidCallback? onOpenCourseProgress;

  const CourseDetail({super.key, required this.courseId, this.onClose, this.onOpenAIChat, this.onOpenCourseProgress});

  @override
  State<CourseDetail> createState() => _CourseDetailState();
}

class _CourseDetailState extends State<CourseDetail> with TickerProviderStateMixin {
  Course? course;
  double progress = 0.0;
  late ConfettiController _confettiController;
  List<bool> lessonCompleted = [];
  List<bool> expanded = [];

  @override
  void initState() {
    super.initState();
    _confettiController = ConfettiController(duration: const Duration(seconds: 2));

    course = sampleCourses.firstWhere(
      (c) => c.id == widget.courseId,
      orElse: () => sampleCourses.first,
    );

    progress = course!.progress;
    lessonCompleted = List<bool>.filled(course!.lessons, false);
    expanded = List<bool>.filled(course!.lessons, false);

    _loadProgress();
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  Future<void> _loadProgress() async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course!.id}';
    final val = prefs.getDouble(key) ?? course!.progress;
    setState(() => progress = val);
  }

  Future<void> _saveProgress(double p) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course!.id}';
    await prefs.setDouble(key, p);
    setState(() => progress = p);
  }

  void _playLesson(int index) {
    if (widget.onOpenCourseProgress != null) {
      widget.onOpenCourseProgress!(); // ✅ call the passed callback
    } else {
      Navigator.push(
        context,
        PageRouteBuilder(
          pageBuilder: (_, __, ___) => VideoPlayerScreen(
            videoAsset: course!.videoAsset,
            onProgressUpdate: (p) => _saveProgress(p),
          ),
          transitionsBuilder: (_, animation, secondaryAnimation, child) {
            const begin = Offset(0.0, 1.0); // start from bottom
            const end = Offset.zero;
            const curve = Curves.easeInOut;

            final tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
            return SlideTransition(
              position: animation.drive(tween),
              child: child,
            );
          },
        ),
      ).then((_) {
        setState(() {
          lessonCompleted[index] = true;
          final completed = lessonCompleted.where((x) => x).length;
          final newProgress = completed / course!.lessons;
          _saveProgress(newProgress);
          if (newProgress >= 1.0) _confettiController.play();
        });
      });
    }    
  }

  void _launchAIChat() {
    _confettiController.play();
    if (widget.onOpenAIChat != null) {
      widget.onOpenAIChat!(); // ✅ call the callback
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const AiChatScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (course == null) {
      return const Scaffold(body: Center(child: Text('Course not found')));
    }

    final theme = Theme.of(context);
    final isTablet = MediaQuery.of(context).size.width > 700;

    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 20),
        // 🎯 Progress Banner
        if (progress > 0 && progress < 1)
          Container(
            decoration: AppTheme.blueGradientBox(),
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const Icon(Icons.play_circle_outline, color: Colors.white, size: 40),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Continue where you left off",
                          style: theme.textTheme.titleMedium!.copyWith(
                              color: Colors.white, fontWeight: FontWeight.bold)),
                      Text("${(progress * 100).toStringAsFixed(0)}% completed",
                          style: theme.textTheme.bodySmall!.copyWith(color: Colors.white70)),
                    ],
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: AppTheme.primaryBlue,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () => _playLesson(0),
                  child: const Text("Resume"),
                ),
              ],
            ),
          ),
        if (progress > 0 && progress < 1) const SizedBox(height: 20),

        // 📘 Info
        Text(course!.title,
            style: theme.textTheme.displaySmall!
                .copyWith(fontSize: 26, color: AppTheme.primaryOrange)),
        const SizedBox(height: 10),
        Text(course!.description,
            style: theme.textTheme.bodyLarge!.copyWith(color: AppTheme.textSecondary)),
        const SizedBox(height: 24),

        // 📊 Progress Bar
        Text("Your Progress", style: theme.textTheme.titleLarge),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 10,
            backgroundColor: Colors.grey.shade300,
            valueColor: const AlwaysStoppedAnimation(AppTheme.primaryOrange),
          ),
        ),
        const SizedBox(height: 28),

        // 🎥 Start Lesson Button
        Container(
          width: double.infinity,
          decoration: AppTheme.blueGradientBox(),
          child: ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.transparent,
              shadowColor: Colors.transparent,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            ),
            icon: const Icon(Icons.play_circle_fill, color: Colors.white),
            label: const Text('Start Lesson',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
            onPressed: () => _playLesson(0),
          ),
        ),
        const SizedBox(height: 16),

        // 🤖 Ask AI Tutor Button
        Container(
          width: double.infinity,
          decoration: AppTheme.orangeGradientBox(),
          child: ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.transparent,
              shadowColor: Colors.transparent,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            ),
            icon: const Icon(Icons.chat_bubble_outline, color: Colors.white),
            label: const Text('Ask AI Tutor',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
            onPressed: _launchAIChat,
          ),
        ),
        const SizedBox(height: 30),

        // 📘 Lessons (Slide-Up Expandable Cards)
        Text("Lessons", style: theme.textTheme.titleLarge),
        const SizedBox(height: 10),
        ...List.generate(course!.lessons, (index) {
          final completed = lessonCompleted[index];
          final isExpanded = expanded[index];

          return AnimatedContainer(
            duration: const Duration(milliseconds: 350),
            curve: Curves.easeInOut,
            margin: const EdgeInsets.symmetric(vertical: 8),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 8, offset: const Offset(0, 4)),
              ],
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () => setState(() => expanded[index] = !expanded[index]),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    leading: Icon(
                      completed ? Icons.check_circle : Icons.play_circle_fill,
                      color: completed ? Colors.green : AppTheme.primaryOrange,
                      size: 32,
                    ),
                    title: Text("Lesson ${index + 1}", style: theme.textTheme.titleMedium!.copyWith(fontWeight: FontWeight.w600)),
                    subtitle: Text("Duration: ${(index + 1) * 5} mins"),
                    trailing: AnimatedRotation(
                      turns: isExpanded ? 0.5 : 0,
                      duration: const Duration(milliseconds: 250),
                      child: Icon(Icons.keyboard_arrow_down, color: AppTheme.primaryBlue),
                    ),
                  ),
                  ClipRect(
                    child: AnimatedSize(
                      duration: const Duration(milliseconds: 350),
                      curve: Curves.easeInOut,
                      child: isExpanded
                          ? Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                              child: Column(
                                children: [
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(12),
                                    child: Image.asset(
                                      'assets/images/lesson${(index % 3) + 1}.jpg',
                                      height: 160,
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    "This lesson introduces key examples and hands-on exercises to reinforce your understanding. Perfect for learners who prefer visual and interactive study.",
                                    style: theme.textTheme.bodyMedium!.copyWith(color: Colors.grey[700]),
                                  ),
                                  const SizedBox(height: 12),
                                  Row(
                                    children: [
                                      Expanded(
                                        child: ElevatedButton.icon(
                                          icon: const Icon(Icons.play_arrow),
                                          label: const Text("Play Lesson"),
                                          style: ElevatedButton.styleFrom(
                                              backgroundColor: AppTheme.primaryBlue,
                                              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                                          onPressed: () => _playLesson(index),
                                        ),
                                      ),
                                      const SizedBox(width: 10),
                                      Expanded(
                                        child: ElevatedButton.icon(
                                          icon: const Icon(Icons.chat_bubble_outline),
                                          label: const Text("Ask AI Tutor"),
                                          style: ElevatedButton.styleFrom(
                                              backgroundColor: AppTheme.primaryOrange,
                                              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
                                          onPressed: _launchAIChat,
                                        ),
                                      ),
                                    ],
                                  )
                                ],
                              ),
                            )
                          : const SizedBox.shrink(),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),

        const SizedBox(height: 30),

        // 📘 Course Info Glass Card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassEffect(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Course Info", style: theme.textTheme.titleLarge),
              const SizedBox(height: 10),
              _infoRow(Icons.timer, "Duration", course!.duration),
              _infoRow(Icons.video_collection_outlined, "Lessons", "${course!.lessons}"),
              _infoRow(Icons.person_outline, "Instructor", course!.instructor),
            ],
          ),
        ),
      ],
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(course!.title), 
        centerTitle: true,
        leading: widget.onClose != null
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: widget.onClose, // closes overlay
            )
          : null,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: isTablet
            ? Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: content),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: AppTheme.orangeGradientBox(),
                      child: const Center(
                        child: Icon(Icons.play_circle_fill, color: Colors.white, size: 100),
                      ),
                    ),
                  ),
                ],
              )
            : content,
      ),
    );
  }

  Widget _infoRow(IconData icon, String label, String value) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.primaryOrange, size: 22),
          const SizedBox(width: 10),
          Text("$label: ",
              style: theme.textTheme.bodyMedium!.copyWith(fontWeight: FontWeight.w600)),
          Expanded(
            child: Text(value,
                style: theme.textTheme.bodyMedium!.copyWith(color: AppTheme.textSecondary),
                overflow: TextOverflow.ellipsis),
          ),
        ],
      ),
    );
  }
}
