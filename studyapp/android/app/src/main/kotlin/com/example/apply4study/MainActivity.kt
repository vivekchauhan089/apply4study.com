package com.example.apply4study

import android.net.Uri
import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.io.File

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.ocr/channel"

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "runOcr") {
                val path = call.argument<String>("path")
                if (path == null) {
                    result.error("NO_PATH", "Image path is null", null)
                    return@setMethodCallHandler
                }
                runOcr(path, result)
            } else {
                result.notImplemented()
            }
        }
    }

    private fun runOcr(path: String, result: MethodChannel.Result) {
        try {
            val file = File(path)
            val uri = Uri.fromFile(file)
            val image = InputImage.fromFilePath(applicationContext, uri)
            val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
            recognizer.process(image)
                .addOnSuccessListener { visionText ->
                    result.success(visionText.text)
                }
                .addOnFailureListener { e ->
                    result.error("OCR_FAILED", e.localizedMessage, null)
                }
        } catch (e: Exception) {
            result.error("OCR_EXCEPTION", e.localizedMessage, null)
        }
    }
}