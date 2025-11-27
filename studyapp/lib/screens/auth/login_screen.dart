import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:country_code_picker/country_code_picker.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:web/web.dart' as web;
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import '../../core/app_theme.dart';
import '../../utils/permission_manager.dart';
import '../../utils/device_helper.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _mobileCtrl = TextEditingController();
  String _countryCode = 'IN';
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

  // ------------------------- LOGIN LOGIC --------------------------
  Future<void> _login() async {
    final mobile = _mobileCtrl.text.trim();

    if (mobile.length < 10) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Please enter a valid mobile number")),
        );
      }
      return;
    }

    setState(() => _loading = true);

    try {
      String deviceId = await DeviceHelper.getDeviceId();
      deviceId = (deviceId.isNotEmpty && deviceId != "unknown") ? deviceId : (web.window.localStorage.getItem("studyapp_device_id") ?? "");


      // --- API Call (with timeout) ---
      final response = await http
          .post(
            Uri.parse("http://localhost:8083/api/sms/send"),
            body: {"mobile": mobile,"mode":"login","device_id":deviceId},
          )
          .timeout(const Duration(seconds: 15));

      final data = jsonDecode(response.body);

      if (data["success"] == true) {
        if (mounted) {
          Navigator.pushNamed(
            context,
            "/otp",
            arguments: {
              "mobile": mobile,
              "mode": "login",
            },
          );
        }
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(data["message"] ?? "Failed to send OTP"),
            ),
          );
        }
      }
    } on TimeoutException {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Server timeout. Please try again.")),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Something went wrong: $e")),
        );
      }
    }
    setState(() => _loading = false);
  }

  // -------------------- TERMS MODAL BOTTOM SHEET -------------------
  void showTermsModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(22)),
      ),
      builder: (context) {
        return DraggableScrollableSheet(
          expand: false,
          initialChildSize: 0.85,
          minChildSize: 0.45,
          maxChildSize: 0.95,
          builder: (context, controller) {
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
              child: Column(
                children: [
                  // drag handle
                  Container(
                    width: 45,
                    height: 5,
                    margin: const EdgeInsets.only(bottom: 12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade400,
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),

                  const Text(
                    "Terms & Privacy Policy",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),

                  Expanded(
                    child: ListView(
                      controller: controller,
                      children: const [
                        Text(
                          """
Your terms & policy text goes here.

You can paste large content, including:
• Terms of Service  
• Privacy Policy  
• Agreement details  
• Legal statements

This sheet is fully scrollable and draggable.
                          """,
                          style: TextStyle(fontSize: 14, height: 1.45),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 12),

                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.orange,
                      minimumSize: const Size(double.infinity, 48),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: () => Navigator.pop(context),
                    child: const Text(
                      "Close",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),

                  const SizedBox(height: 10),
                ],
              ),
            );
          },
        );
      },
    );
  }

  // ------------------------- UI BUILD ------------------------------
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
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

                // ---------------- MOBILE INPUT BOX ----------------
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white..withAlpha((0.95 * 255).round()),
                    borderRadius: BorderRadius.circular(18),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withAlpha((0.08 * 255).round()),
                        blurRadius: 15,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      const Icon(Icons.lock_reset, size: 72, color: Colors.orange),
                      const SizedBox(height: 10),

                      Text(
                        "Login to continue",
                        style: theme.textTheme.titleLarge!.copyWith(
                          color: Colors.black87,
                          fontWeight: FontWeight.bold,
                          fontSize: 26,
                        ),
                      ),

                      const SizedBox(height: 8),

                      Text(
                        "Enter your registered mobile number to login here.",
                        textAlign: TextAlign.center,
                        style: theme.textTheme.bodyMedium!.copyWith(
                          color: Colors.black54,
                        ),
                      ),

                      const SizedBox(height: 35),

                      // Country Code Picker
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

                      // ---------------- BLUE LOGIN BUTTON ----------------
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _loading ? null : _login,
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            backgroundColor: AppTheme.primaryBlue,
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
                              "Login",
                              style: TextStyle(fontSize: 16, color: Colors.white),
                            ),
                        ),
                      ),

                      const SizedBox(height: 20),

                      GestureDetector(
                        onTap: () => Navigator.pushNamed(context, '/signup'),
                        child: Text(
                          "Create an account? Sign Up",
                          style: theme.textTheme.bodyMedium!.copyWith(
                            color: AppTheme.orangeAccent,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),

                      /*Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween, 
                        children: [
                          TextButton(
                            onPressed: () {
                              Navigator.pushNamed(context, '/signup');
                            }, 
                            child: const Text("Create an account? Sign Up", style: TextStyle(fontWeight: FontWeight.bold,), ), 
                          ),
                          TextButton(
                            onPressed: () {
                              Navigator.pushNamed(context, '/forgotPassword');
                            },
                            child: const Text("Forgot Password?", style: TextStyle(fontWeight: FontWeight.bold,), ), 
                          ),
                        ],
                      ),*/

                      const SizedBox(height: 20),

                      // ---------------- Terms Link ----------------
                      RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(
                          text: "By continuing, you agree to our ",
                          style: const TextStyle(color: Colors.black87),
                          children: [
                            TextSpan(
                              text: "Terms & Privacy Policy",
                              style: const TextStyle(
                                color: Colors.blue,
                                decoration: TextDecoration.underline,
                                fontWeight: FontWeight.w600,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = showTermsModal,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
