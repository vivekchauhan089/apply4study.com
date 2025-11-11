class Course {
  final int? id;
  final String title;
  final String description;
  double progress;
  bool synced;
  String? videoAsset;

  Course({
    this.id,
    required this.title,
    required this.description,
    this.progress = 0.0,
    this.synced = false,
    this.videoAsset,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'title': title,
        'description': description,
        'progress': progress,
        'synced': synced ? 1 : 0,
        'videoAsset': videoAsset,
      };

  factory Course.fromMap(Map<String, dynamic> map) => Course(
        id: map['id'],
        title: map['title'] ?? '',
        description: map['description'] ?? '',
        progress: (map['progress'] ?? 0.0).toDouble(),
        synced: (map['synced'] ?? 0) == 1,
        videoAsset: map['videoAsset'],
      );

  void updateProgress(double value) {
    progress = value;
  }
}
