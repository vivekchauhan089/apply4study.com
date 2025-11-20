class NotificationModel {
  final String id;
  final String title;
  final String message;
  final DateTime timestamp;
  bool isRead;
  String? image;

  NotificationModel({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    this.isRead = false,
    this.image,
  });

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "message": message,
        "timestamp": timestamp.toIso8601String(),
        "isRead": isRead,
        "image": image,
      };

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json["id"],
      title: json["title"],
      message: json["message"],
      timestamp: DateTime.parse(json["timestamp"]),
      isRead: json["isRead"],
      image: json["image"],
    );
  }
}
