import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import AOS from "aos";
import { u as useSEO } from "../chunks/chunk-BzfYDzQ6.js";
import { L as LazyImage } from "../chunks/chunk-DZmpAonr.js";
import { a as aboutImg1 } from "../chunks/chunk-CsZW0ICH.js";
import ReCAPTCHA from "react-google-recaptcha";
import "react-intersection-observer";
function Contact() {
  const [validated, setValidated] = useState(false);
  const [IsMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    content: "",
    recaptcha: ""
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const APP_URL = process.env.REACT_APP_URL;
  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.content.trim()) newErrors.content = "Message is required";
    if (!formData.name.trim()) {
      newErrors.nameClass = "is-invalid";
      newErrors.nameMsgClass = "invalid-feedback";
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.emailClass = "is-invalid";
      newErrors.emailMsgClass = "invalid-feedback";
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailClass = "is-invalid";
      newErrors.emailMsgClass = "invalid-feedback";
      newErrors.email = "Invalid email address";
    }
    if (!formData.mobile) {
      newErrors.mobileClass = "is-invalid";
      newErrors.mobileMsgClass = "invalid-feedback";
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobileClass = "is-invalid";
      newErrors.mobileMsgClass = "invalid-feedback";
      newErrors.mobile = "Mobile must be a 10 digit number";
    }
    if (!formData.subject) {
      newErrors.subjectClass = "is-invalid";
      newErrors.subjectMsgClass = "invalid-feedback";
      newErrors.subject = "Subject is required";
    }
    if (!formData.content) {
      newErrors.contentClass = "is-invalid";
      newErrors.contentMsgClass = "invalid-feedback";
      newErrors.content = "Message is required";
    }
    return newErrors;
  };
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setErrors({});
      setValidated(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({
            name: formData.name,
            contact: formData.email,
            mobile: formData.mobile,
            subject: formData.subject,
            content: formData.content,
            type: "contact",
            recaptcha: token
          })
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Subscribed successfully!");
          setFormData({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            content: "",
            token: ""
          });
        } else {
          setMessage(data.message || "You are already subscribed.");
        }
      } catch (error) {
        console.error("Subscription error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
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
  useSEO({
    title: "Contact Apply4Study — Get in Touch",
    description: "Have questions or need support? Contact Apply4Study for online learning assistance, business inquiries, or partnership opportunities.",
    canonical: `${APP_URL}/contact`,
    schema: {
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": `${APP_URL}/`,
        "logo": `${APP_URL}/assets/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9716003265",
          "email": "support@apply4study.com",
          "contactType": "customer support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://www.facebook.com/apply4study",
          "https://www.x.com/apply4study",
          "https://www.instagram.com/apply4study",
          "https://www.linkedin.com/company/apply4study",
          "https://www.pinterest.com/apply4study"
        ]
      }
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "contact-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background contact_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { children: "We’d Love to Hear from You" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Contact Us" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "contact", className: "contact section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-title", children: [
        /* @__PURE__ */ jsx("h2", { children: "Get in Touch with Apply4Study" }),
        /* @__PURE__ */ jsx("p", { children: "Have a question about our online courses, classrooms, or partnership opportunities? We're here to help! Reach out using the contact form, or connect with us through email or phone." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row gy-4 align-items-start", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "col-lg-6 col-md-12",
            "data-aos": "fade-right",
            "data-aos-delay": "100",
            children: /* @__PURE__ */ jsx(
              LazyImage,
              {
                src: aboutImg1,
                className: "img-fluid rounded-3 shadow-sm w-100",
                alt: "Contact Apply4Study"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "col-lg-6 col-md-12",
            "data-aos": "fade-left",
            "data-aos-delay": "200",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "map-container rounded-3 overflow-hidden shadow-sm",
                  style: {
                    width: "100%",
                    height: "240px",
                    maxHeight: "50vh",
                    border: "2px solid #FD7311"
                  },
                  children: /* @__PURE__ */ jsx(
                    "iframe",
                    {
                      title: "Apply4Study Location",
                      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2833.2439050208177!2d77.11876935397093!3d28.550038263090855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c6bceebb54f%3A0xc96f5b857b627282!2sWorldmark%201%2C%20Aerocity%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1760641410781!5m2!1sen!2sin",
                      width: "100%",
                      height: "100%",
                      style: { border: 0 },
                      allowFullScreen: "",
                      loading: "lazy",
                      referrerPolicy: "no-referrer-when-downgrade"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "info-box mb-4", children: [
                /* @__PURE__ */ jsx("h3", { children: "Contact Information" }),
                /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("i", { className: "bi bi-geo-alt" }),
                    " ",
                    /* @__PURE__ */ jsx("strong", { children: "Address:" }),
                    " Unit 307 Worldmark 1, Aerocity, New Delhi 110037"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("i", { className: "bi bi-telephone" }),
                    " ",
                    /* @__PURE__ */ jsx("strong", { children: "Phone:" }),
                    " ",
                    " ",
                    /* @__PURE__ */ jsx("a", { href: "tel:+919716003265", children: "+91-9716003265" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("i", { className: "bi bi-envelope" }),
                    " ",
                    /* @__PURE__ */ jsx("strong", { children: "Email:" }),
                    " ",
                    /* @__PURE__ */ jsx("a", { href: "mailto:support@apply4study.com", children: "support@apply4study.com" })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { children: [
                    /* @__PURE__ */ jsx("i", { className: "bi bi-clock" }),
                    " ",
                    /* @__PURE__ */ jsx("strong", { children: "Hours:" }),
                    " Mon–Sat: 9 AM – 6 PM"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "social-links mt-3 mb-3", children: [
                  /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/apply4study", className: "me-3", children: /* @__PURE__ */ jsx("i", { className: "bi bi-facebook" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://x.com/apply4study", className: "me-3", children: /* @__PURE__ */ jsx("i", { className: "bi bi-twitter-x" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/apply4study", className: "me-3", children: /* @__PURE__ */ jsx("i", { className: "bi bi-instagram" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/apply4study", className: "me-3", children: /* @__PURE__ */ jsx("i", { className: "bi bi-linkedin" }) }),
                  /* @__PURE__ */ jsx("a", { href: "https://www.pinterest.com/apply4study", children: /* @__PURE__ */ jsx("i", { className: "bi bi-pinterest" }) })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        id: "contact-form",
        className: "section",
        "data-aos": "fade-up",
        "data-aos-delay": "100",
        children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxs("div", { className: "section-title text-center", children: [
            /* @__PURE__ */ jsx("h2", { children: "Send Us a Message" }),
            /* @__PURE__ */ jsx("p", { children: "We’ll get back to you as soon as possible." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxs("div", { className: "col-lg-8", children: [
            /* @__PURE__ */ jsx("form", { noValidate: true, validated: validated.toString(), onSubmit: handleContactFormSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row gy-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    className: "form-control " + errors.nameClass,
                    placeholder: "Your Name",
                    required: true,
                    value: formData.name,
                    onChange: handleChange
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: errors.nameMsgClass, children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    className: "form-control " + errors.emailClass,
                    name: "email",
                    placeholder: "Your Email",
                    required: true,
                    value: formData.email,
                    onChange: handleChange
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: errors.emailMsgClass, children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    className: "form-control " + errors.mobileClass,
                    name: "mobile",
                    maxLength: "10",
                    placeholder: "Your Mobile",
                    required: true,
                    value: formData.mobile,
                    onChange: handleChange
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: errors.mobileMsgClass, children: errors.mobile })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: "form-control " + errors.subjectClass,
                    name: "subject",
                    placeholder: "Subject",
                    required: true,
                    value: formData.subject,
                    onChange: handleChange
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: errors.subjectMsgClass, children: errors.subject })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: "form-control " + errors.contentClass,
                    name: "content",
                    rows: "6",
                    placeholder: "Your Message",
                    required: true,
                    value: formData.content,
                    onChange: handleChange,
                    children: formData.content
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: errors.contentMsgClass, children: errors.content })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx(
                ReCAPTCHA,
                {
                  sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
                  onChange: (value) => setToken(value)
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "col-md-12 text-center", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "btn btn-primary rounded-pill px-4 py-2",
                  disabled: !token,
                  children: "Send Message"
                }
              ) })
            ] }) }),
            message && /* @__PURE__ */ jsxs("p", { style: { marginTop: "8px", color: "#FD7311", fontSize: "0.8rem" }, children: [
              message,
              " "
            ] })
          ] }) })
        ] })
      }
    )
  ] }) });
}
const documentProps = {
  title: "Contact | Apply4Study",
  description: "Contact page"
};
function Page() {
  return /* @__PURE__ */ jsx(Contact, {});
}
export {
  Page,
  documentProps
};
