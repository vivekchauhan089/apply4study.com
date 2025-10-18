import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import AOS from "aos";
import { u as useSEO } from "../chunks/chunk-BzfYDzQ6.js";
import { A as AvailableCourses } from "../chunks/chunk--cyLiXqe.js";
import { N as Newsletter } from "../chunks/chunk-Z5B-vSN6.js";
import "react-dom";
function Courses() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Explore Online Courses — Apply4Study",
    description: "Browse Apply4Study’s collection of online courses designed to enhance your learning journey.",
    canonical: `${APP_URL}/courses`,
    schema: {
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Full-Stack Web Development",
          "description": "Learn React, Node.js, and MongoDB in this full-stack developer course.",
          "url": `${APP_URL}/courses/fullstack-web-development`
        },
        {
          "@type": "Course",
          "name": "Digital Marketing Essentials",
          "description": "Master SEO, SEM, and social media marketing strategies.",
          "url": `${APP_URL}/courses/digital-marketing`
        },
        {
          "@type": "Course",
          "name": "Data Science with Python",
          "description": "Hands-on Python, Pandas, and Machine Learning training.",
          "url": `${APP_URL}/courses/data-science`
        }
      ]
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "price-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background pricing_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative", children: [
      /* @__PURE__ */ jsx("h1", { children: "Enroll Courses" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Courses" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: " Learn More. Pay Less. Choose What Fits You Best." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we believe in making quality education affordable and flexible. Whether you're just getting started or ready to go all in, we have a plan that matches your goals — and your budget."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AvailableCourses, {}),
    /* @__PURE__ */ jsx("section", { className: "stats section mb-3", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: "🔒 No Hidden Fees. Cancel Anytime." }),
      /* @__PURE__ */ jsx("p", { children: "We offer secure payments, flexible billing, and the freedom to pause or cancel your subscription anytime." }),
      /* @__PURE__ */ jsx("p", { children: "We offer custom plans with admin dashboards, group analytics, and teacher tools." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "📧 Email us at ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:blog@apply4study.com",
            title: " blog@apply4study.com",
            children: "blog@apply4study.com"
          }
        ),
        " to pitch your idea!"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "stats section mb-3 light-background", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: "🎓 Special Plans for Schools & Groups" }),
      /* @__PURE__ */ jsx("p", { children: "Are you a school, institution, or learning center?" }),
      /* @__PURE__ */ jsx("p", { children: "We offer custom plans with admin dashboards, group analytics, and teacher tools." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "📧 Email us at ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:blog@apply4study.com",
            title: " blog@apply4study.com",
            children: "blog@apply4study.com"
          }
        ),
        " to pitch your idea!"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Newsletter, {})
  ] }) });
}
const documentProps = {
  title: "Courses | Apply4Study",
  description: "Courses page"
};
function Page() {
  return /* @__PURE__ */ jsx(Courses, {});
}
export {
  Page,
  documentProps
};
