import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../core/app_theme.dart';

class SetPasswordScreen extends StatefulWidget {
  const SetPasswordScreen({super.key});

  @override
  State<SetPasswordScreen> createState() => _SetPasswordScreenState();
}

class _SetPasswordScreenState extends State<SetPasswordScreen> {
  final _passCtrl = TextEditingController();
  final _confirmCtrl = TextEditingController();

  bool _loading = false;
  String mobile = "";

  // 👁 Visibility toggle
  bool _passVisible = false;
  bool _confirmVisible = false;

  // 🔥 Password Strength
  String _strengthLabel = "";
  Color _strengthColor = Colors.grey;
  double _strengthValue = 0;

  void _checkPasswordStrength(String pass) {
    if (pass.isEmpty) {
      setState(() {
        _strengthLabel = "";
        _strengthColor = Colors.grey;
        _strengthValue = 0;
      });
      return;
    }

    int score = 0;
    if (pass.length >= 6) score++;
    if (pass.contains(RegExp(r"[A-Z]"))) score++;
    if (pass.contains(RegExp(r"[0-9]"))) score++;
    if (pass.contains(RegExp(r"[!@#\$&*~]"))) score++;

    if (score <= 1) {
      setState(() {
        _strengthLabel = "Weak";
        _strengthColor = Colors.red;
        _strengthValue = 0.33;
      });
    } else if (score == 2 || score == 3) {
      setState(() {
        _strengthLabel = "Medium";
        _strengthColor = Colors.orange;
        _strengthValue = 0.66;
      });
    } else {
      setState(() {
        _strengthLabel = "Strong";
        _strengthColor = Colors.green;
        _strengthValue = 1.0;
      });
    }
  }

  Future<void> _updatePassword() async {
    final pass = _passCtrl.text.trim();
    final confirm = _confirmCtrl.text.trim();

    if (pass.isEmpty || confirm.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text("All fields are required")));
      return;
    }
    if (pass.length < 6) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text("Password must be 6+ characters")));
      return;
    }
    if (pass != confirm) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text("Passwords do not match")));
      return;
    }

    setState(() => _loading = true);

    final res = await http.post(
      Uri.parse("https://apply4study.com/api/updatePassword"),
      body: {"mobile": mobile, "password": pass},
    );

    final data = jsonDecode(res.body);
    if (!mounted) return;

    if (data["status"] == 200) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text("Password updated successfully!")));

      Navigator.pushNamedAndRemoveUntil(context, "/login", (_) => false);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(data["message"] ?? "Update failed")),
      );
    }

    setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)?.settings.arguments;
    if (args is String) mobile = args;

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
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
            child: Column(
              children: [
                const Icon(Icons.lock, size: 90, color: Colors.white),
                const SizedBox(height: 14),

                const Text(
                  "Set New Password",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.w800,
                  ),
                ),

                const SizedBox(height: 6),

                Text(
                  "Create a strong and secure password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: 15,
                  ),
                ),

                const SizedBox(height: 40),

                // 🔳 FORM CARD
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: AppTheme.glassEffect().copyWith(
                    borderRadius: BorderRadius.circular(16),
                    color: Colors.white.withOpacity(0.95),
                  ),
                  child: Column(
                    children: [
                      // PASSWORD FIELD + VISIBILITY TOGGLE
                      TextField(
                        controller: _passCtrl,
                        obscureText: !_passVisible,
                        onChanged: _checkPasswordStrength,
                        decoration: InputDecoration(
                          labelText: "New Password",
                          prefixIcon: const Icon(Icons.lock_outline),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _passVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                            ),
                            onPressed: () =>
                                setState(() => _passVisible = !_passVisible),
                          ),
                        ),
                      ),

                      // Strength Meter
                      if (_strengthLabel.isNotEmpty) ...[
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text("Strength: $_strengthLabel",
                                style: TextStyle(
                                  color: _strengthColor,
                                  fontWeight: FontWeight.bold,
                                )),
                          ],
                        ),
                        const SizedBox(height: 6),
                        LinearProgressIndicator(
                          value: _strengthValue,
                          minHeight: 6,
                          color: _strengthColor,
                          backgroundColor: Colors.grey.shade300,
                        ),
                      ],

                      const SizedBox(height: 25),

                      // CONFIRM PASSWORD FIELD
                      TextField(
                        controller: _confirmCtrl,
                        obscureText: !_confirmVisible,
                        decoration: InputDecoration(
                          labelText: "Confirm Password",
                          prefixIcon: const Icon(Icons.verified_user_outlined),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _confirmVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                            ),
                            onPressed: () => setState(
                                () => _confirmVisible = !_confirmVisible),
                          ),
                        ),
                      ),

                      const SizedBox(height: 32),

                      // BUTTON
                      SizedBox(
                        width: double.infinity,
                        child: GestureDetector(
                          onTap: _loading ? null : _updatePassword,
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            decoration: AppTheme.blueGradientBox().copyWith(
                              borderRadius: BorderRadius.circular(14),
                            ),
                            alignment: Alignment.center,
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
                              "Submit",
                              style: TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
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
