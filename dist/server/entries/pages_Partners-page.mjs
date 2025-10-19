import { useEffect } from "react";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
/* empty css                       */
/* empty css                       */
/* empty css                       */
import AOS from "aos";
/* empty css                       */
import { i as img1, a as img2, b as img3, c as img4, d as img5 } from "../chunks/chunk-BlH4OGEP.js";
import { L as LazyImage } from "../chunks/chunk-wLlExif_.js";
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
import "react-intersection-observer";
/*! src/pages/Partners.jsx [vike:pluginModuleBanner] */
const testimonials = [
  {
    img: img1,
    name: "Saul Goodman",
    role: "Ceo & Founder",
    quote: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id..."
  },
  {
    img: img2,
    name: "Sara Wilsson",
    role: "Designer",
    quote: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis..."
  },
  {
    img: img3,
    name: "Jena Karlis",
    role: "Store Owner",
    quote: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis..."
  },
  {
    img: img4,
    name: "Matt Brandon",
    role: "Freelancer",
    quote: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit..."
  },
  {
    img: img5,
    name: "John Larson",
    role: "Entrepreneur",
    quote: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam..."
  }
];
function Partners() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Our Partners — Apply4Study",
    description: "Meet Apply4Study’s global education partners and collaborators.",
    canonical: `${APP_URL}/partners`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Apply4Study Partners",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "url": `${APP_URL}/partners`,
      "logo": `${APP_URL}/assets/logo.png`,
      "brand": [
        {
          "@type": "Brand",
          "name": "EduGlobal",
          "url": "https://eduglobal.com"
        },
        {
          "@type": "Brand",
          "name": "SmartLearning",
          "url": "https://smartlearning.com"
        }
      ]
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "partners-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background partners_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative", children: [
      /* @__PURE__ */ jsx("h1", { children: "Our Partners" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Partners" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section ", children: /* @__PURE__ */ jsxs("div", { className: "container section-title pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: " Collaborating for Better Learning Outcomes" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we believe great education is built on strong partnerships. We proudly collaborate with a network of trusted institutions, educators, edtech providers, and corporate trainers to deliver high-quality, accessible, and future-ready learning experiences."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Whether it's content development, technology integration, or academic enrichment, our partners play a vital role in shaping the success of our learners." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: "assets/img/about.jpg", className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "🎓 Academic & Institutional Partners" }),
        /* @__PURE__ */ jsx("p", { children: " We work with schools, colleges, and universities to create blended learning solutions that complement traditional education. Our academic partners help us ensure that content is curriculum-aligned, credible, and impactful." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Curriculum-aligned modules for school boards (CBSE, ICSE, IB)" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Exam prep and support courses for university students" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Co-branded certifications and special training programs" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "🖥️ EdTech & Content Collaborators" }),
        /* @__PURE__ */ jsx("p", { children: "Our tech and content partners help us bring innovation to education—from interactive videos to AI-powered assessments." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Educational software and LMS integration" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Content licensing and custom course creation" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Virtual lab tools and gamified learning resources" }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: "assets/img/about.jpg", className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 position-relative align-self-start", "data-aos": "fade-up", "data-aos-delay": "100", children: [
        /* @__PURE__ */ jsx(LazyImage, { src: "assets/img/about.jpg", className: "img-fluid", alt: "" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/watch?v=Y7f98aduVJ8", className: "glightbox pulsating-play-btn" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 content", "data-aos": "fade-up", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsx("h3", { children: "💼 Corporate & Training Partners" }),
        /* @__PURE__ */ jsx("p", { children: "We also work with businesses and training institutes to deliver scalable upskilling solutions for employees and professionals." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Soft skills, communication, and productivity training" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "200", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Onboarding and employee development modules" }) })
          ] }) }),
          /* @__PURE__ */ jsx("li", { "data-aos": "slide-left", "data-aos-delay": "300", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-10", children: /* @__PURE__ */ jsx("p", { children: "Industry-specific skill courses with real-world relevance" }) })
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "testimonials", className: "testimonials section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-title", children: [
        /* @__PURE__ */ jsx("h2", { children: "Testimonials" }),
        /* @__PURE__ */ jsx("p", { children: "Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "testimonial-slider",
          "data-aos": "zoom-in",
          "data-aos-delay": "100",
          children: /* @__PURE__ */ jsx(
            Swiper,
            {
              modules: [Pagination, Autoplay],
              slidesPerView: 1,
              spaceBetween: 20,
              loop: true,
              pagination: { clickable: true },
              autoplay: { delay: 5e3 },
              breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              },
              children: testimonials.map((item, index) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsxs("div", { className: "testimonial-item", children: [
                /* @__PURE__ */ jsx(
                  LazyImage,
                  {
                    src: item.img,
                    className: "testimonial-img",
                    alt: item.name
                  }
                ),
                /* @__PURE__ */ jsx("h3", { children: item.name }),
                /* @__PURE__ */ jsx("h4", { children: item.role }),
                /* @__PURE__ */ jsx("div", { className: "stars", children: Array(5).fill(0).map((_, i) => /* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }, i)) }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("i", { className: "bi bi-quote quote-icon-left" }),
                  /* @__PURE__ */ jsx("span", { children: item.quote }),
                  /* @__PURE__ */ jsx("i", { className: "bi bi-quote quote-icon-right" })
                ] })
              ] }) }, index))
            }
          )
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "stats section", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: " Let's Grow Together" }),
      /* @__PURE__ */ jsx("p", { children: "If you're an educator, institution, or organization looking to amplify your impact in the digital learning space, we'd love to partner with you." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "👉 Contact us at ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:partnership@apply4study.com",
            title: "partnership@apply4study.com",
            children: "partnership@apply4study.com"
          }
        )
      ] }) })
    ] }) })
  ] }) });
}
/*! pages/Partners.page.jsx [vike:pluginModuleBanner] */
const route = "/partners";
const documentProps = {
  title: {
    default: "Partners",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "Partners page",
    config: {}
  }
};
const Partners_page = {
  Page: Partners,
  route,
  documentProps
};
export {
  Partners_page as default,
  documentProps,
  route
};
