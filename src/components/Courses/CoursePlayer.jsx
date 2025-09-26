import React, { useEffect, useRef, useState } from "react";

/**
 * CoursePlayer.jsx
 *
 * Single-file React component for a course video player that:
 * - plays lessons (video)
 * - tracks per-lesson progress (0-100)
 * - marks lessons complete
 * - resumes from saved progress (reads/writes to /api/progress)
 * - autosaves with debounce to reduce API calls
 *
 * Usage:
 * <CoursePlayer
 *   userId="..."
 *   courseId="..."
 *   lessons={[{ id: 'l1', title: 'Intro', src: '/videos/intro.mp4' }, ...]}
 * />
 *
 * Notes:
 * - Styling uses Tailwind utility classes.
 * - Assumes API endpoints (as created earlier):
 *    POST /api/progress  { userId, courseId, lessonId, progress, completed }
 *    GET  /api/progress/:userId/:courseId
 * - If API is unreachable, component falls back to localStorage for progress storage.
 */

export default function CoursePlayer({ userId, courseId, lessons = [] }) {
  const videoRef = useRef(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progressMap, setProgressMap] = useState({}); // { lessonId: { progress, completed, lastUpdated } }
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);
  const autosaveDelay = 900; // ms debounce

  const currentLesson = lessons[currentLessonIndex];

  // Helper: localStorage key
  const lsKey = `course_progress_${courseId}_${userId}`;

  // Fetch progress from API (or localStorage fallback)
  useEffect(() => {
    let mounted = true;
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress/${userId}/${courseId}`);
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
          // persist a copy locally
          try { localStorage.setItem(lsKey, JSON.stringify(map)); } catch (e) {}
        } else {
          // fallback to localStorage
          const raw = localStorage.getItem(lsKey);
          if (raw) setProgressMap(JSON.parse(raw));
        }
      } catch (err) {
        // network/API failed -> try localStorage
        const raw = localStorage.getItem(lsKey);
        if (raw) setProgressMap(JSON.parse(raw));
        setError("Could not reach progress API, using local progress (offline).");
      }
    }
    if (userId && courseId) fetchProgress();
    return () => { mounted = false; };
  }, [userId, courseId]);

  // When lesson changes, seek to saved time if available
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentLesson) return;

    const saved = progressMap[currentLesson.id];
    if (saved && typeof saved.progress === "number" && video.duration > 0) {
      // can't seek until metadata loaded; so listen for loadedmetadata
      const onLoaded = () => {
        const t = (saved.progress / 100) * (video.duration || 0);
        if (!isNaN(t) && isFinite(t)) video.currentTime = Math.min(t, video.duration - 0.1);
      };
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
      // if metadata already loaded
      if (video.readyState >= 1) onLoaded();
    }
  }, [currentLessonIndex, progressMap]);

  // Save progress (debounced)
  const scheduleSave = (lessonId, progress, completed = false) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveProgress(lessonId, progress, completed);
    }, autosaveDelay);
  };

  // Save progress immediately
  const saveProgress = async (lessonId, progress, completed = false) => {
    setSaving(true);
    const payload = { userId, courseId, lessonId, progress, completed };

    // optimistic update in UI
    setProgressMap((prev) => ({
      ...prev,
      [lessonId]: { progress, completed, lastUpdated: new Date().toISOString() },
    }));

    try {
      const res = await fetch(`/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const json = await res.json();
      // Persist local copy
      try { localStorage.setItem(lsKey, JSON.stringify({ ...progressMap, [lessonId]: { progress, completed, lastUpdated: new Date().toISOString() } })); } catch (e) {}
      setSaving(false);
      return json;
    } catch (err) {
      // fallback: store locally
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

  // video timeupdate -> schedule save
  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !currentLesson) return;
    if (!video.duration || isNaN(video.duration) || !isFinite(video.duration)) return;
    const percent = Math.round((video.currentTime / video.duration) * 100);
    const prev = progressMap[currentLesson.id]?.progress || 0;
    // avoid saving if percent hasn't changed
    if (percent !== prev) scheduleSave(currentLesson.id, percent, percent >= 99);
  };

  const onEnded = () => {
    if (!currentLesson) return;
    saveProgress(currentLesson.id, 100, true);
  };

  const jumpToLesson = (index) => {
    setCurrentLessonIndex(index);
    setError(null);
    // small delay to ensure video src updates
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

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      {/* Left: Player */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-3">{currentLesson?.title || "No lesson selected"}</h2>

        <div className="w-full bg-gray-100 rounded overflow-hidden mb-3">
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="text-sm">Course Completion</div>
            <div className="text-sm font-medium">{overallCompletion()}%</div>
          </div>
          <div className="h-2 bg-gray-200">
            <div className="h-2 rounded" style={{ width: `${overallCompletion()}%`, background: 'linear-gradient(90deg,#4f46e5,#06b6d4)' }} />
          </div>
        </div>

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

      {/* Right: Lesson list */}
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
              // show summary in an alert/modal (simple)
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
  );
}