class Course {
  final int id;
  final String title;
  final String subtitle;
  final String description;
  final double progress;
  final int lessons;
  final String category;
  final String accentHex;
  final String videoAsset;

  Course({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.progress,
    required this.lessons,
    required this.category,
    required this.accentHex,
    required this.videoAsset,
  });
}