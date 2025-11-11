class Lesson {
  final int? id;
  final int courseId;
  final String title;
  final int duration; // in minutes
  bool completed;
  bool synced;

  Lesson({
    this.id,
    required this.courseId,
    required this.title,
    required this.duration,
    this.completed = false,
    this.synced = false,
  });

  Map<String, dynamic> toMap() => {
        'id': id,
        'courseId': courseId,
        'title': title,
        'duration': duration,
        'completed': completed ? 1 : 0,
        'synced': synced ? 1 : 0,
      };

  factory Lesson.fromMap(Map<String, dynamic> map) => Lesson(
        id: map['id'],
        courseId: map['courseId'],
        title: map['title'] ?? '',
        duration: map['duration'] ?? 0,
        completed: (map['completed'] ?? 0) == 1,
        synced: (map['synced'] ?? 0) == 1,
      );
}
