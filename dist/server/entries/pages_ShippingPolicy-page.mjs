import { useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
import AOS from "aos";
/* empty css                       */
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
/*! src/pages/ShippingPolicy.jsx [vike:pluginModuleBanner] */
function ShippingPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Shipping Policy — Apply4Study",
    description: "Understand Apply4Study's shipping policy for physical or digital course materials. Learn about processing times, delivery methods, and support contact details.",
    canonical: `${APP_URL}/shipping-policy`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Shipping Policy - Apply4Study",
      "description": "Apply4Study outlines the terms and process for shipping digital or physical materials, including delivery timelines and handling.",
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
  return /* @__PURE__ */ jsxs("div", { className: "shipping-policy-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "Shipping & Delivery Policy" }),
      /* @__PURE__ */ jsx("p", { children: "Your Privacy Matters to Us" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Shipping Policy" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", all our services, subscriptions, and learning materials are delivered digitally. There is no physical shipping involved for any of our plans or courses."
      ] }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "Digital Delivery" }),
      /* @__PURE__ */ jsx("p", { children: "Once a successful payment is completed through Razorpay, you will receive immediate access to your selected course or subscription plan through your registered email address and dashboard. Please ensure your account details are accurate to avoid delays." }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "Delivery Timelines" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "- Access is generally activated instantly after payment confirmation. ",
        /* @__PURE__ */ jsx("br", {}),
        "- In rare cases (e.g., technical issues or payment gateway delays), access may take up to ",
        /* @__PURE__ */ jsx("strong", { children: "24 hours" }),
        ". If your course or plan access isn’t available after 24 hours, please contact our support team at",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:support@apply4study.com", children: "support@apply4study.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "Contact for Assistance" }),
      /* @__PURE__ */ jsx("p", { children: "For any questions or concerns regarding digital delivery, please reach out to our support team. We’ll be happy to help ensure you get access as soon as possible." }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-muted", children: /* @__PURE__ */ jsx("em", { children: "Last updated: October 2025" }) }),
      /* @__PURE__ */ jsx("hr", { className: "my-4" }),
      /* @__PURE__ */ jsxs("div", { className: "related-links mt-4", children: [
        /* @__PURE__ */ jsx("h5", { children: "Related Policies" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/privacy-policy`, children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/terms-conditions`, children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/refund-policy`, children: "Cancellation & Refund Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/contact`, children: "Contact Us" }) })
        ] })
      ] })
    ] }) })
  ] });
}
/*! pages/ShippingPolicy.page.jsx [vike:pluginModuleBanner] */
const route = "/shipping-policy";
const documentProps = {
  title: {
    default: "ShippingPolicy",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "ShippingPolicy page",
    config: {}
  }
};
const ShippingPolicy_page = {
  Page: ShippingPolicy,
  route,
  documentProps
};
export {
  ShippingPolicy_page as default,
  documentProps,
  route
};
