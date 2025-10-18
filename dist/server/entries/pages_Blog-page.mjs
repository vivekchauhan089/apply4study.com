import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import AOS from "aos";
import { u as useSEO } from "../chunks/chunk-BzfYDzQ6.js";
import { L as LazyImage } from "../chunks/chunk-DZmpAonr.js";
import { N as Newsletter } from "../chunks/chunk-Z5B-vSN6.js";
import "react-intersection-observer";
const blog1 = "/assets/static/blog-1.DQJ1aK4z.jpg";
const blog2 = "/assets/static/blog-2.DnNSsc1U.jpg";
const blog3 = "/assets/static/blog-3.CmEtnaLm.jpg";
const blog4 = "/assets/static/blog-4.BlsvisbT.jpg";
const blog5 = "/assets/static/blog-5.DG4x4bYY.jpg";
const blog6 = "/assets/static/blog-6.ioLCgBek.jpg";
const blogAuth2 = "/assets/static/blog-author-2.BMx85-dU.jpg";
const blogAuth3 = "/assets/static/blog-author-3.0_5LQ10O.jpg";
const blogAuth4 = "/assets/static/blog-author-4.5HCWg8e2.jpg";
const blogAuth5 = "/assets/static/blog-author-5.DkHsm2MD.jpg";
const blogAuth6 = "/assets/static/blog-author-6.33Yuu0le.jpg";
function Blog() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "How to Succeed in Online Learning — Apply4Study Blog",
    description: "Tips and strategies for succeeding in online classrooms.",
    canonical: `${APP_URL}/blog/online-learning-tips`,
    schema: {
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "How to Succeed in Online Learning",
      "author": {
        "@type": "Person",
        "name": "Vivek Kumar"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "logo": {
          "@type": "ImageObject",
          "url": `${APP_URL}/assets/logo.png`
        }
      },
      "image": `${APP_URL}/assets/blog/online-learning.jpg`
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "blog-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background blog_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative", children: [
      /* @__PURE__ */ jsx("h1", { children: "Our Blog" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Blog" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: " Insights, Tips & Stories to Power Your Learning Journey" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Welcome to the ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        " Blog — your go-to space for practical advice, student stories, learning strategies, and education trends. Whether you're preparing for an exam, exploring new study habits, or simply curious about online learning, we've got something for you."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "blog-posts", className: "blog-posts section light-background", children: [
      /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "fade-up", children: [
        /* @__PURE__ */ jsx("h5", { children: "Latest Posts" }),
        /* @__PURE__ */ jsx("p", { children: "Explore our latest articles, tips, and insights to help you navigate your educational journey." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog1, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: " Study Tips" }),
          /* @__PURE__ */ jsx("h2", { className: "title mb-2", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "5 Online Learning Habits That Lead to Success" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Discover proven study habits that help online learners stay motivated, organized, and ahead of the curve." }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth2, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Maria Doe" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Jan 1, 2022" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog2, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Test Prep" }),
          /* @__PURE__ */ jsx("h2", { className: "title", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "IELTS vs PTE: Which Test is Right for You?" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Confused between IELTS and PTE? We break down the differences, scoring systems, and ideal candidate profiles." }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth2, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Allisa Mayer" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Jun 5, 2022" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog3, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "E-learning Trends" }),
          /* @__PURE__ */ jsx("h2", { className: "title", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "The Rise of Microlearning: Is It the Future of Online Education?" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Short, focused lessons are changing how we learn. Here's why microlearning might be perfect for your schedule." }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth3, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Mark Dower" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Jun 22, 2022" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog4, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: " Productivity" }),
          /* @__PURE__ */ jsx("h2", { className: "title", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "How to Stay Focused in Online Classes (Even When You're Home)" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Simple ways to beat distractions, stay productive, and make the most of your virtual classroom." }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth4, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Lisa Neymar" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Jun 30, 2022" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog5, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Tools & Resources" }),
          /* @__PURE__ */ jsx("h2", { className: "title", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "Top 10 Free Tools Every Online Student Should Use" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "From note-taking apps to time trackers, here are the tools our students swear by." }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth5, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Denis Peterson" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Jan 30, 2022" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("div", { className: "post-img", children: /* @__PURE__ */ jsx(LazyImage, { src: blog6, alt: "", className: "img-fluid" }) }),
          /* @__PURE__ */ jsx("p", { className: "post-category", children: "Entertainment" }),
          /* @__PURE__ */ jsx("h2", { className: "title", children: /* @__PURE__ */ jsx("a", { href: "blog-details.html", children: "Distinctio provident quibusdam numquam aperiam aut" }) }),
          /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
            /* @__PURE__ */ jsx(LazyImage, { src: blogAuth6, alt: "", className: "img-fluid post-author-img flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "post-meta", children: [
              /* @__PURE__ */ jsx("p", { className: "post-author", children: "Mika Lendon" }),
              /* @__PURE__ */ jsx("p", { className: "post-date", children: /* @__PURE__ */ jsx("time", { dateTime: "2022-01-01", children: "Feb 14, 2022" }) })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "stats section mb-3", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: "Want to Contribute?" }),
      /* @__PURE__ */ jsx("p", { children: "Are you a student, teacher, or education enthusiast with insights to share?" }),
      /* @__PURE__ */ jsx("p", { children: "We welcome guest writers who want to inspire others through their learning journey." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "📧 Email us at ",
        /* @__PURE__ */ jsx("a", { href: "mailto:blog@apply4study.com", title: " blog@apply4study.com", children: "blog@apply4study.com" }),
        " to pitch your idea!"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "blog-pagination", className: "blog-pagination section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-center", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "bi bi-chevron-left" }) }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: "1" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "active", children: "2" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: "3" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: "4" }) }),
      /* @__PURE__ */ jsx("li", { children: "..." }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: "10" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", children: /* @__PURE__ */ jsx("i", { className: "bi bi-chevron-right" }) }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Newsletter, {})
  ] }) });
}
const documentProps = {
  title: "Blog | Apply4Study",
  description: "Blog page"
};
function Page() {
  return /* @__PURE__ */ jsx(Blog, {});
}
export {
  Page,
  documentProps
};
