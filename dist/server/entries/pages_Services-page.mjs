import { useEffect } from "react";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import AOS from "aos";
/* empty css                       */
import { L as LazyImage } from "../chunks/chunk-wLlExif_.js";
import { a as aboutImg1 } from "../chunks/chunk-BCNmD0kc.js";
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
import "react-intersection-observer";
/*! src/pages/Services.jsx [vike:pluginModuleBanner] */
function Services() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Our Services — Apply4Study Online Learning",
    description: "Explore Apply4Study’s services including e-learning courses, online classrooms, and digital study tools.",
    canonical: `${APP_URL}/services`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "E-Learning Platform",
      "provider": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": `${APP_URL}`
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "description": "Apply4Study provides online learning services including interactive courses, virtual classrooms, and live sessions."
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "services-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background service_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative", children: [
      /* @__PURE__ */ jsx("h1", { children: "Our Services" }),
      /* @__PURE__ */ jsx("p", { children: "Empowering You Through Smart, Flexible Learning" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Services" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section ", children: /* @__PURE__ */ jsxs("div", { className: "container section-title pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: " Empowering You Through Smart, Flexible Learning" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we offer a wide range of online education services designed to meet the diverse needs of students, professionals, and lifelong learners. Whether you're aiming to ace an exam, build new skills, or boost your confidence in a subject, we've got a program for you."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Academic Courses (K-12 & Higher Ed)" }),
        /* @__PURE__ */ jsx("p", { children: " Master school and college subjects with our expertly designed academic programs." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Math, Science, English, Social Studies & more" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Aligned with CBSE, ICSE, and international curriculums" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Concept-based learning with live doubt-solving" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Practice quizzes and progress reports" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Test Preparation Courses" }),
        /* @__PURE__ */ jsx("p", { children: "Ace your exams with targeted preparation strategies and expert mentorship." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Ace your exams with targeted preparation strategies and expert mentorship." }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "IELTS, TOEFL, SAT, and other competitive exams" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Section-wise breakdowns and timed mock tests" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Performance analytics and score predictors" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "One-on-one mentoring and revision workshops" }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Skill Development Programs" }),
        /* @__PURE__ */ jsx("p", { children: " Future-proof your career with practical, in-demand skills." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Public Speaking, Communication, Resume Building" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Computer Basics, MS Office, and Google Workspace" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Coding for Kids & Adults (Python, Scratch, Web Dev)" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Critical Thinking, Time Management, and more" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section  ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Live Online Classes" }),
        /* @__PURE__ */ jsx("p", { children: "Learn in real-time with experienced educators." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto pe-0", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Interactive sessions via Zoom or Google Meet" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto pe-0", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Small batch sizes for personalized attention" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto pe-0", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Real-time Q&A and feedback" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto pe-0", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Session recordings for later review" }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Self-Paced Learning Modules" }),
        /* @__PURE__ */ jsx("p", { children: " Learn at your convenience, without deadlines." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "High-quality video lessons" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Downloadable notes and practice sheets" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Lifetime access to course materials" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Quizzes and assessments after each module" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Mentorship & Academic Support" }),
        /* @__PURE__ */ jsx("p", { children: "Sometimes, guidance matters as much as content." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Academic counseling for course planning" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Study techniques and goal tracking" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Career insights and subject advice" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Motivation and study habit coaching" }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section  light-background", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "Certification & Progress Tracking" }),
        /* @__PURE__ */ jsx("p", { children: "Earn recognition and stay motivated." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Digital certificates on course completion" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Skill-based certifications for your resume" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Track your growth with learner dashboards" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Share achievements on LinkedIn or resumes" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "stats section ", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: " Start Your Journey With Apply4Study" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "With expert instructors, engaging content, and flexible options, ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        " is designed to support every kind of learner—from school students to working professionals."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsx("strong", { children: "👉 Explore courses. Discover possibilities. Grow with us." }) })
    ] }) })
  ] }) });
}
/*! pages/Services.page.jsx [vike:pluginModuleBanner] */
const route = "/services";
const documentProps = {
  title: {
    default: "Services",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "Services page",
    config: {}
  }
};
const Services_page = {
  Page: Services,
  route,
  documentProps
};
export {
  Services_page as default,
  documentProps,
  route
};
