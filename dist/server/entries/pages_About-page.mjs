import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import AOS from "aos";
import { u as useSEO } from "../chunks/chunk-BzfYDzQ6.js";
import { a as aboutImg1 } from "../chunks/chunk-CsZW0ICH.js";
import { L as LazyImage } from "../chunks/chunk-DZmpAonr.js";
import "react-intersection-observer";
function About() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Apply4Study — Know about Us",
    description: "Reach out to Apply4Study for online learning support, inquiries, or collaborations.",
    canonical: `${APP_URL}/about`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Apply4Study",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "image": `${APP_URL}/assets/logo.png`,
      "url": `${APP_URL}/`,
      "telephone": "+91-9876543210",
      "email": "support@apply4study.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Learning Street",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110001",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.facebook.com/apply4study",
        "https://x.com/apply4study",
        "https://www.linkedin.com/company/apply4study"
      ]
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "about-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background about_us_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "About Us" }),
      /* @__PURE__ */ jsx("p", { children: "Learn Anywhere. Grow Anytime." }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "About" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "about section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h2", { children: " Learn Anywhere. Grow Anytime." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we're on a mission to make quality education accessible, flexible, and truly learner-centric. Our online classroom platform is designed to help students, professionals, and lifelong learners gain in-demand skills and knowledge—on their own schedule, from anywhere in the world."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Whether you're looking to advance your career, explore a new field, or simply learn something new,",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        " is here to support you every step of the way. Join us and discover a world of learning opportunities at your fingertips."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "about", className: "about section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", "data-aos": "fade-up", "data-aos-delay": "100", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: aboutImg1, className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", children: [
        /* @__PURE__ */ jsx("h3", { children: "Why Choose Apply4Study?" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-10", children: [
              /* @__PURE__ */ jsx("strong", { children: "🎓 Expert-Led Courses" }),
              /* @__PURE__ */ jsx("p", { children: "Explore a wide range of courses across various subjects, from academic subjects to professional skills and personal development." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-10", children: [
              /* @__PURE__ */ jsx("strong", { children: "💻 Flexible Learning" }),
              /* @__PURE__ */ jsx("p", { children: "Access courses 24/7 through your desktop, tablet, or phone. Pause, resume, or revisit content anytime to fit your learning pace." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-10", children: [
              /* @__PURE__ */ jsx("strong", { children: "📈 Skill-Focused Curriculum" }),
              /* @__PURE__ */ jsx("p", { children: "Our courses are built around real skills that matter—be it in academics, test prep, technology, communication, or career development." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-10", children: [
              /* @__PURE__ */ jsx("strong", { children: "🌐 Engaging Learning Environment" }),
              /* @__PURE__ */ jsx("p", { children: "From video lectures and live classes to quizzes, peer forums, and assignments—our online classrooms are designed to keep you involved and motivated." })
            ] })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "stats", className: "stats section dark-background", children: /* @__PURE__ */ jsx("div", { className: "container", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "stats-item text-center w-100 h-100", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-purecounter-start": "0",
            "data-purecounter-end": "232",
            "data-purecounter-duration": "1",
            className: "purecounter"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Clients" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6", "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "stats-item text-center w-100 h-100", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-purecounter-start": "0",
            "data-purecounter-end": "521",
            "data-purecounter-duration": "1",
            className: "purecounter"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Projects" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6", "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "stats-item text-center w-100 h-100", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-purecounter-start": "0",
            "data-purecounter-end": "1453",
            "data-purecounter-duration": "1",
            className: "purecounter"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Hours Of Support" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-3 col-md-6", "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "stats-item text-center w-100 h-100", children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-purecounter-start": "0",
            "data-purecounter-end": "32",
            "data-purecounter-duration": "1",
            className: "purecounter"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Workers" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { id: "services", className: "services section light-background", "data-aos": "fade-up", "data-aos-delay": "100", children: [
      /* @__PURE__ */ jsx("div", { className: "container section-title", children: /* @__PURE__ */ jsx("h2", { children: " What We Offer" }) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "service-item position-relative", children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "bi bi-file-earmark-text" }),
            " Academic Courses"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Math, Science, Languages, and more for school and college-level students" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "service-item position-relative", children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "bi bi-file-earmark-check" }),
            " Test Prep"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Comprehensive preparation for competitive exams like IELTS, SAT, or subject-specific assessments" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "service-item position-relative", children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "bi bi-file-earmark-person" }),
            " Skill Building"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Public speaking, digital literacy, coding, critical thinking, etc." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "service-item position-relative", children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "bi bi-file-earmark-person" }),
            " Live Classrooms"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Interactive sessions with instructors, real-time Q&A, and feedback" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "service-item position-relative", children: [
          /* @__PURE__ */ jsxs("h4", { children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "bi bi-file-earmark-person" }),
            "Certificates"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Earn completion certificates to showcase your achievements" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "vision", className: "vision section", "data-aos": "slide-right", "data-aos-delay": "100", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsx("div", { className: "col-lg-6 col-md-6", children: /* @__PURE__ */ jsx("div", { className: "row gy-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12", children: [
        /* @__PURE__ */ jsx("h3", { children: "Our Vision" }),
        /* @__PURE__ */ jsx("p", { children: "We envision a world where learning is not limited by geography, time, or background. With Apply4Study, education becomes a continuous journey—powered by curiosity, supported by technology, and led by purpose." }),
        /* @__PURE__ */ jsx("p", { children: "Join our growing learning community and take the next step in your academic or personal growth." }),
        /* @__PURE__ */ jsx("p", { children: "👉 Start learning today—because your future begins with knowledge." })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-6 col-md-6", children: /* @__PURE__ */ jsx("div", { className: "row gy-4", children: /* @__PURE__ */ jsxs("div", { className: "col-12", children: [
        /* @__PURE__ */ jsx("h3", { children: "Our Mission" }),
        /* @__PURE__ */ jsx("p", { children: "At Apply4Study, we're on a mission to make quality education accessible, flexible, and truly learner-centric. Our online classroom platform is designed to help students, professionals, and lifelong learners gain in-demand skills and knowledge—on their own schedule, from anywhere in the world." }),
        /* @__PURE__ */ jsx("p", { children: "Whether you're looking to advance your career, explore a new field, or simply learn something new, Apply4Study is here to support you every step of the way. Join us and discover a world of learning opportunities at your fingertips." })
      ] }) }) })
    ] }) }) })
  ] }) });
}
const documentProps = {
  title: "About | Apply4Study",
  description: "About page"
};
function Page() {
  return /* @__PURE__ */ jsx(About, {});
}
export {
  Page,
  documentProps
};
