import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../core/app_theme.dart';

class OtpScreen extends StatefulWidget {
  const OtpScreen({super.key});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers =
      List.generate(6, (_) => TextEditingController());

  bool _loading = false;
  String mobileNumber = "";
  String mode = "login";

  int _seconds = 30;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  @override
  void dispose() {
    for (var c in _controllers) {
      c.dispose();
    }
    _timer?.cancel();
    super.dispose();
  }

  // ---------------- TIMER ----------------
  void startTimer() {
    _seconds = 30;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_seconds == 0) timer.cancel();
      setState(() => _seconds--);
    });
  }

  Future<void> resendOtp() async {
    if (_seconds > 0) return;

    startTimer();

    await http.post(
      Uri.parse("https://apply4study.com/api/sendOtp"),
      body: {"mobile": mobileNumber},
    );

    if (!mounted) return;
    ScaffoldMessenger.of(context)
        .showSnackBar(const SnackBar(content: Text("OTP resent!")));
  }

  // ---------------- VERIFY OTP ----------------
  Future<void> verifyOtp() async {
    final otp = _controllers.map((c) => c.text.trim()).join("");

    if (otp.length != 6) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Enter valid 6-digit OTP")),
      );
      return;
    }

    setState(() => _loading = true);

    final response = await http.post(
      Uri.parse("https://apply4study.com/api/verifyOtp"),
      body: {"mobile": mobileNumber, "otp": otp},
    );

    final data = jsonDecode(response.body);

    if (data["status"] == 200) {
      final prefs = await SharedPreferences.getInstance();

      if (mode == "forgot") {
        if (!mounted) return;
        Navigator.pushReplacementNamed(
          context,
          "/set-password",
          arguments: {"mobile": mobileNumber},
        );
      } else {
        await prefs.setBool("loggedIn", true);
        if (!mounted) return;
        Navigator.pushReplacementNamed(context, "/home");
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(data["message"] ?? "Invalid OTP")),
      );
    }

    setState(() => _loading = false);
  }

  // ---------------- UI ----------------
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)?.settings.arguments;

    if (args is Map) {
      mobileNumber = args["mobile"] ?? "";
      mode = args["resetMode"] == true ? "forgot" : "login";
    }

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
                  // WHITE CARD
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(26),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.15),
                          blurRadius: 20,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),

                    child: Column(
                      children: [
                        const Icon(Icons.verified_user,
                            size: 75, color: Colors.orange),

                        const SizedBox(height: 12),

                        Text(
                          "Verify OTP",
                          style: GoogleFonts.inter(
                            fontSize: 28,
                            fontWeight: FontWeight.w800,
                            color: Colors.black87,
                          ),
                        ),

                        const SizedBox(height: 6),

                        Text(
                          "We sent a 6-digit code to",
                          style: TextStyle(
                            color: Colors.grey.shade700,
                            fontSize: 15,
                          ),
                        ),

                        Text(
                          mobileNumber,
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 17,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 30),

                        // OTP BOXES
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: List.generate(6, (i) {
                            return SizedBox(
                              width: 48,
                              child: TextField(
                                controller: _controllers[i],
                                keyboardType: TextInputType.number,
                                maxLength: 1,
                                textAlign: TextAlign.center,
                                style: const TextStyle(fontSize: 22),
                                decoration: InputDecoration(
                                  counterText: "",
                                  filled: true,
                                  fillColor: Colors.grey.shade200,
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                                onChanged: (value) {
                                  if (value.isNotEmpty && i < 5) {
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                              ),
                            );
                          }),
                        ),

                        const SizedBox(height: 30),

                        // BLUE VERIFY BTN
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: _loading ? null : verifyOtp,
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              backgroundColor: AppTheme.primaryBlue,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(14),
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
                                    "Verify OTP",
                                    style: TextStyle(
                                        fontSize: 17, color: Colors.white),
                                  ),
                          ),
                        ),

                        const SizedBox(height: 20),

                        // RESEND
                        TextButton(
                          onPressed: resendOtp,
                          child: Text(
                            _seconds > 0
                                ? "Resend OTP in $_seconds sec"
                                : "Resend OTP",
                            style: const TextStyle(
                              fontSize: 15,
                              color: Colors.orange,
                              fontWeight: FontWeight.w600,
                              decoration: TextDecoration.underline,
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
