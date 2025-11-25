class SkinAnalysisResult {
  final String skinType;
  final String condition;
  final int hydrationLevel;
  final int healthScore;
  final List<String> recommendations;

  SkinAnalysisResult({
    required this.skinType,
    required this.condition,
    required this.hydrationLevel,
    required this.healthScore,
    required this.recommendations,
  });

  factory SkinAnalysisResult.fromJson(Map<String, dynamic> json) {
    return SkinAnalysisResult(
      skinType: json['skin_type'] ?? 'Unknown',
      condition: json['condition'] ?? 'Normal',
      hydrationLevel: json['hydration_level'] ?? 50,
      healthScore: json['health_score'] ?? 7,
      recommendations: List<String>.from(json['recommendations'] ?? []),
    );
  }
}
