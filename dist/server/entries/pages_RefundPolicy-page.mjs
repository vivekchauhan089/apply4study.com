import { useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
import AOS from "aos";
/* empty css                       */
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
/*! src/pages/RefundPolicy.jsx [vike:pluginModuleBanner] */
function RefundPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Cancellation & Refund Policy — Apply4Study",
    description: "Read Apply4Study’s cancellation and refund policy for payments made via Razorpay. Understand eligibility, refund timelines, and support process.",
    canonical: `${APP_URL}/cancellation-refund-policy`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cancellation & Refund Policy - Apply4Study",
      "description": "Apply4Study’s policy describing refund eligibility and cancellation procedures for Razorpay transactions.",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I request a refund?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Refunds can be requested by contacting Apply4Study support within 7 days of payment through your Razorpay transaction reference."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to process refunds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Refunds are processed within 5–7 business days to the original payment method via Razorpay."
            }
          }
        ]
      }
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "refund-policy-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "Cancellation & Refund Policy" }),
      /* @__PURE__ */ jsx("p", { children: "Your Privacy Matters to Us" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Refund Policy" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section light-background", children: /* @__PURE__ */ jsxs("div", { className: "container", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we aim to provide valuable learning experiences. As our services are digital and subscription-based, our refund and cancellation terms comply with standard digital servicepractices and Razorpay policies."
      ] }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "1. Cancellation Policy" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "- You may cancel your subscription plan at any time from your account dashboard. ",
        /* @__PURE__ */ jsx("br", {}),
        "- Cancellations stop auto-renewal of your plan but do not generate a refund for the current billing period. - Once a course or plan is activated, it remains accessible until the end of your billing cycle."
      ] }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "2. Refund Policy" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "- Refunds are not applicable once a digital plan or course has been activated. ",
        /* @__PURE__ */ jsx("br", {}),
        "- In case of duplicate payment, technical error, or unauthorized transaction, please email",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:support@apply4study.com", children: "support@apply4study.com" }),
        " ",
        "within ",
        /* @__PURE__ */ jsx("strong", { children: "7 days" }),
        " of the transaction with payment details.",
        " ",
        /* @__PURE__ */ jsx("br", {}),
        "- Approved refunds (if any) are processed within",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "7–10 business days" }),
        " via Razorpay or the original payment method."
      ] }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "3. Payment Disputes" }),
      /* @__PURE__ */ jsx("p", { children: "- If you notice any discrepancies in payment, please contact our support before raising a dispute with Razorpay. - We’ll ensure a transparent resolution process for all genuine cases." }),
      /* @__PURE__ */ jsx("h5", { className: "mt-4", children: "4. Contact for Refund Queries" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For assistance related to cancellations or refunds, please contact our support team at",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:support@apply4study.com", children: "support@apply4study.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-muted", children: /* @__PURE__ */ jsx("em", { children: "Last updated: October 2025" }) }),
      /* @__PURE__ */ jsx("hr", { className: "my-4" }),
      /* @__PURE__ */ jsxs("div", { className: "related-links mt-4", children: [
        /* @__PURE__ */ jsx("h5", { children: "Related Policies" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/privacy-policy`, children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/terms-conditions`, children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/shipping-policy`, children: "Shipping & Delivery Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/contact`, children: "Contact Us" }) })
        ] })
      ] })
    ] }) })
  ] });
}
/*! pages/RefundPolicy.page.jsx [vike:pluginModuleBanner] */
const route = "/refundpolicy";
const documentProps = {
  title: {
    default: "RefundPolicy",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "RefundPolicy page",
    config: {}
  }
};
const RefundPolicy_page = {
  Page: RefundPolicy,
  route,
  documentProps
};
export {
  RefundPolicy_page as default,
  documentProps,
  route
};
