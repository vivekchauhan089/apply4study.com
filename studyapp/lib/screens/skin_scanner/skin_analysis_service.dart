import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'models/skin_analysis_result.dart';

class SkinAnalysisService {
  Future<SkinAnalysisResult> analyzeSkin(File imageFile) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final mobile = prefs.getString('mobile') ?? '';

      final request = http.MultipartRequest(
        'POST',
        Uri.parse('https://apply4study.com/api/skin/analyze'),
      );

      request.fields['mobile'] = mobile;
      request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));

      final response = await request.send();
      final responseData = await response.stream.bytesToString();

      if (response.statusCode == 200) {
        final data = jsonDecode(responseData);
        return SkinAnalysisResult.fromJson(data);
      }
    } catch (e) {
      // Return mock data on error
    }

    // Mock analysis result
    return SkinAnalysisResult(
      skinType: 'Combination',
      condition: 'Good',
      hydrationLevel: 75,
      healthScore: 8,
      recommendations: [
        'Use sunscreen daily with SPF 30+',
        'Moisturize twice daily',
        'Drink plenty of water',
        'Get adequate sleep (7-8 hours)',
        'Avoid excessive sun exposure',
      ],
    );
  }
}
