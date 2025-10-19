import { useState, useEffect } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
/* empty css                       */
/* empty css                       */
/* empty css                       */
import AOS from "aos";
/* empty css                       */
import { L as LazyImage } from "../chunks/chunk-wLlExif_.js";
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
import { i as img1, a as img2, b as img3, c as img4, d as img5 } from "../chunks/chunk-BlH4OGEP.js";
/* empty css                       */
/* empty css                       */
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { N as Newsletter } from "../chunks/chunk-C070Suwd.js";
/*! src/components/AddDownloadPromo/AddDownloadPromo.jsx [vike:pluginModuleBanner] */
const AppDownloadPromo = () => {
  return /* @__PURE__ */ jsx("div", { className: "section light-background py-0", children: /* @__PURE__ */ jsx("div", { className: "mockup_img text-center py-5", children: /* @__PURE__ */ jsxs("div", { className: "my-3 app_download", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-3", children: "Mobile App Promo" }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        "data-aos": "zoom-in",
        "data-aos-delay": "100",
        "aria-label": "Download on Google Play",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "./Google_Play_Store_badge_EN.svg",
            alt: "Google Play",
            loading: "lazy",
            className: "mx-2"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        "data-aos": "zoom-in",
        "data-aos-delay": "120",
        "aria-label": "Download on the App Store",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "./download-on-the-app-store.svg",
            alt: "App Store",
            loading: "lazy",
            className: "mx-2"
          }
        )
      }
    )
  ] }) }) });
};
/*! src/components/FAQ/FAQ.jsx [vike:pluginModuleBanner] */
const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  process.env.REACT_APP_URL;
  const faqs = [
    {
      question: "Is it free?",
      answer: "Yes, the basic version of our platform is completely free to use."
    },
    {
      question: "Can I use it offline?",
      answer: "Some features are available offline after downloading content."
    },
    {
      question: "How is my data stored?",
      answer: "We securely store your data using encrypted databases and never share it without permission."
    }
  ];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "slide-up", children: [
    /* @__PURE__ */ jsx("h2", { children: "FAQ" }),
    /* @__PURE__ */ jsx("div", { className: "accordion text-start", children: faqs.map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "accordion-item",
        "data-aos": "slide-up",
        "data-aos-delay": 120 + index * 10,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: `accordion-header btn w-100 justify-content-between d-flex ${activeIndex === index ? "" : "collapsed"}`,
              onClick: () => toggleItem(index),
              children: [
                /* @__PURE__ */ jsx("span", { children: item.question }),
                /* @__PURE__ */ jsx("i", { className: `bi ${activeIndex === index ? "bi-chevron-up" : "bi-chevron-down"} ms-2` })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `accordion-body collapse ${activeIndex === index ? "open" : ""}`,
              children: item.answer
            }
          )
        ]
      },
      index
    )) })
  ] }) }) });
};
/*! src/assets/img/hero-img-1.jpg [vike:pluginModuleBanner] */
const hero1 = "/assets/static/hero-img-1.CZNMGEcn.jpg";
/*! src/assets/img/quiz_img.jpg [vike:pluginModuleBanner] */
const quize1 = "/assets/static/quiz_img.CfRIyEjq.jpg";
/*! src/assets/img/progress_tracking_img.jpg [vike:pluginModuleBanner] */
const quize2 = "/assets/static/progress_tracking_img.RRYZUzBq.jpg";
/*! src/assets/img/study.jpg [vike:pluginModuleBanner] */
const quize3 = "/assets/static/study.aw7TMiKc.jpg";
/*! src/assets/img/subjectsTopics.png [vike:pluginModuleBanner] */
const worksImg1 = "/assets/static/subjectsTopics.lPC2RYIA.png";
/*! src/assets/img/addNotes.jpg [vike:pluginModuleBanner] */
const worksImg2 = "/assets/static/addNotes.d1Xpg_Gw.jpg";
/*! src/assets/img/takeQuize.png [vike:pluginModuleBanner] */
const worksImg3 = "/assets/static/takeQuize.DnApb-6D.png";
/*! src/assets/img/student.png [vike:pluginModuleBanner] */
const student1 = "/assets/static/student.DqbV0I-6.png";
/*! src/assets/img/teachers.png [vike:pluginModuleBanner] */
const student2 = "/assets/static/teachers.CbKvP82B.png";
/*! src/assets/img/exam.png [vike:pluginModuleBanner] */
const student3 = "/assets/static/exam.2ypn7TPz.png";
/*! src/components/SearchSection/HomeSearchSection.jsx [vike:pluginModuleBanner] */
const SearchSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "about", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row gy-4", children: /* @__PURE__ */ jsxs("div", { className: "search-container", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-white text-center search-title", children: [
      /* @__PURE__ */ jsx("strong", { children: "18 million" }),
      " searches and counting"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "search-bar", children: [
      /* @__PURE__ */ jsxs("div", { className: "input-wrapper", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-search icon" }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "english", className: "form-control" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "input-wrapper", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-globe icon" }),
        /* @__PURE__ */ jsxs("select", { className: "form-select form-control", children: [
          /* @__PURE__ */ jsx("option", { children: "Canada" }),
          /* @__PURE__ */ jsx("option", { children: "United States" }),
          /* @__PURE__ */ jsx("option", { children: "United Kingdom" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { children: "Search" })
    ] })
  ] }) }) }) });
};
/*! src/components/StatsSection/StatsSection.jsx [vike:pluginModuleBanner] */
const statsData = [
  {
    icon: "bi-mortarboard",
    number: 1.3,
    suffix: "M+",
    label: "Students Helped",
    color: "#0d6efd"
  },
  {
    icon: "bi-globe",
    number: 14e4,
    suffix: "+",
    label: "Global Programs",
    color: "#dc3545"
  },
  {
    icon: "bi-bank",
    number: 1500,
    suffix: "+",
    label: "Institutions Globally",
    color: "#20c997"
  },
  {
    icon: "bi-flag",
    number: 150,
    suffix: "+",
    label: "Nationalities",
    color: "#fd7e14"
  },
  {
    icon: "bi-person",
    number: 10,
    suffix: "+",
    label: "Years of Expertise",
    color: "#6610f2"
  }
];
const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  return /* @__PURE__ */ jsxs("div", { className: "stats-section light-background section", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-center mb-5", children: [
      "The Fastest and Easiest Way",
      /* @__PURE__ */ jsx("br", {}),
      "to Successfully Study Abroad"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "stats-grid", ref, children: statsData.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
      /* @__PURE__ */ jsx("div", { className: "icon-box", style: { backgroundColor: stat.color }, children: /* @__PURE__ */ jsx("i", { className: `bi ${stat.icon}` }) }),
      /* @__PURE__ */ jsx("h3", { style: { color: stat.color }, children: inView ? /* @__PURE__ */ jsx(CountUp, { end: stat.number, duration: 2, suffix: stat.suffix }) : 0 }),
      /* @__PURE__ */ jsx("p", { children: stat.label })
    ] }, idx)) })
  ] });
};
/*! src/pages/Home.jsx [vike:pluginModuleBanner] */
const sliderData = [
  {
    heading: "Master Any Subject Faster with Smarter Study Tools",
    subText: "Track progress, ace quizzes, and never miss a revision.",
    image: hero1
  }
];
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
function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const APP_URL = process.env.REACT_APP_URL;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  useSEO({
    title: "Apply4Study — Online Learning Platform",
    description: "Join Apply4Study to access interactive e-learning, online classrooms, and flexible study options.",
    canonical: `${APP_URL}/`,
    keywords: "elearning, online classroom, virtual study, apply4study",
    og: {
      "og:title": "Apply4Study — Online Learning Platform",
      "og:description": "Learn smarter with Apply4Study. Online classrooms, live lectures, and flexible e-learning options.",
      "og:type": "website",
      "og:url": `${APP_URL}/`,
      "og:image": `${APP_URL}/assets/og-banner.jpg`
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": "Apply4Study — Online Learning Platform",
      "twitter:description": "Access interactive online courses with Apply4Study.",
      "twitter:image": `${APP_URL}/assets/og-banner.jpg`
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Apply4Study",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "url": `${APP_URL}/`,
      "logo": `${APP_URL}/assets/logo.png`,
      "sameAs": [
        "https://www.facebook.com/apply4study",
        "https://x.com/apply4study",
        "https://www.linkedin.com/company/apply4study"
      ]
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { id: "hero", className: "hero section", children: /* @__PURE__ */ jsx("div", { className: "container py-lg-5", children: /* @__PURE__ */ jsx(
      Swiper,
      {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        pagination: { clickable: true },
        navigation: true,
        autoplay: { delay: 5e3 },
        children: sliderData.map((slide, index) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "carousel-container", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center justify-content-sm-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-12 text-lg-start text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "my-3", children: slide.heading }),
            /* @__PURE__ */ jsx("p", { className: "m-0 d-lg-block d-none", children: slide.subText }),
            !isMobile && /* @__PURE__ */ jsx("a", { href: "/get-started", className: "btn-get-started mx-auto mx-lg-0", children: "Get Started Free" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "col-md-5 col-12 borderBottomEffect", children: /* @__PURE__ */ jsx("div", { className: "slider_img pt-lg-4 text-center", children: /* @__PURE__ */ jsx(
            LazyImage,
            {
              src: slide.image,
              alt: `Slide ${index + 1}`,
              className: "img-fluid rounded",
              fetchPriority: "high"
            }
          ) }) })
        ] }) }) }) }, index))
      }
    ) }) }),
    /* @__PURE__ */ jsx(SearchSection, {}),
    /* @__PURE__ */ jsx(StatsSection, {}),
    /* @__PURE__ */ jsxs("section", { id: "featured-services", className: "featured-services section", children: [
      /* @__PURE__ */ jsx("div", { className: "container section-title", "data-aos": "fade-up", children: /* @__PURE__ */ jsx("h2", { children: "Core features" }) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row gy-4", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12 col-md-6", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "why-choose__list", children: /* @__PURE__ */ jsxs("div", { className: "row text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: quize1, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "Custom Quizzes" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "zoom-in", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(
            LazyImage,
            {
              src: quize2,
              className: "img-fluid rounded-circle",
              alt: "custum quizzes"
            }
          ),
          /* @__PURE__ */ jsx("h6", { children: "Progress Tracking" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-right", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: quize3, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "Study Planner" })
        ] }) })
      ] }) }) }) }) }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "how_it_works", className: "about section light-background", children: [
      /* @__PURE__ */ jsx("div", { className: "container section-title", "data-aos": "fade-up", children: /* @__PURE__ */ jsx("h2", { children: " How It Works" }) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row gy-4", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12 col-md-6", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "why-choose__list", children: /* @__PURE__ */ jsxs("div", { className: "row text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-left", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: worksImg1, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "Create subjects & topics" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "zoom-in", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: worksImg2, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "Add notes and flashcards" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-right", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: worksImg3, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "Take quizzes and track progress" })
        ] }) })
      ] }) }) }) }) }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "benefitsUsers", className: "about section", children: [
      /* @__PURE__ */ jsx("div", { className: "container section-title", "data-aos": "fade-up", children: /* @__PURE__ */ jsx("h2", { children: " Benefits for Users" }) }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row gy-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "col-lg-12 col-md-6", "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "why-choose__list", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: student1, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "For Students" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "zoom-in", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: student2, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "For Teachers" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-4 col-md-4 col-12", "data-aos": "slide-down", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "card why-choose__wrapper round_img", children: [
          /* @__PURE__ */ jsx(LazyImage, { src: student3, className: "img-fluid rounded-circle", alt: "custum quizzes" }),
          /* @__PURE__ */ jsx("h6", { children: "For Competitive Exam Prep" })
        ] }) })
      ] }) }) }) }) }) })
    ] }),
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
    /* @__PURE__ */ jsx(AppDownloadPromo, {}),
    /* @__PURE__ */ jsx(FaqSection, {}),
    /* @__PURE__ */ jsx(Newsletter, {})
  ] });
}
/*! pages/Home.page.jsx [vike:pluginModuleBanner] */
const route = "/";
const documentProps = {
  title: {
    default: "Home",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "Home page",
    config: {}
  }
};
const Home_page = {
  Page: Home,
  route,
  documentProps
};
export {
  Home_page as default,
  documentProps,
  route
};
