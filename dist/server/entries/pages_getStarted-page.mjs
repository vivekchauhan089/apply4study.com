import { useEffect, useState, useRef } from "react";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "swiper/react";
import "swiper/modules";
/* empty css                       */
/* empty css                       */
/* empty css                       */
import AOS from "aos";
/* empty css                       */
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
import ReCAPTCHA from "react-google-recaptcha";
/*! src/pages/GetStarted.jsx [vike:pluginModuleBanner] */
function GetStarted() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    role: "",
    recaptcha: "",
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();
  const [token, setToken] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) {
      newErrors.firstNameClass = "is-invalid";
      newErrors.firstNameMsgClass = "invalid-feedback";
      newErrors.first_name = "First name is required";
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
    if (!formData.role) {
      newErrors.roleClass = "is-invalid";
      newErrors.roleMsgClass = "invalid-feedback";
      newErrors.role = "Please select a role";
    }
    if (!formData.termsAccepted) {
      newErrors.termsClass = "is-invalid";
      newErrors.termsMsgClass = "invalid-feedback";
      newErrors.termsAccepted = "You must agree to terms";
    }
    const token2 = recaptchaRef.current.getValue();
    if (!token2) {
      newErrors.captchaClass = "is-invalid";
      newErrors.captchaMsgClass = "invalid-feedback";
      newErrors.captcha = "Please verify your identity at Apply4Study";
    }
    return newErrors;
  };
  const handleRegisterSubmit = async (e) => {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            mobile: formData.mobile,
            role: formData.role,
            recaptcha: token,
            termsAccepted: formData.termsAccepted
          })
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Registration successful!");
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            role: "",
            recaptcha: "",
            termsAccepted: false
          });
        } else {
          setMessage(data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration error:", error);
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
  useSEO({
    title: "Get Started — Join Apply4Study",
    description: "Sign up today and start your journey with Apply4Study’s interactive online learning platform.",
    canonical: `${APP_URL}/get-started`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Get Started with Apply4Study",
      "url": `${APP_URL}/get-started`,
      "description": "Sign up for Apply4Study and access online courses, classrooms, and digital learning resources.",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "logo": {
          "@type": "ImageObject",
          "url": `${APP_URL}/assets/logo.png`
        }
      }
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "partners-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background get_started_bg getStarted_bg", children: /* @__PURE__ */ jsx("div", { className: "container text-start text-white", children: /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "fs-3", children: "🚀 Get Started for Free" }),
      /* @__PURE__ */ jsxs("p", { className: "lead mt-3", children: [
        "Start Learning in Minutes — ",
        /* @__PURE__ */ jsx("strong", { children: "No Credit Card Needed" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Welc ome to ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", where learning is flexible, fun, and free to begin!"
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Sign up today to access a growing library of expert-led courses, live sessions, and self-paced learning tools designed to fit your schedule and goals." }),
      /* @__PURE__ */ jsx("p", { children: "Whether you're a student, professional, or just curious to learn something new — this is your starting point." }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs mt-3", children: /* @__PURE__ */ jsxs("ol", { className: "justify-content-start", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "./", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current text-white", children: "Get Started" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section light-background  pb-lg-0", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row pt-lg-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-7 col-md-7 col-12", children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-3", children: "🎁 What You Get with Free Access:" }),
        /* @__PURE__ */ jsx("p", { children: "With our free account, you can explore a variety of courses and learning modules at no cost. Enjoy instant access to selected content, live webinars, and personalized learning tools designed to help you succeed. Plus, you can upgrade to a premium account at any time if you love what you see!" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
          /* @__PURE__ */ jsx("li", { children: "✅ Instant Access to a selection of free courses and learning modules" }),
          /* @__PURE__ */ jsx("li", { children: "✅ Free entry to live webinars and demo classes" }),
          /* @__PURE__ */ jsx("li", { children: "✅ Personalized learning dashboard" }),
          /* @__PURE__ */ jsx("li", { children: "✅ Practice quizzes and progress tracking" }),
          /* @__PURE__ */ jsx("li", { children: "✅ Option to upgrade anytime — only if you love it!" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-lg-5 col-md-5 col-12", children: /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", children: "✍️ Create Your Free Account" }),
        /* @__PURE__ */ jsxs("form", { noValidate: true, validated: validated.toString(), onSubmit: handleRegisterSubmit, className: "p-4 border rounded bg-light", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "first_name", className: "form-label", children: "First Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "first_name",
                required: true,
                className: "form-control " + errors.firstNameClass,
                value: formData.first_name,
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.firstNameMsgClass, children: errors.first_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "last_name", className: "form-label", children: "Last Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "last_name",
                className: "form-control " + errors.lastNameClass,
                onChange: handleChange,
                value: formData.last_name
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.lastNameMsgClass, children: errors.last_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "form-label", children: "Email Address *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                required: true,
                className: "form-control " + errors.emailClass,
                value: formData.email,
                onChange: handleChange
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.emailMsgClass, children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "mobile", className: "form-label", children: "Mobile Number *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "mobile",
                value: formData.mobile,
                onChange: handleChange,
                required: true,
                className: "form-control " + errors.mobileClass
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.mobileMsgClass, children: errors.mobile })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "role", className: "form-label", children: "I am a:" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                type: "selectbox",
                name: "role",
                className: "form-control " + errors.roleClass,
                onChange: handleChange,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Select --" }),
                  /* @__PURE__ */ jsx("option", { value: "student", children: "Student" }),
                  /* @__PURE__ */ jsx("option", { value: "professional", children: "Professional" }),
                  /* @__PURE__ */ jsx("option", { value: "parent", children: "Parent" }),
                  /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.roleMsgClass, children: errors.role })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-check mb-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                name: "termsAccepted",
                checked: formData.termsAccepted,
                onChange: handleChange,
                required: true,
                className: "form-check-input " + errors.termsClass
              }
            ),
            /* @__PURE__ */ jsxs("label", { htmlFor: "agree", className: "form-check-label", children: [
              "I agree to the ",
              /* @__PURE__ */ jsx("a", { href: "/terms-conditions", target: "_blank", children: "Terms & Conditions" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: errors.termsMsgClass, children: errors.termsAccepted })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx(
              ReCAPTCHA,
              {
                ref: recaptchaRef,
                sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
                style: { transform: "scale(1.32)", transformOrigin: "0 14px" },
                onChange: (value) => setToken(value),
                className: errors.captchaClass
              }
            ),
            /* @__PURE__ */ jsx("div", { className: errors.captchaMsgClass, style: { marginTop: "40px" }, children: errors.captcha })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary w-100", children: "Create Free Account" })
        ] }),
        message && /* @__PURE__ */ jsxs("p", { style: { marginTop: "8px", color: "#FD7311", fontSize: "0.8rem" }, children: [
          message,
          " "
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: " about section ", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-12", children: [
        /* @__PURE__ */ jsx("h5", { children: "🔒 Your Data is Safe" }),
        /* @__PURE__ */ jsx("p", { children: "We respect your privacy. Your information will only be used to create your account and personalize your learning experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-12", children: [
        /* @__PURE__ */ jsx("h4", { children: "🌟 Ready to Begin?" }),
        /* @__PURE__ */ jsx("p", { children: "Join thousands of learners upgrading their skills, advancing their studies, and unlocking new opportunities." }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "👉 Sign up now — it’s free!" }) })
      ] })
    ] }) }) })
  ] }) });
}
/*! pages/GetStarted.page.jsx [vike:pluginModuleBanner] */
const route = "/getstarted";
const documentProps = {
  title: {
    default: "GetStarted",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "GetStarted page",
    config: {}
  }
};
const GetStarted_page = {
  Page: GetStarted,
  route,
  documentProps
};
export {
  GetStarted_page as default,
  documentProps,
  route
};
