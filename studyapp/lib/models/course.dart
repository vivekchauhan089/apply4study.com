class Course {
  final int id;
  final String title;
  final String description;
  final int lessons;
  double progress; // 0.0 - 1.0
  final String videoAsset; // local asset path (for demo)
  final String subtitle;
  final String category;
  final String accentHex;
  final String duration; // new field
  final String instructor; // new field

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.lessons,
    required this.progress,
    required this.videoAsset,
    required this.subtitle,
    required this.category,
    required this.accentHex,
    required this.duration,
    required this.instructor,
  });

  void updateProgress(double p) {
    progress = p.clamp(0.0, 1.0);
  }
}

final List<Course> sampleCourses = [
  Course(
    id: 1,
    title: 'Flutter for Beginners',
    description: 'Learn to build mobile apps using Flutter.',
    subtitle: 'Build Mobile App',
    lessons: 12,
    progress: 0.35,
    category: 'Writing',
    accentHex: 'B3E5FC',
    videoAsset: 'assets/videos/mov_bbb.mp4',
    duration: '3h 20m', // new
    instructor: 'John Doe', // new
  ),
  Course(
    id: 2,
    title: 'Advanced Dart',
    subtitle: 'Advanced Dart',
    description: 'Deep dive into Dart programming language.',
    lessons: 8,
    progress: 0.6,
    category: 'Writing',
    accentHex: 'B3E5FC',
    videoAsset: 'assets/videos/sample_video_placeholder.txt',
    duration: '2h 45m', // new
    instructor: 'Jane Smith', // new
  ),
];
