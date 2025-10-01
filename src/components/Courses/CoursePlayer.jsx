// CoursePlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function CoursePlayer({
  userId,
  courseId,
  lessons = [],
  startLessonId,
  isOpen,
  onClose,
}) {
  const portalEl = useRef(null);

  // Create a dedicated portal container appended to document.body
  useEffect(() => {
    const el = document.createElement("div");
    el.className = "course-player-portal"; // you can style if needed
    document.body.appendChild(el);
    portalEl.current = el;
    return () => {
      if (portalEl.current) document.body.removeChild(portalEl.current);
      portalEl.current = null;
    };
  }, []);

  // Diagnostics: check for any ancestor with a transform/filter that can break fixed positioning
  useEffect(() => {
    if (!portalEl.current) return;
    let cur = portalEl.current.parentElement;
    while (cur) {
      const cs = getComputedStyle(cur);
      if ((cs.transform && cs.transform !== "none")
        || (cs.filter && cs.filter !== "none")
        || (cs.perspective && cs.perspective !== "none")
        || (cs.willChange && cs.willChange !== "auto")
      ) {
        console.warn("Ancestor with transform/filter detected which can trap fixed children:", cur, {
          transform: cs.transform,
          filter: cs.filter,
          perspective: cs.perspective,
          willChange: cs.willChange
        });
        break;
      }
      cur = cur.parentElement;
    }
  }, [portalEl.current]);

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
        const res = await fetch(`http://apply4study.com/api/course/progress`, {
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
      const res = await fetch(`http://apply4study.com/api/course/progress`, {
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

  // If not open or portal not ready, render nothing
  if (!isOpen || !portalEl.current) return null;

  const backdropStyle = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.65)",
    zIndex: 999999
  };

  const modalStyle = {
    width: "min(1100px, 96vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    position: "relative",
    display: "flex",
    gap: 16,
  };

  const leftStyle = { flex: 2, padding: 16, display: "flex", flexDirection: "column", gap: 12 };
  const rightStyle = { flex: 1, padding: 16, overflowY: "auto", borderLeft: "1px solid #eee" };

  return ReactDOM.createPortal(
    <div style={backdropStyle} onClick={onClose} role="dialog" aria-modal="true">
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", right: 12, top: 12, border: "none", background: "transparent", fontSize: 20, cursor: "pointer" }}
          aria-label="Close"
        >✖</button>

        {/* Left: Video & controls */}
        <div style={leftStyle}>
          <h3 style={{ margin: 0 }}>{currentLesson?.title ?? "No lesson selected"}</h3>

          <div style={{ aspectRatio: "16/9", background: "#000", borderRadius: 8, overflow: "hidden" }}>
            {currentLesson ? (
              <video
                ref={videoRef}
                key={currentLesson.id}
                src={currentLesson.src}
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onTimeUpdate={onTimeUpdate} 
                onEnded={onEnded}
              />
            ) : (
              <div style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                No lesson
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { const v = videoRef.current; if (v) v.currentTime = Math.max(0, (v.currentTime || 0) - 10); }}>◀ 10s</button>
            <button onClick={() => { const v = videoRef.current; if (v) v.pause(); else v && v.play().catch(()=>{}); }}>Play/Pause</button>
            <div style={{ marginLeft: "auto" }}>
              <button onClick={markComplete}>Mark as Complete</button>
            </div>
          </div>
        </div>

        {/* Right: Lessons */}
        <aside style={rightStyle}>
          <h4 style={{ marginTop: 0 }}>Lessons</h4>
          <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {lessons.map((l, idx) => (
              <li key={l.id}>
                <button
                  onClick={() => setCurrentLessonIndex(idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px",
                    borderRadius: 6,
                    background: idx === currentLessonIndex ? "#f3f4f6" : "transparent",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{l.title}</div>
                  {/* small progress text if you have it */}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>,
    portalEl.current
  );
}
