import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:confetti/confetti.dart';
import '../models/course.dart';
import 'video_player_screen.dart';
import 'ai_chat_screen.dart';
import '../core/app_theme.dart';

class CourseDetail extends StatefulWidget {
  static const routeName = '/courseDetail';
  final int courseId;
  final VoidCallback? onBack; // ✅ callback to go back to dashboard
  final VoidCallback? onOpenAIChat;
  final void Function(Course)? onOpenCourseProgress;

  const CourseDetail({
    super.key,
    required this.courseId,
    this.onBack,
    this.onOpenAIChat,
    this.onOpenCourseProgress,
  });

  @override
  State<CourseDetail> createState() => _CourseDetailState();
}

class _CourseDetailState extends State<CourseDetail>
    with TickerProviderStateMixin {
  late final Course course;
  double progress = 0.0;
  late ConfettiController _confettiController;
  List<bool> lessonCompleted = [];
  List<bool> expanded = [];

  // ✅ new flags for inline navigation
  bool _showAIChat = false;
  bool _showVideo = false;

  @override
  void initState() {
    super.initState();
    _confettiController =
        ConfettiController(duration: const Duration(seconds: 2));

    course = sampleCourses.firstWhere(
      (c) => c.id == widget.courseId,
      orElse: () => sampleCourses.first,
    );

    progress = course.progress;
    lessonCompleted = List<bool>.filled(course.lessons, false);
    expanded = List<bool>.filled(course.lessons, false);

    _loadProgress();
  }

  @override
  void dispose() {
    _confettiController.dispose();
    super.dispose();
  }

  Future<void> _loadProgress() async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course.id}';
    final val = prefs.getDouble(key) ?? course.progress;
    setState(() => progress = val);
  }

  Future<void> _saveProgress(double p) async {
    final prefs = await SharedPreferences.getInstance();
    final key = 'course_progress_${course.id}';
    await prefs.setDouble(key, p);
    setState(() => progress = p);
  }

  // --- Inline navigation handlers ---
  void _openAIChat() => setState(() {
        _showAIChat = true;
        _showVideo = false;
      });

  void _openVideo() => setState(() {
        _showVideo = true;
        _showAIChat = false;
      });

  void _onBackPressed() => setState(() {
        if (_showAIChat || _showVideo) {
          _showAIChat = false;
          _showVideo = false;
        } else {
          widget.onBack?.call();
        }
      });

  // --- Lesson / AI actions ---
  void _playLesson(int index) {
    if (widget.onOpenCourseProgress != null) {
      widget.onOpenCourseProgress!(course);
    } else {
      _openVideo();
    }
  }

  void _launchAIChat() {
    if (widget.onOpenAIChat != null) {
      widget.onOpenAIChat!();
    } else {
      _openAIChat();
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget screenContent;

    if (_showAIChat) {
      screenContent = AiChatScreen(onBack: _onBackPressed);
    } else if (_showVideo) {
      screenContent = VideoPlayerScreen(
        videoAsset: course.videoAsset,
        onProgressUpdate: _saveProgress,
        onBack: _onBackPressed,
      );
    } else {
      screenContent = _buildCourseDetail(context);
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(course.title),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: _onBackPressed,
        ),
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        child: screenContent,
      ),
    );
  }

  // --- Course Detail Layout ---
  Widget _buildCourseDetail(BuildContext context) {
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
                const Icon(Icons.play_circle_outline,
                    color: Colors.white, size: 40),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Continue where you left off",
                        style: theme.textTheme.titleMedium!.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "${(progress * 100).toStringAsFixed(0)}% completed",
                        style: theme.textTheme.bodySmall!
                            .copyWith(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: AppTheme.primaryBlue,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () => _playLesson(0),
                  child: const Text("Resume"),
                ),
              ],
            ),
          ),

        if (progress > 0 && progress < 1) const SizedBox(height: 20),

        // 📘 Info
        Text(course.title,
            style: theme.textTheme.displaySmall!
                .copyWith(fontSize: 26, color: AppTheme.primaryOrange)),
        const SizedBox(height: 10),
        Text(course.description,
            style: theme.textTheme.bodyLarge!
                .copyWith(color: AppTheme.textSecondary)),
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
            valueColor:
                const AlwaysStoppedAnimation(AppTheme.primaryOrange),
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
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14)),
            ),
            icon: const Icon(Icons.play_circle_fill, color: Colors.white),
            label: const Text('Start Lesson',
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16)),
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
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14)),
            ),
            icon: const Icon(Icons.chat_bubble_outline, color: Colors.white),
            label: const Text('Ask AI Tutor',
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 16)),
            onPressed: _launchAIChat,
          ),
        ),
        const SizedBox(height: 30),

        // 📘 Lessons (Expandable Cards)
        Text("Lessons", style: theme.textTheme.titleLarge),
        const SizedBox(height: 10),
        ...List.generate(course.lessons, (index) {
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
                BoxShadow(
                    color: Colors.black12,
                    blurRadius: 8,
                    offset: const Offset(0, 4)),
              ],
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () =>
                  setState(() => expanded[index] = !expanded[index]),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 6),
                    leading: Icon(
                      completed
                          ? Icons.check_circle
                          : Icons.play_circle_fill,
                      color: completed
                          ? Colors.green
                          : AppTheme.primaryOrange,
                      size: 32,
                    ),
                    title: Text("Lesson ${index + 1}",
                        style: theme.textTheme.titleMedium!
                            .copyWith(fontWeight: FontWeight.w600)),
                    subtitle:
                        Text("Duration: ${(index + 1) * 5} mins"),
                    trailing: AnimatedRotation(
                      turns: isExpanded ? 0.5 : 0,
                      duration: const Duration(milliseconds: 250),
                      child: Icon(Icons.keyboard_arrow_down,
                          color: AppTheme.primaryBlue),
                    ),
                  ),
                  ClipRect(
                    child: AnimatedSize(
                      duration: const Duration(milliseconds: 350),
                      curve: Curves.easeInOut,
                      child: isExpanded
                          ? Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 16, vertical: 8),
                              child: Column(
                                children: [
                                  ClipRRect(
                                    borderRadius:
                                        BorderRadius.circular(12),
                                    child: Image.asset(
                                      'assets/images/lesson${(index % 3) + 1}.jpg',
                                      height: 160,
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    "This lesson introduces key examples and hands-on exercises to reinforce understanding.",
                                    style: theme.textTheme.bodyMedium!
                                        .copyWith(color: Colors.grey[700]),
                                  ),
                                  const SizedBox(height: 12),
                                  Row(
                                    children: [
                                      Expanded(
                                        child: ElevatedButton.icon(
                                          icon:
                                              const Icon(Icons.play_arrow),
                                          label:
                                              const Text("Play Lesson"),
                                          style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  AppTheme.primaryBlue,
                                              padding:
                                                  const EdgeInsets
                                                      .symmetric(
                                                      horizontal: 18,
                                                      vertical: 10),
                                              shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius
                                                          .circular(
                                                              12))),
                                          onPressed: () =>
                                              _playLesson(index),
                                        ),
                                      ),
                                      const SizedBox(width: 10),
                                      Expanded(
                                        child: ElevatedButton.icon(
                                          icon: const Icon(
                                              Icons.chat_bubble_outline),
                                          label:
                                              const Text("Ask AI Tutor"),
                                          style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  AppTheme.primaryOrange,
                                              padding:
                                                  const EdgeInsets
                                                      .symmetric(
                                                      horizontal: 18,
                                                      vertical: 10),
                                              shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius
                                                          .circular(
                                                              12))),
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

        // 📘 Course Info
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassEffect(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Course Info", style: theme.textTheme.titleLarge),
              const SizedBox(height: 10),
              _infoRow(Icons.timer, "Duration", course.duration),
              _infoRow(Icons.video_collection_outlined, "Lessons",
                  "${course.lessons}"),
              _infoRow(Icons.person_outline, "Instructor", course.instructor),
            ],
          ),
        ),
      ],
    );

    return SingleChildScrollView(
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
                      child: Icon(Icons.play_circle_fill,
                          color: Colors.white, size: 100),
                    ),
                  ),
                ),
              ],
            )
          : content,
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
              style: theme.textTheme.bodyMedium!
                  .copyWith(fontWeight: FontWeight.w600)),
          Expanded(
            child: Text(value,
                style: theme.textTheme.bodyMedium!
                    .copyWith(color: AppTheme.textSecondary),
                overflow: TextOverflow.ellipsis),
          ),
        ],
      ),
    );
  }
}
