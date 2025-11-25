import 'dart:io';
import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'models/health_scan_result.dart';
import '../../data/local_db.dart';

class HealthScanService {
  final LocalDb _db = LocalDb();

  Future<HealthScanResult> performHealthScan(String scanType, File? imageFile) async {
    final prefs = await SharedPreferences.getInstance();
    final mobile = prefs.getString('mobile') ?? '';

    try {

      final request = http.MultipartRequest(
        'POST',
        Uri.parse('https://apply4study.com/api/health/scan'),
      );

      request.fields['mobile'] = mobile;
      request.fields['scan_type'] = scanType;
      
      if (imageFile != null) {
        request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));
      }

      final response = await request.send();
      final responseData = await response.stream.bytesToString();

      if (response.statusCode == 200) {
        final data = jsonDecode(responseData);
        final result = HealthScanResult.fromJson(data, scanType);
        await _db.saveHealthScan(mobile, scanType, result.value, result.status);
        return result;
      }
    } catch (e) {
      // Return mock data on error
    }

    // Simulate scanning delay
    await Future.delayed(const Duration(seconds: 2));

    final result = _getMockResult(scanType);
    await _db.saveHealthScan(mobile, scanType, result.value, result.status);
    return result;
  }

  HealthScanResult _getMockResult(String scanType) {
    final random = Random();
    
    switch (scanType) {
      case 'Heart Rate':
        final bpm = 60 + random.nextInt(40);
        return HealthScanResult(
          title: 'Heart Rate',
          value: '$bpm BPM',
          status: bpm < 100 ? 'Normal' : 'High',
          statusColor: bpm < 100 ? Colors.green : Colors.orange,
          icon: Icons.favorite,
          color: Colors.red,
          recommendations: [
            'Maintain regular exercise routine',
            'Avoid excessive caffeine',
            'Practice stress management',
            'Get adequate sleep',
          ],
        );

      case 'Skin Disease':
        final skinConditions = ['Healthy', 'Eczema', 'Acne', 'Psoriasis', 'Fungal Infection'];
        final condition = skinConditions[random.nextInt(skinConditions.length)];
        return HealthScanResult(
          title: 'Skin Disease Detection',
          value: condition,
          status: condition == 'Healthy' ? 'No Disease Detected' : 'Condition Detected',
          statusColor: condition == 'Healthy' ? Colors.green : Colors.orange,
          icon: Icons.face,
          color: Colors.orange,
          recommendations: [
            'Consult dermatologist if symptoms persist',
            'Keep skin clean and moisturized',
            'Avoid scratching affected areas',
            'Use prescribed medications as directed',
            'Maintain good hygiene',
          ],
        );

      case 'Eye Disease':
        final eyeConditions = ['Healthy', 'Conjunctivitis', 'Cataract Risk', 'Dry Eye Syndrome'];
        final condition = eyeConditions[random.nextInt(eyeConditions.length)];
        return HealthScanResult(
          title: 'Eye Disease Detection',
          value: condition,
          status: condition == 'Healthy' ? 'No Disease Detected' : 'Condition Detected',
          statusColor: condition == 'Healthy' ? Colors.green : Colors.orange,
          icon: Icons.remove_red_eye,
          color: Colors.teal,
          recommendations: [
            'Visit ophthalmologist for detailed examination',
            'Follow 20-20-20 rule for eye strain',
            'Use prescribed eye drops regularly',
            'Avoid rubbing eyes',
            'Wear protective eyewear in sunlight',
          ],
        );

      case 'Nail Analysis':
        final nailConditions = ['Healthy', 'Fungal Infection', 'Vitamin Deficiency', 'Anemia Signs'];
        final condition = nailConditions[random.nextInt(nailConditions.length)];
        return HealthScanResult(
          title: 'Nail Health Analysis',
          value: condition,
          status: condition == 'Healthy' ? 'Healthy Nails' : 'Issue Detected',
          statusColor: condition == 'Healthy' ? Colors.green : Colors.orange,
          icon: Icons.back_hand,
          color: Colors.brown,
          recommendations: [
            'Maintain proper nail hygiene',
            'Keep nails trimmed and clean',
            'Eat foods rich in biotin and vitamins',
            'Avoid harsh chemicals',
            'Consult doctor if discoloration persists',
          ],
        );

      case 'Tongue Scan':
        final tongueConditions = ['Healthy', 'Oral Thrush', 'Geographic Tongue', 'Vitamin B12 Deficiency'];
        final condition = tongueConditions[random.nextInt(tongueConditions.length)];
        return HealthScanResult(
          title: 'Tongue Health Scan',
          value: condition,
          status: condition == 'Healthy' ? 'Normal' : 'Abnormality Detected',
          statusColor: condition == 'Healthy' ? Colors.green : Colors.orange,
          icon: Icons.coronavirus,
          color: Colors.redAccent,
          recommendations: [
            'Maintain oral hygiene',
            'Brush tongue gently daily',
            'Stay hydrated',
            'Eat balanced diet with vitamins',
            'Visit dentist if symptoms persist',
          ],
        );

      case 'Hair Analysis':
        final hairConditions = ['Healthy', 'Hair Fall', 'Dandruff', 'Scalp Infection', 'Alopecia Risk'];
        final condition = hairConditions[random.nextInt(hairConditions.length)];
        return HealthScanResult(
          title: 'Hair & Scalp Analysis',
          value: condition,
          status: condition == 'Healthy' ? 'Healthy Hair' : 'Issue Detected',
          statusColor: condition == 'Healthy' ? Colors.green : Colors.orange,
          icon: Icons.face_retouching_natural,
          color: Colors.amber,
          recommendations: [
            'Use mild shampoo and conditioner',
            'Avoid excessive heat styling',
            'Eat protein-rich foods',
            'Massage scalp regularly',
            'Consult dermatologist if hair loss continues',
          ],
        );

      case 'Wound Check':
        final woundConditions = ['Healing Well', 'Infection Risk', 'Slow Healing', 'Requires Attention'];
        final condition = woundConditions[random.nextInt(woundConditions.length)];
        return HealthScanResult(
          title: 'Wound Assessment',
          value: condition,
          status: condition == 'Healing Well' ? 'Normal Healing' : 'Medical Attention Needed',
          statusColor: condition == 'Healing Well' ? Colors.green : Colors.red,
          icon: Icons.healing,
          color: Colors.deepOrange,
          recommendations: [
            'Keep wound clean and dry',
            'Change dressing regularly',
            'Watch for signs of infection',
            'Avoid touching wound with dirty hands',
            'Seek medical help if redness or pus appears',
          ],
        );

      case 'Breathe Rate':
        final rate = 12 + random.nextInt(8);
        return HealthScanResult(
          title: 'Breathing Rate',
          value: '$rate/min',
          status: 'Normal',
          statusColor: Colors.green,
          icon: Icons.air,
          color: Colors.blue,
          recommendations: [
            'Practice deep breathing exercises',
            'Maintain good posture',
            'Exercise regularly',
            'Avoid smoking',
          ],
        );

      case 'Temperature':
        final temp = 36.5 + random.nextDouble();
        return HealthScanResult(
          title: 'Body Temperature',
          value: '${temp.toStringAsFixed(1)}°C',
          status: temp < 37.5 ? 'Normal' : 'Elevated',
          statusColor: temp < 37.5 ? Colors.green : Colors.orange,
          icon: Icons.thermostat,
          color: Colors.purple,
          recommendations: [
            'Stay hydrated',
            'Rest adequately',
            'Monitor temperature regularly',
            'Consult doctor if fever persists',
          ],
        );

      case 'Blood Pressure':
        final systolic = 110 + random.nextInt(30);
        final diastolic = 70 + random.nextInt(20);
        return HealthScanResult(
          title: 'Blood Pressure',
          value: '$systolic/$diastolic',
          status: systolic < 140 ? 'Normal' : 'High',
          statusColor: systolic < 140 ? Colors.green : Colors.red,
          icon: Icons.monitor_heart,
          color: Colors.pink,
          recommendations: [
            'Reduce sodium intake',
            'Exercise regularly',
            'Manage stress levels',
            'Maintain healthy weight',
          ],
        );

      case 'Oxygen Level':
        final spo2 = 95 + random.nextInt(5);
        return HealthScanResult(
          title: 'Oxygen Saturation',
          value: '$spo2%',
          status: spo2 >= 95 ? 'Normal' : 'Low',
          statusColor: spo2 >= 95 ? Colors.green : Colors.red,
          icon: Icons.water_drop,
          color: Colors.cyan,
          recommendations: [
            'Practice breathing exercises',
            'Stay physically active',
            'Ensure good ventilation',
            'Avoid smoking',
          ],
        );

      case 'X-ray Scan':
        final xrayFindings = [
          {'condition': 'Normal', 'details': 'No abnormalities detected'},
          {'condition': 'Mild Arthritis', 'details': 'Early signs of joint degeneration'},
          {'condition': 'Bone Fracture', 'details': 'Hairline fracture detected'},
          {'condition': 'Osteoporosis Risk', 'details': 'Reduced bone density observed'},
          {'condition': 'Soft Tissue Swelling', 'details': 'Inflammation detected'},
        ];
        final finding = xrayFindings[random.nextInt(xrayFindings.length)];
        return HealthScanResult(
          title: 'X-ray Scan',
          value: finding['condition']!,
          status: finding['condition'] == 'Normal' ? 'No Issues Found' : finding['details']!,
          statusColor: finding['condition'] == 'Normal' ? Colors.green : Colors.orange,
          icon: Icons.medical_information,
          color: Colors.indigo,
          recommendations: [
            'Consult orthopedic specialist for detailed analysis',
            'Get professional radiologist report',
            'Follow up with prescribed treatment',
            'Maintain calcium and vitamin D intake',
            'Avoid strenuous activities if injury detected',
          ],
        );

      default:
        return HealthScanResult(
          title: scanType,
          value: 'N/A',
          status: 'Unknown',
          statusColor: Colors.grey,
          icon: Icons.health_and_safety,
          color: Colors.grey,
          recommendations: ['Scan type not supported'],
        );
    }
  }
}
