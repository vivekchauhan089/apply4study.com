import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:country_code_picker/country_code_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../core/app_theme.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  String _dialCode = "+91";
  final TextEditingController _mobileCtrl = TextEditingController();
  bool _loading = false;

  Future<void> _sendOtp() async {
    final mobile = _mobileCtrl.text.trim();

    if (mobile.isEmpty || mobile.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Enter a valid mobile number")),
      );
      return;
    }

    setState(() => _loading = true);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("reset_mobile", "$_dialCode$mobile");

    // API CALL
    try {
      final response = await http.post(
        Uri.parse("https://apply4study.com/api/sendOtp"),
        body: {"mobile": mobile, "mode": "forgot"},
      );

      final data = jsonDecode(response.body);

      if (!mounted) return;

      if (data["status"] == 200) {
        Navigator.pushNamed(
          context,
          "/otp",
          arguments: {
            "mobile": "$_dialCode$mobile",
            "mode": "forgot",
          },
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(data["message"] ?? "OTP sending failed")),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Network error")),
      );
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
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  // White Card UI
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(28),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(18),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.15),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        )
                      ],
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.lock_reset,
                            size: 72, color: Colors.orange),
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
                            Container(
                              decoration: BoxDecoration(
                                border: Border(
                                  bottom: BorderSide(
                                      color: Colors.grey.shade400, width: 1),
                                ),
                              ),
                              child: CountryCodePicker(
                                onChanged: (code) {
                                  setState(() => _dialCode = code.dialCode ?? "+91");
                                },
                                initialSelection: 'IN',
                                favorite: const ['IN', 'US', 'GB'],
                                showCountryOnly: false,
                                padding: EdgeInsets.zero,
                                textStyle: const TextStyle(fontSize: 16),
                              ),
                            ),
                            const SizedBox(width: 10),

                            Expanded(
                              child: TextFormField(
                                controller: _mobileCtrl,
                                keyboardType: TextInputType.phone,
                                decoration: const InputDecoration(
                                  labelText: "Mobile Number",
                                  prefixIcon: Icon(Icons.phone),
                                ),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 30),

                        // BLUE BUTTON
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: _loading ? null : _sendOtp,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppTheme.primaryBlue,
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: _loading
                                ? const SizedBox(
                                    height: 22,
                                    width: 22,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2.5,
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
                          onTap: () => Navigator.pop(context),
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
      ),
    );
  }
}
