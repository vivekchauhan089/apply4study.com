class SupplyChainProcessModel {
  final int? id;
  final String processId;
  final String industry;
  final String processType;
  final String currentStage;
  final List<ProcessStageModel> stages;
  final Map<String, dynamic> processData;
  final DateTime createdAt;
  final DateTime? completedAt;
  final String status;

  SupplyChainProcessModel({
    this.id,
    required this.processId,
    required this.industry,
    required this.processType,
    required this.currentStage,
    this.stages = const [],
    this.processData = const {},
    required this.createdAt,
    this.completedAt,
    required this.status,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'process_id': processId,
    'industry': industry,
    'process_type': processType,
    'current_stage': currentStage,
    'stages': stages.map((s) => s.toJson()).toList(),
    'process_data': processData,
    'created_at': createdAt.toIso8601String(),
    'completed_at': completedAt?.toIso8601String(),
    'status': status,
  };

  factory SupplyChainProcessModel.fromJson(Map<String, dynamic> json) => SupplyChainProcessModel(
    id: json['id'],
    processId: json['process_id'],
    industry: json['industry'],
    processType: json['process_type'],
    currentStage: json['current_stage'],
    stages: (json['stages'] as List? ?? [])
        .map((s) => ProcessStageModel.fromJson(s))
        .toList(),
    processData: json['process_data'] ?? {},
    createdAt: DateTime.parse(json['created_at']),
    completedAt: json['completed_at'] != null ? DateTime.parse(json['completed_at']) : null,
    status: json['status'],
  );
}

class ProcessStageModel {
  final String stageId;
  final String stageName;
  final String status;
  final int? assignedUserId;
  final String? assignedUserName;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final Map<String, dynamic> stageData;
  final List<String> documents;

  ProcessStageModel({
    required this.stageId,
    required this.stageName,
    required this.status,
    this.assignedUserId,
    this.assignedUserName,
    this.startedAt,
    this.completedAt,
    this.stageData = const {},
    this.documents = const [],
  });

  Map<String, dynamic> toJson() => {
    'stage_id': stageId,
    'stage_name': stageName,
    'status': status,
    'assigned_user_id': assignedUserId,
    'assigned_user_name': assignedUserName,
    'started_at': startedAt?.toIso8601String(),
    'completed_at': completedAt?.toIso8601String(),
    'stage_data': stageData,
    'documents': documents,
  };

  factory ProcessStageModel.fromJson(Map<String, dynamic> json) => ProcessStageModel(
    stageId: json['stage_id'],
    stageName: json['stage_name'],
    status: json['status'],
    assignedUserId: json['assigned_user_id'],
    assignedUserName: json['assigned_user_name'],
    startedAt: json['started_at'] != null ? DateTime.parse(json['started_at']) : null,
    completedAt: json['completed_at'] != null ? DateTime.parse(json['completed_at']) : null,
    stageData: json['stage_data'] ?? {},
    documents: List<String>.from(json['documents'] ?? []),
  );
}