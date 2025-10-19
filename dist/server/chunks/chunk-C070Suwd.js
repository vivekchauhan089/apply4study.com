import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
/*! src/components/common/Newsletter.jsx [vike:pluginModuleBanner] */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify({ contact: email, type: "newsletter" })
        // field name matches backend
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "You are already subscribed.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3e6);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return /* @__PURE__ */ jsx("div", { className: "section light-background", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row gy-4 align-items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "col-lg-6 col-md-6 col-12", "data-aos": "slide-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxs("div", { className: "container section-title pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: "Subscribe to Our Newsletter" }),
      /* @__PURE__ */ jsx("p", { children: "Get the latest updates, learning tips, and offers delivered straight to your inbox." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-12", "data-aos": "slide-down", "data-aos-delay": "200", children: [
      /* @__PURE__ */ jsx("div", { className: "newsletter-form", children: /* @__PURE__ */ jsxs("form", { className: "newsletter-form justify-content-start", onSubmit: handleNewsletterSubmit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Enter your email or mobile number",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            disabled: loading
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, children: loading ? "Subscribing..." : "Subscribe" })
      ] }) }),
      message && /* @__PURE__ */ jsxs("p", { style: { color: "#FD7311", margin: "0 120px", fontSize: "0.9rem" }, children: [
        message,
        " "
      ] })
    ] })
  ] }) }) });
};
export {
  Newsletter as N
};
