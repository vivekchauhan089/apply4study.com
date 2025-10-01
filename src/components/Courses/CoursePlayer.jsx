import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function CoursePlayer({
  userId,
  courseId,
  lessons = [],
  startLessonId,
  isOpen,
  onClose
}) {
  const videoRef = useRef(null);
  const initialIndex = lessons.findIndex(l => l.id === startLessonId);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [progressMap, setProgressMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);
  const autosaveDelay = 900;

  const [currentLesson, setCurrentLesson] = useState(
    lessons[currentLessonIndex] ? lessons[currentLessonIndex] : null
  );

  const lsKey = `course_progress_${courseId}_${userId}`;

  // Load progress
  useEffect(() => {
    let mounted = true;
    async function fetchProgress() {
      try {
        const res = await fetch(`http://localhost:8083/api/course/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({ userId: userId, courseId: courseId })
        });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        if (!mounted) return;
        if (json && json.success && Array.isArray(json.data)) {
          const map = {};
          json.data.forEach((r) => {
            map[r.lessonId] = {
              progress: typeof r.progress === "number" ? r.progress : 0,
              completed: !!r.completed,
              lastUpdated: r.lastUpdated || null,
            };
          });
          setProgressMap(map);
          try { localStorage.setItem(lsKey, JSON.stringify(map)); } catch (e) {}
        } else {
          const raw = localStorage.getItem(lsKey);
          if (raw) setProgressMap(JSON.parse(raw));
        }
      } catch (err) {
        const raw = localStorage.getItem(lsKey);
        if (raw) setProgressMap(JSON.parse(raw));
        setError("Could not reach progress API, using local progress (offline).");
      }
    }
    if (userId && courseId) fetchProgress();
    return () => { mounted = false; };
  }, [userId, courseId]);

  // Save progress
  const scheduleSave = (lessonId, progress, completed = false) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveProgress(lessonId, progress, completed);
    }, autosaveDelay);
  };

  const saveProgress = async (lessonId, progress, completed = false) => {
    setSaving(true);
    const payload = { userId, courseId, lessonId, progress, completed };

    setProgressMap((prev) => ({
      ...prev,
      [lessonId]: { progress, completed, lastUpdated: new Date().toISOString() },
    }));

    try {
      const res = await fetch(`http://localhost:8083/api/course/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const json = await res.json();
      try {
        localStorage.setItem(lsKey, JSON.stringify({
          ...progressMap,
          [lessonId]: { progress, completed, lastUpdated: new Date().toISOString() }
        }));
      } catch (e) {}
      setSaving(false);
      return json;
    } catch (err) {
      try {
        const local = { ...progressMap, [lessonId]: { progress, completed, lastUpdated: new Date().toISOString() } };
        localStorage.setItem(lsKey, JSON.stringify(local));
        setSaving(false);
        setError("Could not save to server — progress saved locally.");
      } catch (e) {
        setSaving(false);
        setError("Could not save progress.");
      }
    }
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !currentLesson) return;
    if (!video.duration) return;
    const percent = Math.round((video.currentTime / video.duration) * 100);
    const prev = progressMap[currentLesson.id]?.progress || 0;
    if (percent !== prev) scheduleSave(currentLesson.id, percent, percent >= 99);
  };

  const onEnded = () => {
    if (!currentLesson) return;
    saveProgress(currentLesson.id, 100, true);
  };

  const jumpToLesson = (index) => {
    setCurrentLessonIndex(index);
    setError(null);
    setTimeout(() => {
      const video = videoRef.current;
      if (video) video.play().catch(() => {});
    }, 200);
  };

  const markComplete = () => {
    if (!currentLesson) return;
    saveProgress(currentLesson.id, 100, true);
  };

  const overallCompletion = () => {
    if (!lessons.length) return 0;
    const total = lessons.length;
    let sum = 0;
    lessons.forEach((l) => {
      sum += (progressMap[l.id]?.progress || 0);
    });
    return Math.round(sum / total);
  };

  if (!isOpen || !currentLesson) return null;

  // ✅ Portal: render modal outside normal DOM flow
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[999999]">
      <div className="relative bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black text-2xl"
        >
          ✖
        </button>

        <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
          {/* Player */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
            <h2 className="text-xl font-semibold mb-3">{currentLesson?.title || "No lesson selected"}</h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded overflow-hidden mb-3">
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="text-sm">Course Completion</div>
                <div className="text-sm font-medium">{overallCompletion()}%</div>
              </div>
              <div className="h-2 bg-gray-200">
                <div className="h-2 rounded" style={{ width: `${overallCompletion()}%`, background: 'linear-gradient(90deg,#4f46e5,#06b6d4)' }} />
              </div>
            </div>

            {/* Video */}
            <div className="w-full bg-black aspect-video rounded overflow-hidden">
              {currentLesson ? (
                <video
                  ref={videoRef}
                  key={currentLesson.id}
                  src={currentLesson.src}
                  controls
                  onTimeUpdate={onTimeUpdate}
                  onEnded={onEnded}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">No lesson</div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => { const v = videoRef.current; v && (v.currentTime = Math.max(0, (v.currentTime || 0) - 10)); }}
                className="px-3 py-2 bg-gray-100 rounded shadow-sm"
              >
                ◀ 10s
              </button>
              <button
                onClick={() => { const v = videoRef.current; v && (v.currentTime = Math.min(v.duration || 0, (v.currentTime || 0) + 10)); }}
                className="px-3 py-2 bg-gray-100 rounded shadow-sm"
              >
                10s ▶
              </button>
              <button
                onClick={() => { const v = videoRef.current; if (!v) return; v.paused ? v.play().catch(()=>{}) : v.pause(); }}
                className="px-3 py-2 bg-indigo-600 text-white rounded shadow"
              >
                Play/Pause
              </button>
              <button
                onClick={markComplete}
                className="ml-auto px-3 py-2 bg-emerald-500 text-white rounded shadow"
              >
                Mark as Complete
              </button>
            </div>

            {error && <div className="mt-3 text-sm text-yellow-700">{error}</div>}
            <div className="mt-2 text-sm text-gray-500">{saving ? "Saving..." : "All changes saved."}</div>
          </div>

          {/* Lessons */}
          <aside className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-medium mb-3">Lessons</h3>
            <ul className="space-y-2">
              {lessons.map((lesson, idx) => {
                const p = progressMap[lesson.id]?.progress || 0;
                const completed = progressMap[lesson.id]?.completed || false;
                return (
                  <li key={lesson.id} className="flex items-center gap-3">
                    <button
                      onClick={() => jumpToLesson(idx)}
                      className="flex-1 text-left py-2 px-3 rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-xs text-gray-500">{p}%</div>
                        </div>
                        <div className="ml-3 text-sm">
                          {completed ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-gray-400">●</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 rounded overflow-hidden">
                        <div className="h-2" style={{ width: `${p}%`, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4">
              <button
                onClick={() => {
                  const summary = lessons.map((l) => ({ title: l.title, progress: progressMap[l.id]?.progress || 0 }));
                  alert(JSON.stringify({ overall: overallCompletion(), items: summary }, null, 2));
                }}
                className="w-full py-2 bg-indigo-600 text-white rounded"
              >
                Show Progress Summary
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body // 👈 append modal to <body>
  );
}
