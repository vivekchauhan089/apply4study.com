class Lesson {
  final int? id;
  final int courseId;
  final String title;
  final int duration;
  final bool completed;
  final bool synced;

  Lesson({
    this.id,
    required this.courseId,
    required this.title,
    required this.duration,
    this.completed = false,
    this.synced = false,
  });

  Map<String, Object?> toMap() => {
        'id': id,
        'courseId': courseId,
        'title': title,
        'duration': duration,
        'completed': completed ? 1 : 0,
        'synced': synced ? 1 : 0,
      };

  factory Lesson.fromMap(Map<String, Object?> map) => Lesson(
        id: map['id'] as int?,
        courseId: map['courseId'] as int,
        title: map['title'] as String,
        duration: map['duration'] as int,
        completed: (map['completed'] as int) == 1,
        synced: (map['synced'] as int) == 1,
      );
}
