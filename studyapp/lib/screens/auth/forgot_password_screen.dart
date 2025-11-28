import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:country_code_picker/country_code_picker.dart';
import 'package:http/http.dart' as http;
import 'package:universal_html/html.dart' as html;
import 'dart:convert';
import 'package:google_fonts/google_fonts.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import '../../core/app_theme.dart';
import '../../utils/permission_manager.dart';
import '../../utils/device_helper.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  String _countryCode = 'IN';
  final TextEditingController _mobileCtrl = TextEditingController();
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _detectCountryFromLocation();
  }

  Future<void> _detectCountryFromLocation() async {
    try {
      final hasPermission = await PermissionManager.isLocationEnabled();
      if (!hasPermission) {
        await PermissionManager.requestLocationPermission();
      }

      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.low,
          timeLimit: Duration(seconds: 5),
        ),
      );

      final placemarks = await placemarkFromCoordinates(
        position.latitude,
        position.longitude,
      );

      if (placemarks.isNotEmpty && placemarks.first.isoCountryCode != null) {
        final countryCode = placemarks.first.isoCountryCode!;
        if (mounted) {
          setState(() {
            _countryCode = countryCode;
          });
        }
      }
    } catch (e) {
      // Keep default IN if location fails
    }
  }

  Future<void> _sendOtp() async {
    final mobile = _mobileCtrl.text.trim();

    if (mobile.isEmpty || mobile.length < 10) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Enter a valid mobile number")),
        );
      }
      return;
    }

    setState(() => _loading = true);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("reset_mobile", mobile);

    // API CALL
    try {
      String deviceId = await DeviceHelper.getDeviceId();
      deviceId = (deviceId.isNotEmpty && deviceId != "unknown") ? deviceId : (html.window.localStorage["studyapp_device_id"] ?? "");

      final response = await http.post(
        Uri.parse("https://apply4study.com/api/sms/send"),
        body: {"mobile": mobile, "mode": "forgot", "device_id": deviceId},
      );

      final data = jsonDecode(response.body);

      if (!mounted) return;

      if (data["success"] == true) {
        if (mounted) {
          Navigator.pushNamed(
            context,
            "/otp",
            arguments: {
              "mobile": mobile,
              "mode": "forgot",
            },
          );
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(data["message"] ?? "OTP sending failed")),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Network error")),
        );
      }
    }

    setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,

        // 🔶 Full-screen orange gradient
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.orange.shade600, Colors.orange.shade900],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: SafeArea(
          child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 40),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // App icon + title
                  const Icon(Icons.school_rounded, size: 80, color: Colors.white),
                  const SizedBox(height: 12),
                  Text(
                    "Apply4Study",
                    style: GoogleFonts.inter(
                      fontSize: 34,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 6),
                  /*Text(
                    "Login to continue",
                    style: GoogleFonts.inter(
                      color: Colors.white.withOpacity(0.95),
                      fontSize: 15,
                    ),
                  ),*/

                  const SizedBox(height: 20),

                  // White Card UI
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha((0.15 * 255).round()),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.lock_reset, size: 72, color: Colors.orange),
                        const SizedBox(height: 10),

                        Text(
                          "Forgot Password?",
                          style: theme.textTheme.titleLarge!.copyWith(
                            color: Colors.black87,
                            fontWeight: FontWeight.bold,
                            fontSize: 26,
                          ),
                        ),

                        const SizedBox(height: 8),

                        Text(
                          "Enter your registered mobile number to receive an OTP.",
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodyMedium!.copyWith(
                            color: Colors.black54,
                          ),
                        ),

                        const SizedBox(height: 35),

                        // Country Code + Mobile
                        Row(
                          children: [
                            SizedBox(
                              width: 100,
                              height: 80,
                              child: Padding(
                                padding: const EdgeInsets.only(bottom: 20),
                                child: CountryCodePicker(
                                  onChanged: (country) {
                                    setState(() {
                                      _countryCode = country.code!;
                                    });
                                  },
                                  initialSelection: _countryCode,
                                  favorite: ['+91', 'IN'],
                                  showFlag: true,
                                  showDropDownButton: true,
                                  padding: EdgeInsets.zero,
                                  showCountryOnly: true,
                                  showOnlyCountryWhenClosed: true,
                                  hideMainText: true,
                                  flagDecoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                ),
                              ),
                            ),

                            const SizedBox(width: 8),

                            Expanded(
                              child: TextFormField(
                                controller: _mobileCtrl,
                                keyboardType: TextInputType.phone,
                                maxLength: 10,
                                inputFormatters: [
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                                decoration: const InputDecoration(
                                  labelText: "Mobile Number",
                                  prefixIcon: Icon(Icons.phone),
                                ),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 18),

                        // BLUE BUTTON
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: _loading ? null : _sendOtp,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.primaryBlue,
                              padding: const EdgeInsets.symmetric(vertical: 20),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: _loading
                            ? const SizedBox(
                                height: 22,
                                width: 22,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : const Text(
                              "Send OTP",
                              style: TextStyle(
                                  fontSize: 16, color: Colors.white),
                            ),
                          ),
                        ),

                        const SizedBox(height: 18),

                        GestureDetector(
                          onTap: () => Navigator.pushNamed(context, '/login'),
                          child: Text(
                            "Back to Login",
                            style: theme.textTheme.bodyMedium!.copyWith(
                              color: AppTheme.orangeAccent,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          
        ),
      ),
    );
  }
}
