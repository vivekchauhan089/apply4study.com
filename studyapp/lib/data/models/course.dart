class Course {
  final int? id;
  final String title;
  final String description;
  final double progress;
  final bool synced;

  Course({
    this.id,
    required this.title,
    required this.description,
    this.progress = 0.0,
    this.synced = false,
  });

  Map<String, Object?> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'progress': progress,
      'synced': synced ? 1 : 0,
    };
  }

  factory Course.fromMap(Map<String, Object?> map) {
    return Course(
      id: map['id'] as int?,
      title: map['title'] as String,
      description: map['description'] as String,
      progress: map['progress'] is int
          ? (map['progress'] as int).toDouble()
          : (map['progress'] as double),
      synced: (map['synced'] as int) == 1,
    );
  }
}
