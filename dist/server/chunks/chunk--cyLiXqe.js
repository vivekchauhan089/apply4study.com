import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
function CoursePlayer({
  userId,
  courseId,
  lessons = [],
  startLessonId,
  isOpen,
  onClose
}) {
  const portalEl = useRef(null);
  useEffect(() => {
    const el = document.createElement("div");
    el.className = "course-player-portal";
    document.body.appendChild(el);
    portalEl.current = el;
    return () => {
      if (portalEl.current) document.body.removeChild(portalEl.current);
      portalEl.current = null;
    };
  }, []);
  useEffect(() => {
    if (!portalEl.current) return;
    let cur = portalEl.current.parentElement;
    while (cur) {
      const cs = getComputedStyle(cur);
      if (cs.transform && cs.transform !== "none" || cs.filter && cs.filter !== "none" || cs.perspective && cs.perspective !== "none" || cs.willChange && cs.willChange !== "auto") {
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
  const initialIndex = lessons.findIndex((l) => l.id === startLessonId);
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
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    let mounted = true;
    async function fetchProgress() {
      try {
        const res = await fetch(`${API_URL}/course/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({ userId, courseId })
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
              lastUpdated: r.lastUpdated || null
            };
          });
          setProgressMap(map);
          try {
            localStorage.setItem(lsKey, JSON.stringify(map));
          } catch (e) {
          }
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
    return () => {
      mounted = false;
    };
  }, [userId, courseId]);
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
      [lessonId]: { progress, completed, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() }
    }));
    try {
      const res = await fetch(`${API_URL}/course/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const json = await res.json();
      try {
        localStorage.setItem(lsKey, JSON.stringify({
          ...progressMap,
          [lessonId]: { progress, completed, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() }
        }));
      } catch (e) {
      }
      setSaving(false);
      return json;
    } catch (err) {
      try {
        const local = { ...progressMap, [lessonId]: { progress, completed, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() } };
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
    const percent = Math.round(video.currentTime / video.duration * 100);
    const prev = progressMap[currentLesson.id]?.progress || 0;
    if (percent !== prev) scheduleSave(currentLesson.id, percent, percent >= 99);
  };
  const onEnded = () => {
    if (!currentLesson) return;
    saveProgress(currentLesson.id, 100, true);
  };
  const markComplete = () => {
    if (!currentLesson) return;
    saveProgress(currentLesson.id, 100, true);
  };
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
    gap: 16
  };
  const leftStyle = { flex: 2, padding: 16, display: "flex", flexDirection: "column", gap: 12 };
  const rightStyle = { flex: 1, padding: 16, overflowY: "auto", borderLeft: "1px solid #eee" };
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx("div", { style: backdropStyle, onClick: onClose, role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxs("div", { style: modalStyle, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          style: { position: "absolute", right: 12, top: 12, border: "none", background: "transparent", fontSize: 20, cursor: "pointer" },
          "aria-label": "Close",
          children: "✖"
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: leftStyle, children: [
        /* @__PURE__ */ jsx("h3", { style: { margin: 0 }, children: currentLesson?.title ?? "No lesson selected" }),
        /* @__PURE__ */ jsx("div", { style: { aspectRatio: "16/9", background: "#000", borderRadius: 8, overflow: "hidden" }, children: currentLesson ? /* @__PURE__ */ jsx(
          "video",
          {
            ref: videoRef,
            src: currentLesson.src,
            controls: true,
            style: { width: "100%", height: "100%", objectFit: "cover" },
            onTimeUpdate,
            onEnded
          },
          currentLesson.id
        ) : /* @__PURE__ */ jsx("div", { style: { color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }, children: "No lesson" }) }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            const v = videoRef.current;
            if (v) v.currentTime = Math.max(0, (v.currentTime || 0) - 10);
          }, children: "◀ 10s" }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            const v = videoRef.current;
            if (v) v.pause();
            else v && v.play().catch(() => {
            });
          }, children: "Play/Pause" }),
          /* @__PURE__ */ jsx("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ jsx("button", { onClick: markComplete, children: "Mark as Complete" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { style: rightStyle, children: [
        /* @__PURE__ */ jsx("h4", { style: { marginTop: 0 }, children: "Lessons" }),
        /* @__PURE__ */ jsx("ul", { style: { padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }, children: lessons.map((l, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentLessonIndex(idx),
            style: {
              width: "100%",
              textAlign: "left",
              padding: "10px",
              borderRadius: 6,
              background: idx === currentLessonIndex ? "#f3f4f6" : "transparent",
              border: "none",
              cursor: "pointer"
            },
            children: /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: l.title })
          }
        ) }, l.id)) })
      ] })
    ] }) }),
    portalEl.current
  );
}
const AvailableCourses = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
      },
      body: JSON.stringify({
        "user_id": "68d27fa20a1b391f84d652ba",
        "source": "Livguard"
      })
    }).then((res) => res.json()).then((data) => {
      if (data.data) {
        setCourses(data.data);
      } else {
        console.error("Error:", data.error);
      }
    }).catch((err) => console.error(err));
  }, []);
  const handlePlay = (course, video) => {
    setSelectedCourse({
      courseId: course._id,
      lessons: course.videos.map((v) => ({
        id: v._id.toString(),
        title: v.name,
        src: v.url
      })),
      startLessonId: video._id.toString()
    });
  };
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  return /* @__PURE__ */ jsx("section", { className: "course-posts section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-title", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: "Popular Courses" }),
      /* @__PURE__ */ jsx("p", { children: "We offer a variety of courses to suit your learning needs. Explore our options and find the perfect fit for you." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-5 tabs", children: [
      /* @__PURE__ */ jsx("button", { className: `btn theme-btn mx-2 ${activeTab === "popular" ? "active" : ""}`, onClick: () => setActiveTab("popular"), children: "For Students" }),
      /* @__PURE__ */ jsx("button", { className: `btn theme-btn mx-2 ${activeTab === "recommended" ? "active" : ""}`, onClick: () => setActiveTab("recommended"), children: "For Teachers" })
    ] }),
    activeTab === "popular" && /* @__PURE__ */ jsx(Fragment, { children: chunkArray(courses, 3).map((row, rowIndex) => /* @__PURE__ */ jsx("div", { className: "row gy-4 featured", children: row.map((course) => /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          className: "img-fluid",
          src: course.courseImage ?? "/static/media/blog-1.97a1a61032fc6b5b3c4c.jpg"
        }
      ) }) }),
      /* @__PURE__ */ jsx("p", { className: "post-category", children: "Study Tips" }),
      /* @__PURE__ */ jsxs("h3", { className: "title mb-2", children: [
        course.courseName,
        " - ",
        /* @__PURE__ */ jsx("sup", { children: "₹" }),
        "19",
        /* @__PURE__ */ jsx("span", { children: "/month" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "buy-btn", children: "Enroll Now" }),
      /* @__PURE__ */ jsx("ul", { children: course.videos.map((video) => /* @__PURE__ */ jsxs("li", { className: "d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { className: "bi bi-play-circle" }),
          " ",
          video.name
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-sm btn-primary",
            onClick: () => handlePlay(course, video),
            children: "▶ Play"
          }
        )
      ] }, video._id)) })
    ] }) }, course._id)) }, rowIndex)) }),
    activeTab === "recommended" && /* @__PURE__ */ jsx(Fragment, { children: chunkArray(courses, 3).map((row, rowIndex) => /* @__PURE__ */ jsx("div", { className: "row gy-4 featured", children: row.map((course) => /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "img",
        {
          alt: "",
          className: "img-fluid",
          src: course.courseImage ?? "/static/media/blog-1.97a1a61032fc6b5b3c4c.jpg"
        }
      ) }) }),
      /* @__PURE__ */ jsx("p", { className: "post-category", children: "Study Tips" }),
      /* @__PURE__ */ jsxs("h3", { className: "title mb-2", children: [
        course.courseName,
        " - ",
        /* @__PURE__ */ jsx("sup", { children: "₹" }),
        "19",
        /* @__PURE__ */ jsx("span", { children: "/month" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "buy-btn", children: "Enroll Now" }),
      /* @__PURE__ */ jsx("ul", { children: course.videos.map((video) => /* @__PURE__ */ jsxs("li", { className: "d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { className: "bi bi-play-circle" }),
          " ",
          video.name
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "btn btn-sm btn-primary",
            onClick: () => handlePlay(course, video),
            children: "▶ Play"
          }
        )
      ] }, video._id)) })
    ] }) }, course._id)) }, rowIndex)) }),
    selectedCourse && /* @__PURE__ */ jsx(
      CoursePlayer,
      {
        userId: "68d27fa20a1b391f84d652ba",
        courseId: selectedCourse.courseId.toString(),
        lessons: selectedCourse.lessons,
        startLessonId: selectedCourse.startLessonId,
        isOpen: true,
        onClose: () => setSelectedCourse(null)
      }
    )
  ] }) });
};
export {
  AvailableCourses as A
};
