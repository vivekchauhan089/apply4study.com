class Course {
  final int id;
  final String title;
  final String description;
  final int lessons;
  final double progress; // 0.0 - 1.0
  final String videoAsset; // local asset path (for demo)
  final String subtitle;
  final String category;
  final String accentHex;

  const Course({
    required this.id,
    required this.title,
    required this.description,
    required this.lessons,
    required this.progress,
    required this.videoAsset,
    required this.subtitle,
    required this.category,
    required this.accentHex,
  });
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
  ),
];
