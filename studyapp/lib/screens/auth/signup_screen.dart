import 'package:flutter/material.dart';
import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:google_fonts/google_fonts.dart';

import '../../core/app_theme.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final TextEditingController _nameCtrl = TextEditingController();
  final TextEditingController _emailCtrl = TextEditingController();
  final TextEditingController _mobileCtrl = TextEditingController();
  String? _selectedUserType = "Student";

  String _dialCode = "+91";
  bool _loading = false;

  Future<void> _createAccount() async {
    final name = _nameCtrl.text.trim();
    final email = _emailCtrl.text.trim();
    final mobile = _mobileCtrl.text.trim();
    final userType = _selectedUserType;
  
    if (name.isEmpty || email.isEmpty || mobile.length < 10 || userType == "") {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Please fill all fields correctly")),
        );
      }
      return;
    }

    setState(() => _loading = true);

    try {
      final response = await http.post(
        Uri.parse("https://apply4study.com/api/signup"),
        body: {
          "name": name,
          "email": email,
          "mobile": mobile,
          "dial_code": _dialCode,
          "user_type": userType,
        },
      );

      final data = jsonDecode(response.body);

      if (!mounted) return;

      if (data["status"] == 200) {
        Navigator.pushNamed(
          context,
          "/login",
          arguments: {
            "mobile": "$_dialCode$mobile"
          },
        );
      } else {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(data["message"] ?? "Signup failed")),
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

                // WHITE CARD
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
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Icon(Icons.person_add_alt_1, size: 75, color: Colors.orange),
                      const SizedBox(height: 10),

                      Text(
                        "Create Account",
                        style: theme.textTheme.titleLarge!.copyWith(
                          color: Colors.black87,
                          fontWeight: FontWeight.bold,
                          fontSize: 28,
                        ),
                      ),

                      const SizedBox(height: 25),

                      // NAME
                      TextFormField(
                        controller: _nameCtrl,
                        decoration: const InputDecoration(
                          labelText: "Full Name",
                          prefixIcon: Icon(Icons.person),
                        ),
                      ),

                      const SizedBox(height: 18),

                      // EMAIL
                      TextFormField(
                        controller: _emailCtrl,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: "Email Address",
                          prefixIcon: Icon(Icons.email),
                        ),
                      ),

                      const SizedBox(height: 18),

                      // MOBILE + COUNTRY CODE
                      Row(
                        children: [
                          Expanded(
                            flex: 1,
                            child: SizedBox(
                              height: 60, // match TextFormField height
                              child: Center(
                                child: Padding(
                                  padding: const EdgeInsets.only(bottom: 20), // fine-tune vertical alignment
                                  child: CountryCodePicker(
                                    onChanged: (country) {
                                      setState(() {
                                        _dialCode = country.dialCode!;
                                      });
                                    },
                                    initialSelection: 'IN',
                                    favorite: ['+91', 'IN'],
                                    hideMainText: true,
                                    showCountryOnly: true,
                                    showOnlyCountryWhenClosed: true,
                                  ),
                                ),
                              ),
                            ),
                          ),

                          Expanded(
                            flex: 3,
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

                      // User Type Dropdown
                      DropdownButtonFormField<String>(
                        decoration: const InputDecoration(
                          labelText: "Type",
                          prefixIcon: Icon(Icons.person),
                        ),
                        items: const [
                          DropdownMenuItem(
                            value: "Student",
                            child: Text("Student"),
                          ),
                          DropdownMenuItem(
                            value: "Teacher",
                            child: Text("Teacher"),
                          ),
                          DropdownMenuItem(
                            value: "Parent",
                            child: Text("Parent"),
                          ),
                        ],
                        validator: (value) => value == null ? "Please select type" : null,
                        onChanged: (value) {
                          _selectedUserType = value;
                        },
                        initialValue: _selectedUserType, // optional if you want initial value
                      ),

                      const SizedBox(height: 18),

                      // SIGNUP BUTTON
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _loading ? null : _createAccount,
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
                                  "Sign Up",
                                  style: TextStyle(
                                      fontSize: 16, color: Colors.white),
                                ),
                        ),
                      ),

                      const SizedBox(height: 20),

                      GestureDetector(
                        onTap: () => Navigator.pushNamed(context, '/login'),
                        child: Text(
                          "Already have an account? Login",
                          style: theme.textTheme.bodyMedium!.copyWith(
                            color: AppTheme.orangeAccent,
                            fontWeight: FontWeight.bold,
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
