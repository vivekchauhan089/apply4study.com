import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
// import '../shared/widgets/bottom_nav.dart';

class VideoPlayerScreen extends StatefulWidget {
  final String videoAsset; // required
  final void Function(double) onProgressUpdate; // required
  final VoidCallback? onBack; // ✅ add onBack callback

  const VideoPlayerScreen({super.key, required this.videoAsset, required this.onProgressUpdate, this.onBack});

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  VideoPlayerController? _controller;
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _initController();
  }

  Future<void> _initController() async {
    // Note: sample asset included is a text placeholder. Replace with real MP4 in assets and update pubspec.
    try {
      _controller = VideoPlayerController.asset(widget.videoAsset);
      await _controller!.initialize();
      setState(() { _initialized = true; });
      _controller!.addListener(_listener);
    } catch (e) {
      // Asset might not be a real video - show error UI.
      setState(() { _initialized = false; });
    }
  }

  void _listener() {
    if (!mounted) return;
    final controller = _controller;
    if (controller == null || !controller.value.isInitialized) return;
    final pos = controller.value.position.inSeconds.toDouble();
    final dur = controller.value.duration.inSeconds.toDouble();
    if (dur > 0) {
      final p = (pos / dur).clamp(0.0, 1.0);
      widget.onProgressUpdate(p);
    }
  }

  @override
  void dispose() {
    _controller?.removeListener(_listener);
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Video Player'),
          leading: widget.onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: widget.onBack,
              )
            : null
        ),
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.video_file, size: 64, color: Colors.grey),
              const SizedBox(height: 12),
              const Text(
                'No playable video found.\nReplace placeholder with a real MP4 in assets/videos',
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Video Player'),
        leading: widget.onBack != null
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: widget.onBack ?? () => Navigator.pop(context),
            )
          : null,
      ),
      body: Center(
        child: AspectRatio(
          aspectRatio: _controller!.value.aspectRatio,
          child: VideoPlayer(_controller!),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            _controller!.value.isPlaying ? _controller!.pause() : _controller!.play();
          });
        },
        child: Icon(_controller!.value.isPlaying ? Icons.pause : Icons.play_arrow),
      ),
      // bottomNavigationBar: const BottomNav(),
    );
  }
}
