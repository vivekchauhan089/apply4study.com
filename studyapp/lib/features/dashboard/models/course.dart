class Course {
  final String id;
  final String title;
  final String subtitle;
  final double progress;
  final int lessons;
  final String category;
  final String accentHex;

  Course({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.progress,
    required this.lessons,
    required this.category,
    required this.accentHex,
  });
}