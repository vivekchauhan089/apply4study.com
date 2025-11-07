class Course {
  final int id;
  final String title;
  final String description;
  final int lessons;
  final double progress; // 0.0 - 1.0
  final String videoAsset; // local asset path (for demo)

  const Course({
    required this.id,
    required this.title,
    required this.description,
    required this.lessons,
    required this.progress,
    required this.videoAsset,
  });
}

final List<Course> sampleCourses = [
  Course(
    id: 1,
    title: 'Flutter for Beginners',
    description: 'Learn Flutter from scratch and build beautiful apps.',
    lessons: 12,
    progress: 0.35,
    videoAsset: 'assets/videos/sample_video_placeholder.txt',
  ),
  Course(
    id: 2,
    title: 'AI Fundamentals',
    description: 'Introduction to AI concepts and workflows.',
    lessons: 8,
    progress: 0.1,
    videoAsset: 'assets/videos/sample_video_placeholder.txt',
  ),
];
