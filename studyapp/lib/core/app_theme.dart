import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // 🎨 Brand Colors (Apply4Study Visual System)
  static const Color primaryOrange = Color(0xFFE65100);
  static const Color orangeAccent = primaryOrange; // <-- added alias for previous usage
  static const Color secondaryYellow = Color(0xFFFB8C00);
  static const Color primaryBlue = Color(0xFF004AAD);
  static const Color accentBlue = Color(0xFF00BFFF);
  static const Color backgroundLight = Color(0xFFF9FAFB);
  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF475569);
  static const Color cardShadow = Color(0x1A000000);

  // 🌞 LIGHT THEME
  static ThemeData light() {
    final base = ThemeData.light(useMaterial3: true);
    return base.copyWith(
      primaryColor: primaryOrange,
      scaffoldBackgroundColor: backgroundLight,
        colorScheme: ColorScheme.fromSeed(
        seedColor: primaryOrange,
        primary: primaryOrange,
        secondary: primaryBlue,
        surface: Colors.white,
      ),

      // 🧡 AppBar (flat, text only — gradient handled in widgets)
      appBarTheme: AppBarTheme(
        backgroundColor: primaryOrange,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.inter(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.w700,
        ),
        iconTheme: const IconThemeData(color: Colors.white),
        toolbarHeight: 64,
      ),

      // 🧾 Cards (Modern, Rounded, Shadow)
      cardTheme: const CardThemeData(
        color: Colors.white,
        elevation: 6,
        shadowColor: cardShadow,
        margin: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),

      // ✏️ Inputs (Soft, tactile)
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        hintStyle: TextStyle(color: Colors.grey[500]),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
          borderSide: BorderSide(color: primaryOrange, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),

      // 🟦 Gradient CTA Buttons (styled transparent here; use blueGradientBox for background)
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
          padding: WidgetStateProperty.all(
            const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          ),
          shape: WidgetStateProperty.all(
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          ),
          foregroundColor: WidgetStateProperty.all(Colors.white),
          textStyle: WidgetStateProperty.all(
            const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
          ),
          backgroundColor: WidgetStateProperty.resolveWith<Color>(
            (_) => Colors.transparent,
          ),
          overlayColor: WidgetStateProperty.all(primaryOrange.withAlpha((0.1 * 255).round())),
          elevation: WidgetStateProperty.all(3),
          shadowColor: WidgetStateProperty.all(primaryBlue.withAlpha((0.25 * 255).round())),
        ),
      ),

      // 🔲 Outline Buttons
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryOrange,
          side: const BorderSide(color: primaryOrange, width: 1.3),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
        ),
      ),

      // 🔘 Floating Buttons
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: primaryOrange,
        foregroundColor: Colors.white,
        elevation: 5,
      ),

      // ✍️ Typography (Google Inter)
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displaySmall: const TextStyle(
          fontSize: 26,
          fontWeight: FontWeight.w800,
          color: primaryOrange,
        ),
        titleLarge: const TextStyle(
          fontWeight: FontWeight.w700,
          color: textPrimary,
          fontSize: 20,
        ),
        bodyLarge: const TextStyle(
          color: textPrimary,
          fontSize: 16,
          height: 1.5,
        ),
        bodyMedium: const TextStyle(
          color: textSecondary,
          fontSize: 14,
        ),
        labelLarge: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w600,
        ),
      ),

      // ─ Divider
      dividerTheme: const DividerThemeData(
        color: Color(0xFFE2E8F0),
        thickness: 1,
      ),
    );
  }

  // 🌙 DARK THEME
  static ThemeData dark() {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      colorScheme: const ColorScheme.dark(
        primary: primaryOrange,
        secondary: accentBlue,
      ),
      textTheme: GoogleFonts.interTextTheme(base.textTheme).copyWith(
        bodyLarge: const TextStyle(color: Colors.white70, fontSize: 16),
        bodyMedium: const TextStyle(color: Colors.white60, fontSize: 14),
      ),
      cardTheme: const CardThemeData(
        color: Color(0xFF1E293B),
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryOrange,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        ),
      ),
    );
  }

  // 🌈 Gradients
  static const LinearGradient blueGradient = LinearGradient(
    colors: [primaryBlue, accentBlue],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient orangeGradient = LinearGradient(
    colors: [primaryOrange, secondaryYellow],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // 🌟 Reusable Decorations
  static BoxDecoration blueGradientBox() => BoxDecoration(
        gradient: blueGradient,
        borderRadius: BorderRadius.circular(16),
      );

  static BoxDecoration orangeGradientBox() => BoxDecoration(
        gradient: orangeGradient,
        borderRadius: BorderRadius.circular(16),
      );

  // 🧠 Glass effect (for banners or floating cards)
  static BoxDecoration glassEffect() => BoxDecoration(
        color: Colors.white.withAlpha((0.7 * 255).round()),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha((0.05 * 255).round()),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
        border: Border.all(color: Colors.white.withAlpha((0.4 * 255).round())),
      );
}
