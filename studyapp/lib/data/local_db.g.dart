// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'local_db.dart';

// ignore_for_file: type=lint
class $CoursesTable extends Courses with TableInfo<$CoursesTable, Course> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $CoursesTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: false);
  static const VerificationMeta _titleMeta = const VerificationMeta('title');
  @override
  late final GeneratedColumn<String> title = GeneratedColumn<String>(
      'title', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _descriptionMeta =
      const VerificationMeta('description');
  @override
  late final GeneratedColumn<String> description = GeneratedColumn<String>(
      'description', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _lessonsMeta =
      const VerificationMeta('lessons');
  @override
  late final GeneratedColumn<int> lessons = GeneratedColumn<int>(
      'lessons', aliasedName, false,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultValue: const Constant(0));
  static const VerificationMeta _progressMeta =
      const VerificationMeta('progress');
  @override
  late final GeneratedColumn<double> progress = GeneratedColumn<double>(
      'progress', aliasedName, false,
      type: DriftSqlType.double,
      requiredDuringInsert: false,
      defaultValue: const Constant(0.0));
  static const VerificationMeta _videoAssetMeta =
      const VerificationMeta('videoAsset');
  @override
  late final GeneratedColumn<String> videoAsset = GeneratedColumn<String>(
      'video_asset', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _categoryMeta =
      const VerificationMeta('category');
  @override
  late final GeneratedColumn<String> category = GeneratedColumn<String>(
      'category', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _instructorMeta =
      const VerificationMeta('instructor');
  @override
  late final GeneratedColumn<String> instructor = GeneratedColumn<String>(
      'instructor', aliasedName, true,
      type: DriftSqlType.string, requiredDuringInsert: false);
  static const VerificationMeta _updatedAtMeta =
      const VerificationMeta('updatedAt');
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
      'updated_at', aliasedName, true,
      type: DriftSqlType.dateTime, requiredDuringInsert: false);
  @override
  List<GeneratedColumn> get $columns => [
        id,
        title,
        description,
        lessons,
        progress,
        videoAsset,
        category,
        instructor,
        updatedAt
      ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'courses';
  @override
  VerificationContext validateIntegrity(Insertable<Course> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('title')) {
      context.handle(
          _titleMeta, title.isAcceptableOrUnknown(data['title']!, _titleMeta));
    }
    if (data.containsKey('description')) {
      context.handle(
          _descriptionMeta,
          description.isAcceptableOrUnknown(
              data['description']!, _descriptionMeta));
    }
    if (data.containsKey('lessons')) {
      context.handle(_lessonsMeta,
          lessons.isAcceptableOrUnknown(data['lessons']!, _lessonsMeta));
    }
    if (data.containsKey('progress')) {
      context.handle(_progressMeta,
          progress.isAcceptableOrUnknown(data['progress']!, _progressMeta));
    }
    if (data.containsKey('video_asset')) {
      context.handle(
          _videoAssetMeta,
          videoAsset.isAcceptableOrUnknown(
              data['video_asset']!, _videoAssetMeta));
    }
    if (data.containsKey('category')) {
      context.handle(_categoryMeta,
          category.isAcceptableOrUnknown(data['category']!, _categoryMeta));
    }
    if (data.containsKey('instructor')) {
      context.handle(
          _instructorMeta,
          instructor.isAcceptableOrUnknown(
              data['instructor']!, _instructorMeta));
    }
    if (data.containsKey('updated_at')) {
      context.handle(_updatedAtMeta,
          updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Course map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Course(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      title: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}title']),
      description: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}description']),
      lessons: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}lessons'])!,
      progress: attachedDatabase.typeMapping
          .read(DriftSqlType.double, data['${effectivePrefix}progress'])!,
      videoAsset: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}video_asset']),
      category: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}category']),
      instructor: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}instructor']),
      updatedAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}updated_at']),
    );
  }

  @override
  $CoursesTable createAlias(String alias) {
    return $CoursesTable(attachedDatabase, alias);
  }
}

class Course extends DataClass implements Insertable<Course> {
  final int id;
  final String? title;
  final String? description;
  final int lessons;
  final double progress;
  final String? videoAsset;
  final String? category;
  final String? instructor;
  final DateTime? updatedAt;
  const Course(
      {required this.id,
      this.title,
      this.description,
      required this.lessons,
      required this.progress,
      this.videoAsset,
      this.category,
      this.instructor,
      this.updatedAt});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    if (!nullToAbsent || title != null) {
      map['title'] = Variable<String>(title);
    }
    if (!nullToAbsent || description != null) {
      map['description'] = Variable<String>(description);
    }
    map['lessons'] = Variable<int>(lessons);
    map['progress'] = Variable<double>(progress);
    if (!nullToAbsent || videoAsset != null) {
      map['video_asset'] = Variable<String>(videoAsset);
    }
    if (!nullToAbsent || category != null) {
      map['category'] = Variable<String>(category);
    }
    if (!nullToAbsent || instructor != null) {
      map['instructor'] = Variable<String>(instructor);
    }
    if (!nullToAbsent || updatedAt != null) {
      map['updated_at'] = Variable<DateTime>(updatedAt);
    }
    return map;
  }

  CoursesCompanion toCompanion(bool nullToAbsent) {
    return CoursesCompanion(
      id: Value(id),
      title:
          title == null && nullToAbsent ? const Value.absent() : Value(title),
      description: description == null && nullToAbsent
          ? const Value.absent()
          : Value(description),
      lessons: Value(lessons),
      progress: Value(progress),
      videoAsset: videoAsset == null && nullToAbsent
          ? const Value.absent()
          : Value(videoAsset),
      category: category == null && nullToAbsent
          ? const Value.absent()
          : Value(category),
      instructor: instructor == null && nullToAbsent
          ? const Value.absent()
          : Value(instructor),
      updatedAt: updatedAt == null && nullToAbsent
          ? const Value.absent()
          : Value(updatedAt),
    );
  }

  factory Course.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Course(
      id: serializer.fromJson<int>(json['id']),
      title: serializer.fromJson<String?>(json['title']),
      description: serializer.fromJson<String?>(json['description']),
      lessons: serializer.fromJson<int>(json['lessons']),
      progress: serializer.fromJson<double>(json['progress']),
      videoAsset: serializer.fromJson<String?>(json['videoAsset']),
      category: serializer.fromJson<String?>(json['category']),
      instructor: serializer.fromJson<String?>(json['instructor']),
      updatedAt: serializer.fromJson<DateTime?>(json['updatedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'title': serializer.toJson<String?>(title),
      'description': serializer.toJson<String?>(description),
      'lessons': serializer.toJson<int>(lessons),
      'progress': serializer.toJson<double>(progress),
      'videoAsset': serializer.toJson<String?>(videoAsset),
      'category': serializer.toJson<String?>(category),
      'instructor': serializer.toJson<String?>(instructor),
      'updatedAt': serializer.toJson<DateTime?>(updatedAt),
    };
  }

  Course copyWith(
          {int? id,
          Value<String?> title = const Value.absent(),
          Value<String?> description = const Value.absent(),
          int? lessons,
          double? progress,
          Value<String?> videoAsset = const Value.absent(),
          Value<String?> category = const Value.absent(),
          Value<String?> instructor = const Value.absent(),
          Value<DateTime?> updatedAt = const Value.absent()}) =>
      Course(
        id: id ?? this.id,
        title: title.present ? title.value : this.title,
        description: description.present ? description.value : this.description,
        lessons: lessons ?? this.lessons,
        progress: progress ?? this.progress,
        videoAsset: videoAsset.present ? videoAsset.value : this.videoAsset,
        category: category.present ? category.value : this.category,
        instructor: instructor.present ? instructor.value : this.instructor,
        updatedAt: updatedAt.present ? updatedAt.value : this.updatedAt,
      );
  Course copyWithCompanion(CoursesCompanion data) {
    return Course(
      id: data.id.present ? data.id.value : this.id,
      title: data.title.present ? data.title.value : this.title,
      description:
          data.description.present ? data.description.value : this.description,
      lessons: data.lessons.present ? data.lessons.value : this.lessons,
      progress: data.progress.present ? data.progress.value : this.progress,
      videoAsset:
          data.videoAsset.present ? data.videoAsset.value : this.videoAsset,
      category: data.category.present ? data.category.value : this.category,
      instructor:
          data.instructor.present ? data.instructor.value : this.instructor,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Course(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('description: $description, ')
          ..write('lessons: $lessons, ')
          ..write('progress: $progress, ')
          ..write('videoAsset: $videoAsset, ')
          ..write('category: $category, ')
          ..write('instructor: $instructor, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, title, description, lessons, progress,
      videoAsset, category, instructor, updatedAt);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Course &&
          other.id == this.id &&
          other.title == this.title &&
          other.description == this.description &&
          other.lessons == this.lessons &&
          other.progress == this.progress &&
          other.videoAsset == this.videoAsset &&
          other.category == this.category &&
          other.instructor == this.instructor &&
          other.updatedAt == this.updatedAt);
}

class CoursesCompanion extends UpdateCompanion<Course> {
  final Value<int> id;
  final Value<String?> title;
  final Value<String?> description;
  final Value<int> lessons;
  final Value<double> progress;
  final Value<String?> videoAsset;
  final Value<String?> category;
  final Value<String?> instructor;
  final Value<DateTime?> updatedAt;
  const CoursesCompanion({
    this.id = const Value.absent(),
    this.title = const Value.absent(),
    this.description = const Value.absent(),
    this.lessons = const Value.absent(),
    this.progress = const Value.absent(),
    this.videoAsset = const Value.absent(),
    this.category = const Value.absent(),
    this.instructor = const Value.absent(),
    this.updatedAt = const Value.absent(),
  });
  CoursesCompanion.insert({
    this.id = const Value.absent(),
    this.title = const Value.absent(),
    this.description = const Value.absent(),
    this.lessons = const Value.absent(),
    this.progress = const Value.absent(),
    this.videoAsset = const Value.absent(),
    this.category = const Value.absent(),
    this.instructor = const Value.absent(),
    this.updatedAt = const Value.absent(),
  });
  static Insertable<Course> custom({
    Expression<int>? id,
    Expression<String>? title,
    Expression<String>? description,
    Expression<int>? lessons,
    Expression<double>? progress,
    Expression<String>? videoAsset,
    Expression<String>? category,
    Expression<String>? instructor,
    Expression<DateTime>? updatedAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (title != null) 'title': title,
      if (description != null) 'description': description,
      if (lessons != null) 'lessons': lessons,
      if (progress != null) 'progress': progress,
      if (videoAsset != null) 'video_asset': videoAsset,
      if (category != null) 'category': category,
      if (instructor != null) 'instructor': instructor,
      if (updatedAt != null) 'updated_at': updatedAt,
    });
  }

  CoursesCompanion copyWith(
      {Value<int>? id,
      Value<String?>? title,
      Value<String?>? description,
      Value<int>? lessons,
      Value<double>? progress,
      Value<String?>? videoAsset,
      Value<String?>? category,
      Value<String?>? instructor,
      Value<DateTime?>? updatedAt}) {
    return CoursesCompanion(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      lessons: lessons ?? this.lessons,
      progress: progress ?? this.progress,
      videoAsset: videoAsset ?? this.videoAsset,
      category: category ?? this.category,
      instructor: instructor ?? this.instructor,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (title.present) {
      map['title'] = Variable<String>(title.value);
    }
    if (description.present) {
      map['description'] = Variable<String>(description.value);
    }
    if (lessons.present) {
      map['lessons'] = Variable<int>(lessons.value);
    }
    if (progress.present) {
      map['progress'] = Variable<double>(progress.value);
    }
    if (videoAsset.present) {
      map['video_asset'] = Variable<String>(videoAsset.value);
    }
    if (category.present) {
      map['category'] = Variable<String>(category.value);
    }
    if (instructor.present) {
      map['instructor'] = Variable<String>(instructor.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('CoursesCompanion(')
          ..write('id: $id, ')
          ..write('title: $title, ')
          ..write('description: $description, ')
          ..write('lessons: $lessons, ')
          ..write('progress: $progress, ')
          ..write('videoAsset: $videoAsset, ')
          ..write('category: $category, ')
          ..write('instructor: $instructor, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }
}

class $LessonsTable extends Lessons with TableInfo<$LessonsTable, Lesson> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LessonsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      hasAutoIncrement: true,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('PRIMARY KEY AUTOINCREMENT'));
  static const VerificationMeta _courseIdMeta =
      const VerificationMeta('courseId');
  @override
  late final GeneratedColumn<int> courseId = GeneratedColumn<int>(
      'course_id', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _titleMeta = const VerificationMeta('title');
  @override
  late final GeneratedColumn<String> title = GeneratedColumn<String>(
      'title', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _durationMeta =
      const VerificationMeta('duration');
  @override
  late final GeneratedColumn<int> duration = GeneratedColumn<int>(
      'duration', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _completedMeta =
      const VerificationMeta('completed');
  @override
  late final GeneratedColumn<bool> completed = GeneratedColumn<bool>(
      'completed', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("completed" IN (0, 1))'),
      defaultValue: const Constant(false));
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
      'synced', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("synced" IN (0, 1))'),
      defaultValue: const Constant(false));
  @override
  List<GeneratedColumn> get $columns =>
      [id, courseId, title, duration, completed, synced];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'lessons';
  @override
  VerificationContext validateIntegrity(Insertable<Lesson> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('course_id')) {
      context.handle(_courseIdMeta,
          courseId.isAcceptableOrUnknown(data['course_id']!, _courseIdMeta));
    } else if (isInserting) {
      context.missing(_courseIdMeta);
    }
    if (data.containsKey('title')) {
      context.handle(
          _titleMeta, title.isAcceptableOrUnknown(data['title']!, _titleMeta));
    } else if (isInserting) {
      context.missing(_titleMeta);
    }
    if (data.containsKey('duration')) {
      context.handle(_durationMeta,
          duration.isAcceptableOrUnknown(data['duration']!, _durationMeta));
    } else if (isInserting) {
      context.missing(_durationMeta);
    }
    if (data.containsKey('completed')) {
      context.handle(_completedMeta,
          completed.isAcceptableOrUnknown(data['completed']!, _completedMeta));
    }
    if (data.containsKey('synced')) {
      context.handle(_syncedMeta,
          synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  Lesson map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return Lesson(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      courseId: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}course_id'])!,
      title: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}title'])!,
      duration: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}duration'])!,
      completed: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}completed'])!,
      synced: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}synced'])!,
    );
  }

  @override
  $LessonsTable createAlias(String alias) {
    return $LessonsTable(attachedDatabase, alias);
  }
}

class Lesson extends DataClass implements Insertable<Lesson> {
  final int id;
  final int courseId;
  final String title;
  final int duration;
  final bool completed;
  final bool synced;
  const Lesson(
      {required this.id,
      required this.courseId,
      required this.title,
      required this.duration,
      required this.completed,
      required this.synced});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['course_id'] = Variable<int>(courseId);
    map['title'] = Variable<String>(title);
    map['duration'] = Variable<int>(duration);
    map['completed'] = Variable<bool>(completed);
    map['synced'] = Variable<bool>(synced);
    return map;
  }

  LessonsCompanion toCompanion(bool nullToAbsent) {
    return LessonsCompanion(
      id: Value(id),
      courseId: Value(courseId),
      title: Value(title),
      duration: Value(duration),
      completed: Value(completed),
      synced: Value(synced),
    );
  }

  factory Lesson.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return Lesson(
      id: serializer.fromJson<int>(json['id']),
      courseId: serializer.fromJson<int>(json['courseId']),
      title: serializer.fromJson<String>(json['title']),
      duration: serializer.fromJson<int>(json['duration']),
      completed: serializer.fromJson<bool>(json['completed']),
      synced: serializer.fromJson<bool>(json['synced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'courseId': serializer.toJson<int>(courseId),
      'title': serializer.toJson<String>(title),
      'duration': serializer.toJson<int>(duration),
      'completed': serializer.toJson<bool>(completed),
      'synced': serializer.toJson<bool>(synced),
    };
  }

  Lesson copyWith(
          {int? id,
          int? courseId,
          String? title,
          int? duration,
          bool? completed,
          bool? synced}) =>
      Lesson(
        id: id ?? this.id,
        courseId: courseId ?? this.courseId,
        title: title ?? this.title,
        duration: duration ?? this.duration,
        completed: completed ?? this.completed,
        synced: synced ?? this.synced,
      );
  Lesson copyWithCompanion(LessonsCompanion data) {
    return Lesson(
      id: data.id.present ? data.id.value : this.id,
      courseId: data.courseId.present ? data.courseId.value : this.courseId,
      title: data.title.present ? data.title.value : this.title,
      duration: data.duration.present ? data.duration.value : this.duration,
      completed: data.completed.present ? data.completed.value : this.completed,
      synced: data.synced.present ? data.synced.value : this.synced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('Lesson(')
          ..write('id: $id, ')
          ..write('courseId: $courseId, ')
          ..write('title: $title, ')
          ..write('duration: $duration, ')
          ..write('completed: $completed, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, courseId, title, duration, completed, synced);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Lesson &&
          other.id == this.id &&
          other.courseId == this.courseId &&
          other.title == this.title &&
          other.duration == this.duration &&
          other.completed == this.completed &&
          other.synced == this.synced);
}

class LessonsCompanion extends UpdateCompanion<Lesson> {
  final Value<int> id;
  final Value<int> courseId;
  final Value<String> title;
  final Value<int> duration;
  final Value<bool> completed;
  final Value<bool> synced;
  const LessonsCompanion({
    this.id = const Value.absent(),
    this.courseId = const Value.absent(),
    this.title = const Value.absent(),
    this.duration = const Value.absent(),
    this.completed = const Value.absent(),
    this.synced = const Value.absent(),
  });
  LessonsCompanion.insert({
    this.id = const Value.absent(),
    required int courseId,
    required String title,
    required int duration,
    this.completed = const Value.absent(),
    this.synced = const Value.absent(),
  })  : courseId = Value(courseId),
        title = Value(title),
        duration = Value(duration);
  static Insertable<Lesson> custom({
    Expression<int>? id,
    Expression<int>? courseId,
    Expression<String>? title,
    Expression<int>? duration,
    Expression<bool>? completed,
    Expression<bool>? synced,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (courseId != null) 'course_id': courseId,
      if (title != null) 'title': title,
      if (duration != null) 'duration': duration,
      if (completed != null) 'completed': completed,
      if (synced != null) 'synced': synced,
    });
  }

  LessonsCompanion copyWith(
      {Value<int>? id,
      Value<int>? courseId,
      Value<String>? title,
      Value<int>? duration,
      Value<bool>? completed,
      Value<bool>? synced}) {
    return LessonsCompanion(
      id: id ?? this.id,
      courseId: courseId ?? this.courseId,
      title: title ?? this.title,
      duration: duration ?? this.duration,
      completed: completed ?? this.completed,
      synced: synced ?? this.synced,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (courseId.present) {
      map['course_id'] = Variable<int>(courseId.value);
    }
    if (title.present) {
      map['title'] = Variable<String>(title.value);
    }
    if (duration.present) {
      map['duration'] = Variable<int>(duration.value);
    }
    if (completed.present) {
      map['completed'] = Variable<bool>(completed.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LessonsCompanion(')
          ..write('id: $id, ')
          ..write('courseId: $courseId, ')
          ..write('title: $title, ')
          ..write('duration: $duration, ')
          ..write('completed: $completed, ')
          ..write('synced: $synced')
          ..write(')'))
        .toString();
  }
}

class $ProgressSyncsTable extends ProgressSyncs
    with TableInfo<$ProgressSyncsTable, ProgressSync> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $ProgressSyncsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      hasAutoIncrement: true,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('PRIMARY KEY AUTOINCREMENT'));
  static const VerificationMeta _courseIdMeta =
      const VerificationMeta('courseId');
  @override
  late final GeneratedColumn<int> courseId = GeneratedColumn<int>(
      'course_id', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _progressMeta =
      const VerificationMeta('progress');
  @override
  late final GeneratedColumn<double> progress = GeneratedColumn<double>(
      'progress', aliasedName, false,
      type: DriftSqlType.double, requiredDuringInsert: true);
  static const VerificationMeta _updatedAtMeta =
      const VerificationMeta('updatedAt');
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
      'updated_at', aliasedName, false,
      type: DriftSqlType.dateTime,
      requiredDuringInsert: false,
      defaultValue: currentDateAndTime);
  static const VerificationMeta _syncedMeta = const VerificationMeta('synced');
  @override
  late final GeneratedColumn<bool> synced = GeneratedColumn<bool>(
      'synced', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("synced" IN (0, 1))'),
      defaultValue: const Constant(false));
  static const VerificationMeta _attemptsMeta =
      const VerificationMeta('attempts');
  @override
  late final GeneratedColumn<int> attempts = GeneratedColumn<int>(
      'attempts', aliasedName, false,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultValue: const Constant(0));
  @override
  List<GeneratedColumn> get $columns =>
      [id, courseId, progress, updatedAt, synced, attempts];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'progress_syncs';
  @override
  VerificationContext validateIntegrity(Insertable<ProgressSync> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('course_id')) {
      context.handle(_courseIdMeta,
          courseId.isAcceptableOrUnknown(data['course_id']!, _courseIdMeta));
    } else if (isInserting) {
      context.missing(_courseIdMeta);
    }
    if (data.containsKey('progress')) {
      context.handle(_progressMeta,
          progress.isAcceptableOrUnknown(data['progress']!, _progressMeta));
    } else if (isInserting) {
      context.missing(_progressMeta);
    }
    if (data.containsKey('updated_at')) {
      context.handle(_updatedAtMeta,
          updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta));
    }
    if (data.containsKey('synced')) {
      context.handle(_syncedMeta,
          synced.isAcceptableOrUnknown(data['synced']!, _syncedMeta));
    }
    if (data.containsKey('attempts')) {
      context.handle(_attemptsMeta,
          attempts.isAcceptableOrUnknown(data['attempts']!, _attemptsMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  ProgressSync map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return ProgressSync(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      courseId: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}course_id'])!,
      progress: attachedDatabase.typeMapping
          .read(DriftSqlType.double, data['${effectivePrefix}progress'])!,
      updatedAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}updated_at'])!,
      synced: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}synced'])!,
      attempts: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}attempts'])!,
    );
  }

  @override
  $ProgressSyncsTable createAlias(String alias) {
    return $ProgressSyncsTable(attachedDatabase, alias);
  }
}

class ProgressSync extends DataClass implements Insertable<ProgressSync> {
  final int id;
  final int courseId;
  final double progress;
  final DateTime updatedAt;
  final bool synced;
  final int attempts;
  const ProgressSync(
      {required this.id,
      required this.courseId,
      required this.progress,
      required this.updatedAt,
      required this.synced,
      required this.attempts});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['course_id'] = Variable<int>(courseId);
    map['progress'] = Variable<double>(progress);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    map['synced'] = Variable<bool>(synced);
    map['attempts'] = Variable<int>(attempts);
    return map;
  }

  ProgressSyncsCompanion toCompanion(bool nullToAbsent) {
    return ProgressSyncsCompanion(
      id: Value(id),
      courseId: Value(courseId),
      progress: Value(progress),
      updatedAt: Value(updatedAt),
      synced: Value(synced),
      attempts: Value(attempts),
    );
  }

  factory ProgressSync.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return ProgressSync(
      id: serializer.fromJson<int>(json['id']),
      courseId: serializer.fromJson<int>(json['courseId']),
      progress: serializer.fromJson<double>(json['progress']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
      synced: serializer.fromJson<bool>(json['synced']),
      attempts: serializer.fromJson<int>(json['attempts']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'courseId': serializer.toJson<int>(courseId),
      'progress': serializer.toJson<double>(progress),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
      'synced': serializer.toJson<bool>(synced),
      'attempts': serializer.toJson<int>(attempts),
    };
  }

  ProgressSync copyWith(
          {int? id,
          int? courseId,
          double? progress,
          DateTime? updatedAt,
          bool? synced,
          int? attempts}) =>
      ProgressSync(
        id: id ?? this.id,
        courseId: courseId ?? this.courseId,
        progress: progress ?? this.progress,
        updatedAt: updatedAt ?? this.updatedAt,
        synced: synced ?? this.synced,
        attempts: attempts ?? this.attempts,
      );
  ProgressSync copyWithCompanion(ProgressSyncsCompanion data) {
    return ProgressSync(
      id: data.id.present ? data.id.value : this.id,
      courseId: data.courseId.present ? data.courseId.value : this.courseId,
      progress: data.progress.present ? data.progress.value : this.progress,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
      synced: data.synced.present ? data.synced.value : this.synced,
      attempts: data.attempts.present ? data.attempts.value : this.attempts,
    );
  }

  @override
  String toString() {
    return (StringBuffer('ProgressSync(')
          ..write('id: $id, ')
          ..write('courseId: $courseId, ')
          ..write('progress: $progress, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('synced: $synced, ')
          ..write('attempts: $attempts')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, courseId, progress, updatedAt, synced, attempts);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is ProgressSync &&
          other.id == this.id &&
          other.courseId == this.courseId &&
          other.progress == this.progress &&
          other.updatedAt == this.updatedAt &&
          other.synced == this.synced &&
          other.attempts == this.attempts);
}

class ProgressSyncsCompanion extends UpdateCompanion<ProgressSync> {
  final Value<int> id;
  final Value<int> courseId;
  final Value<double> progress;
  final Value<DateTime> updatedAt;
  final Value<bool> synced;
  final Value<int> attempts;
  const ProgressSyncsCompanion({
    this.id = const Value.absent(),
    this.courseId = const Value.absent(),
    this.progress = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.synced = const Value.absent(),
    this.attempts = const Value.absent(),
  });
  ProgressSyncsCompanion.insert({
    this.id = const Value.absent(),
    required int courseId,
    required double progress,
    this.updatedAt = const Value.absent(),
    this.synced = const Value.absent(),
    this.attempts = const Value.absent(),
  })  : courseId = Value(courseId),
        progress = Value(progress);
  static Insertable<ProgressSync> custom({
    Expression<int>? id,
    Expression<int>? courseId,
    Expression<double>? progress,
    Expression<DateTime>? updatedAt,
    Expression<bool>? synced,
    Expression<int>? attempts,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (courseId != null) 'course_id': courseId,
      if (progress != null) 'progress': progress,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (synced != null) 'synced': synced,
      if (attempts != null) 'attempts': attempts,
    });
  }

  ProgressSyncsCompanion copyWith(
      {Value<int>? id,
      Value<int>? courseId,
      Value<double>? progress,
      Value<DateTime>? updatedAt,
      Value<bool>? synced,
      Value<int>? attempts}) {
    return ProgressSyncsCompanion(
      id: id ?? this.id,
      courseId: courseId ?? this.courseId,
      progress: progress ?? this.progress,
      updatedAt: updatedAt ?? this.updatedAt,
      synced: synced ?? this.synced,
      attempts: attempts ?? this.attempts,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (courseId.present) {
      map['course_id'] = Variable<int>(courseId.value);
    }
    if (progress.present) {
      map['progress'] = Variable<double>(progress.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (synced.present) {
      map['synced'] = Variable<bool>(synced.value);
    }
    if (attempts.present) {
      map['attempts'] = Variable<int>(attempts.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('ProgressSyncsCompanion(')
          ..write('id: $id, ')
          ..write('courseId: $courseId, ')
          ..write('progress: $progress, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('synced: $synced, ')
          ..write('attempts: $attempts')
          ..write(')'))
        .toString();
  }
}

abstract class _$LocalDb extends GeneratedDatabase {
  _$LocalDb(QueryExecutor e) : super(e);
  $LocalDbManager get managers => $LocalDbManager(this);
  late final $CoursesTable courses = $CoursesTable(this);
  late final $LessonsTable lessons = $LessonsTable(this);
  late final $ProgressSyncsTable progressSyncs = $ProgressSyncsTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities =>
      [courses, lessons, progressSyncs];
}

typedef $$CoursesTableCreateCompanionBuilder = CoursesCompanion Function({
  Value<int> id,
  Value<String?> title,
  Value<String?> description,
  Value<int> lessons,
  Value<double> progress,
  Value<String?> videoAsset,
  Value<String?> category,
  Value<String?> instructor,
  Value<DateTime?> updatedAt,
});
typedef $$CoursesTableUpdateCompanionBuilder = CoursesCompanion Function({
  Value<int> id,
  Value<String?> title,
  Value<String?> description,
  Value<int> lessons,
  Value<double> progress,
  Value<String?> videoAsset,
  Value<String?> category,
  Value<String?> instructor,
  Value<DateTime?> updatedAt,
});

class $$CoursesTableFilterComposer extends Composer<_$LocalDb, $CoursesTable> {
  $$CoursesTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get description => $composableBuilder(
      column: $table.description, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get lessons => $composableBuilder(
      column: $table.lessons, builder: (column) => ColumnFilters(column));

  ColumnFilters<double> get progress => $composableBuilder(
      column: $table.progress, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get videoAsset => $composableBuilder(
      column: $table.videoAsset, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get category => $composableBuilder(
      column: $table.category, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get instructor => $composableBuilder(
      column: $table.instructor, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnFilters(column));
}

class $$CoursesTableOrderingComposer
    extends Composer<_$LocalDb, $CoursesTable> {
  $$CoursesTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get description => $composableBuilder(
      column: $table.description, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get lessons => $composableBuilder(
      column: $table.lessons, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<double> get progress => $composableBuilder(
      column: $table.progress, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get videoAsset => $composableBuilder(
      column: $table.videoAsset, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get category => $composableBuilder(
      column: $table.category, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get instructor => $composableBuilder(
      column: $table.instructor, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnOrderings(column));
}

class $$CoursesTableAnnotationComposer
    extends Composer<_$LocalDb, $CoursesTable> {
  $$CoursesTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get title =>
      $composableBuilder(column: $table.title, builder: (column) => column);

  GeneratedColumn<String> get description => $composableBuilder(
      column: $table.description, builder: (column) => column);

  GeneratedColumn<int> get lessons =>
      $composableBuilder(column: $table.lessons, builder: (column) => column);

  GeneratedColumn<double> get progress =>
      $composableBuilder(column: $table.progress, builder: (column) => column);

  GeneratedColumn<String> get videoAsset => $composableBuilder(
      column: $table.videoAsset, builder: (column) => column);

  GeneratedColumn<String> get category =>
      $composableBuilder(column: $table.category, builder: (column) => column);

  GeneratedColumn<String> get instructor => $composableBuilder(
      column: $table.instructor, builder: (column) => column);

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);
}

class $$CoursesTableTableManager extends RootTableManager<
    _$LocalDb,
    $CoursesTable,
    Course,
    $$CoursesTableFilterComposer,
    $$CoursesTableOrderingComposer,
    $$CoursesTableAnnotationComposer,
    $$CoursesTableCreateCompanionBuilder,
    $$CoursesTableUpdateCompanionBuilder,
    (Course, BaseReferences<_$LocalDb, $CoursesTable, Course>),
    Course,
    PrefetchHooks Function()> {
  $$CoursesTableTableManager(_$LocalDb db, $CoursesTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$CoursesTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$CoursesTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$CoursesTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<String?> title = const Value.absent(),
            Value<String?> description = const Value.absent(),
            Value<int> lessons = const Value.absent(),
            Value<double> progress = const Value.absent(),
            Value<String?> videoAsset = const Value.absent(),
            Value<String?> category = const Value.absent(),
            Value<String?> instructor = const Value.absent(),
            Value<DateTime?> updatedAt = const Value.absent(),
          }) =>
              CoursesCompanion(
            id: id,
            title: title,
            description: description,
            lessons: lessons,
            progress: progress,
            videoAsset: videoAsset,
            category: category,
            instructor: instructor,
            updatedAt: updatedAt,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<String?> title = const Value.absent(),
            Value<String?> description = const Value.absent(),
            Value<int> lessons = const Value.absent(),
            Value<double> progress = const Value.absent(),
            Value<String?> videoAsset = const Value.absent(),
            Value<String?> category = const Value.absent(),
            Value<String?> instructor = const Value.absent(),
            Value<DateTime?> updatedAt = const Value.absent(),
          }) =>
              CoursesCompanion.insert(
            id: id,
            title: title,
            description: description,
            lessons: lessons,
            progress: progress,
            videoAsset: videoAsset,
            category: category,
            instructor: instructor,
            updatedAt: updatedAt,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$CoursesTableProcessedTableManager = ProcessedTableManager<
    _$LocalDb,
    $CoursesTable,
    Course,
    $$CoursesTableFilterComposer,
    $$CoursesTableOrderingComposer,
    $$CoursesTableAnnotationComposer,
    $$CoursesTableCreateCompanionBuilder,
    $$CoursesTableUpdateCompanionBuilder,
    (Course, BaseReferences<_$LocalDb, $CoursesTable, Course>),
    Course,
    PrefetchHooks Function()>;
typedef $$LessonsTableCreateCompanionBuilder = LessonsCompanion Function({
  Value<int> id,
  required int courseId,
  required String title,
  required int duration,
  Value<bool> completed,
  Value<bool> synced,
});
typedef $$LessonsTableUpdateCompanionBuilder = LessonsCompanion Function({
  Value<int> id,
  Value<int> courseId,
  Value<String> title,
  Value<int> duration,
  Value<bool> completed,
  Value<bool> synced,
});

class $$LessonsTableFilterComposer extends Composer<_$LocalDb, $LessonsTable> {
  $$LessonsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get courseId => $composableBuilder(
      column: $table.courseId, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get duration => $composableBuilder(
      column: $table.duration, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get completed => $composableBuilder(
      column: $table.completed, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get synced => $composableBuilder(
      column: $table.synced, builder: (column) => ColumnFilters(column));
}

class $$LessonsTableOrderingComposer
    extends Composer<_$LocalDb, $LessonsTable> {
  $$LessonsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get courseId => $composableBuilder(
      column: $table.courseId, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get title => $composableBuilder(
      column: $table.title, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get duration => $composableBuilder(
      column: $table.duration, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get completed => $composableBuilder(
      column: $table.completed, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get synced => $composableBuilder(
      column: $table.synced, builder: (column) => ColumnOrderings(column));
}

class $$LessonsTableAnnotationComposer
    extends Composer<_$LocalDb, $LessonsTable> {
  $$LessonsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<int> get courseId =>
      $composableBuilder(column: $table.courseId, builder: (column) => column);

  GeneratedColumn<String> get title =>
      $composableBuilder(column: $table.title, builder: (column) => column);

  GeneratedColumn<int> get duration =>
      $composableBuilder(column: $table.duration, builder: (column) => column);

  GeneratedColumn<bool> get completed =>
      $composableBuilder(column: $table.completed, builder: (column) => column);

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);
}

class $$LessonsTableTableManager extends RootTableManager<
    _$LocalDb,
    $LessonsTable,
    Lesson,
    $$LessonsTableFilterComposer,
    $$LessonsTableOrderingComposer,
    $$LessonsTableAnnotationComposer,
    $$LessonsTableCreateCompanionBuilder,
    $$LessonsTableUpdateCompanionBuilder,
    (Lesson, BaseReferences<_$LocalDb, $LessonsTable, Lesson>),
    Lesson,
    PrefetchHooks Function()> {
  $$LessonsTableTableManager(_$LocalDb db, $LessonsTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LessonsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LessonsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LessonsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<int> courseId = const Value.absent(),
            Value<String> title = const Value.absent(),
            Value<int> duration = const Value.absent(),
            Value<bool> completed = const Value.absent(),
            Value<bool> synced = const Value.absent(),
          }) =>
              LessonsCompanion(
            id: id,
            courseId: courseId,
            title: title,
            duration: duration,
            completed: completed,
            synced: synced,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            required int courseId,
            required String title,
            required int duration,
            Value<bool> completed = const Value.absent(),
            Value<bool> synced = const Value.absent(),
          }) =>
              LessonsCompanion.insert(
            id: id,
            courseId: courseId,
            title: title,
            duration: duration,
            completed: completed,
            synced: synced,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$LessonsTableProcessedTableManager = ProcessedTableManager<
    _$LocalDb,
    $LessonsTable,
    Lesson,
    $$LessonsTableFilterComposer,
    $$LessonsTableOrderingComposer,
    $$LessonsTableAnnotationComposer,
    $$LessonsTableCreateCompanionBuilder,
    $$LessonsTableUpdateCompanionBuilder,
    (Lesson, BaseReferences<_$LocalDb, $LessonsTable, Lesson>),
    Lesson,
    PrefetchHooks Function()>;
typedef $$ProgressSyncsTableCreateCompanionBuilder = ProgressSyncsCompanion
    Function({
  Value<int> id,
  required int courseId,
  required double progress,
  Value<DateTime> updatedAt,
  Value<bool> synced,
  Value<int> attempts,
});
typedef $$ProgressSyncsTableUpdateCompanionBuilder = ProgressSyncsCompanion
    Function({
  Value<int> id,
  Value<int> courseId,
  Value<double> progress,
  Value<DateTime> updatedAt,
  Value<bool> synced,
  Value<int> attempts,
});

class $$ProgressSyncsTableFilterComposer
    extends Composer<_$LocalDb, $ProgressSyncsTable> {
  $$ProgressSyncsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get courseId => $composableBuilder(
      column: $table.courseId, builder: (column) => ColumnFilters(column));

  ColumnFilters<double> get progress => $composableBuilder(
      column: $table.progress, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get synced => $composableBuilder(
      column: $table.synced, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get attempts => $composableBuilder(
      column: $table.attempts, builder: (column) => ColumnFilters(column));
}

class $$ProgressSyncsTableOrderingComposer
    extends Composer<_$LocalDb, $ProgressSyncsTable> {
  $$ProgressSyncsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get courseId => $composableBuilder(
      column: $table.courseId, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<double> get progress => $composableBuilder(
      column: $table.progress, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
      column: $table.updatedAt, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get synced => $composableBuilder(
      column: $table.synced, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get attempts => $composableBuilder(
      column: $table.attempts, builder: (column) => ColumnOrderings(column));
}

class $$ProgressSyncsTableAnnotationComposer
    extends Composer<_$LocalDb, $ProgressSyncsTable> {
  $$ProgressSyncsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<int> get courseId =>
      $composableBuilder(column: $table.courseId, builder: (column) => column);

  GeneratedColumn<double> get progress =>
      $composableBuilder(column: $table.progress, builder: (column) => column);

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);

  GeneratedColumn<bool> get synced =>
      $composableBuilder(column: $table.synced, builder: (column) => column);

  GeneratedColumn<int> get attempts =>
      $composableBuilder(column: $table.attempts, builder: (column) => column);
}

class $$ProgressSyncsTableTableManager extends RootTableManager<
    _$LocalDb,
    $ProgressSyncsTable,
    ProgressSync,
    $$ProgressSyncsTableFilterComposer,
    $$ProgressSyncsTableOrderingComposer,
    $$ProgressSyncsTableAnnotationComposer,
    $$ProgressSyncsTableCreateCompanionBuilder,
    $$ProgressSyncsTableUpdateCompanionBuilder,
    (
      ProgressSync,
      BaseReferences<_$LocalDb, $ProgressSyncsTable, ProgressSync>
    ),
    ProgressSync,
    PrefetchHooks Function()> {
  $$ProgressSyncsTableTableManager(_$LocalDb db, $ProgressSyncsTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$ProgressSyncsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$ProgressSyncsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$ProgressSyncsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<int> courseId = const Value.absent(),
            Value<double> progress = const Value.absent(),
            Value<DateTime> updatedAt = const Value.absent(),
            Value<bool> synced = const Value.absent(),
            Value<int> attempts = const Value.absent(),
          }) =>
              ProgressSyncsCompanion(
            id: id,
            courseId: courseId,
            progress: progress,
            updatedAt: updatedAt,
            synced: synced,
            attempts: attempts,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            required int courseId,
            required double progress,
            Value<DateTime> updatedAt = const Value.absent(),
            Value<bool> synced = const Value.absent(),
            Value<int> attempts = const Value.absent(),
          }) =>
              ProgressSyncsCompanion.insert(
            id: id,
            courseId: courseId,
            progress: progress,
            updatedAt: updatedAt,
            synced: synced,
            attempts: attempts,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (e.readTable(table), BaseReferences(db, table, e)))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$ProgressSyncsTableProcessedTableManager = ProcessedTableManager<
    _$LocalDb,
    $ProgressSyncsTable,
    ProgressSync,
    $$ProgressSyncsTableFilterComposer,
    $$ProgressSyncsTableOrderingComposer,
    $$ProgressSyncsTableAnnotationComposer,
    $$ProgressSyncsTableCreateCompanionBuilder,
    $$ProgressSyncsTableUpdateCompanionBuilder,
    (
      ProgressSync,
      BaseReferences<_$LocalDb, $ProgressSyncsTable, ProgressSync>
    ),
    ProgressSync,
    PrefetchHooks Function()>;

class $LocalDbManager {
  final _$LocalDb _db;
  $LocalDbManager(this._db);
  $$CoursesTableTableManager get courses =>
      $$CoursesTableTableManager(_db, _db.courses);
  $$LessonsTableTableManager get lessons =>
      $$LessonsTableTableManager(_db, _db.lessons);
  $$ProgressSyncsTableTableManager get progressSyncs =>
      $$ProgressSyncsTableTableManager(_db, _db.progressSyncs);
}
