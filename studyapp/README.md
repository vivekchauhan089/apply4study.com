# Apply4Study App

This is a lightweight Flutter learning app template for learning purposes.

Features included:
- Login (local, using SharedPreferences)
- Home & Courses screens
- Course Detail screen
- Video player (uses local asset - placeholder included; replace with actual MP4)
- Progress tracking (local, saved in SharedPreferences)
- AI Tutor Chat (mocked replies)
- Dark mode toggle (in Profile)

How to run:
1. Install Flutter and set up environment (on Windows, follow https://flutter.dev/docs/get-started/install/windows).
2. In project root:
   ```bash
   flutter pub get
   flutter run
   ```
3. Replace `assets/videos/sample_video_placeholder.txt` with your actual `sample_video.mp4` file and update pubspec if required.

Note: The included "video" is a text placeholder file. Replace with a real video file (MP4) and update the asset path if you want real playback.
