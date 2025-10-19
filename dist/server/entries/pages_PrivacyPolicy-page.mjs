import { useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
import AOS from "aos";
/* empty css                       */
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
/*! src/pages/PrivacyPolicy.jsx [vike:pluginModuleBanner] */
function PrivacyPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Privacy Policy — Apply4Study",
    description: "Learn how Apply4Study protects your privacy and personal information while delivering secure and trusted online learning experiences.",
    canonical: `${APP_URL}/privacy-policy`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - Apply4Study",
      "description": "Apply4Study respects your privacy and ensures transparency in how your personal data is collected and used.",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      }
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "privacy-policy-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { children: "Your Privacy Matters to Us" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Privacy Policy" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        " values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, mobile application, and services."
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "1. Information We Collect" }),
      /* @__PURE__ */ jsx("p", { children: "We collect information you provide directly (e.g., name, email, phone, academic details), as well as data automatically gathered through analytics tools, cookies, and third-party integrations such as Razorpay for secure payments." }),
      /* @__PURE__ */ jsx("h5", { children: "2. How We Use Your Information" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "We use your data to:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Provide and personalize learning services" }),
          /* @__PURE__ */ jsx("li", { children: "Process secure payments via Razorpay" }),
          /* @__PURE__ */ jsx("li", { children: "Send updates, newsletters, and support messages" }),
          /* @__PURE__ */ jsx("li", { children: "Improve user experience through analytics" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "3. Data Security" }),
      /* @__PURE__ */ jsx("p", { children: "We use SSL encryption, secure databases, and PCI-DSS-compliant payment processing via Razorpay to safeguard all personal and financial data." }),
      /* @__PURE__ */ jsx("h5", { children: "4. Cookies & Tracking" }),
      /* @__PURE__ */ jsx("p", { children: "Our platform uses cookies to improve site functionality and user experience. You can modify cookie preferences via your browser settings." }),
      /* @__PURE__ */ jsx("h5", { children: "5. Sharing of Information" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "We never sell or rent your data. Information may only be shared with:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Authorized service providers (e.g., Razorpay, AWS, SendGrid)" }),
          /* @__PURE__ */ jsx("li", { children: "Legal authorities, if required by law" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "6. Your Rights" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "You have the right to access, update, or delete your personal data. Contact",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:privacy@apply4study.com", children: "privacy@apply4study.com" }),
        " for assistance."
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "7. Updates to This Policy" }),
      /* @__PURE__ */ jsx("p", { children: "This policy may be updated periodically. Changes will be reflected on this page with the revised effective date." }),
      /* @__PURE__ */ jsx("h5", { children: "8. Contact Us" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For privacy-related questions, contact us at:",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "Email:" }),
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:support@apply4study.com", children: "support@apply4study.com" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("strong", { children: "Address:" }),
        " Unit 307 Worldmark 1, Aerocity, New Delhi 110037, India"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-muted", children: /* @__PURE__ */ jsx("em", { children: "Last updated: October 2025" }) }),
      /* @__PURE__ */ jsx("hr", { className: "my-4" }),
      /* @__PURE__ */ jsxs("div", { className: "related-links mt-4", children: [
        /* @__PURE__ */ jsx("h5", { children: "Related Policies" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/terms-conditions`, children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/shipping-policy`, children: "Shipping & Delivery Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/refund-policy`, children: "Cancellation & Refund Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/contact`, children: "Contact Us" }) })
        ] })
      ] })
    ] }) })
  ] });
}
/*! pages/PrivacyPolicy.page.jsx [vike:pluginModuleBanner] */
const route = "/privacypolicy";
const documentProps = {
  title: {
    default: "PrivacyPolicy",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "PrivacyPolicy page",
    config: {}
  }
};
const PrivacyPolicy_page = {
  Page: PrivacyPolicy,
  route,
  documentProps
};
export {
  PrivacyPolicy_page as default,
  documentProps,
  route
};
