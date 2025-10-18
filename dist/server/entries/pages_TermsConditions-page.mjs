import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import AOS from "aos";
import { u as useSEO } from "../chunks/chunk-BzfYDzQ6.js";
function TermsConditions() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Terms & Conditions — Apply4Study",
    description: "Review Apply4Study’s Terms & Conditions to understand the rules and responsibilities of using our online learning platform.",
    canonical: `${APP_URL}/terms-conditions`,
    schema: {
      "@context": "https://schema.org",
      "@type": ["WebPage", "FAQPage"],
      "name": "Terms and Conditions - Apply4Study",
      "description": "These Terms & Conditions govern your access and use of Apply4Study's learning platform and services.",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the terms of using Apply4Study?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "By using Apply4Study, you agree to comply with our platform guidelines, payment policies, and community standards."
          }
        },
        {
          "@type": "Question",
          "name": "Can I cancel my account anytime?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can cancel your account anytime by contacting our support team. Refunds depend on the selected plan and payment method."
          }
        },
        {
          "@type": "Question",
          "name": "Does Apply4Study update its terms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We may update these terms periodically to reflect new features, services, or legal requirements."
          }
        }
      ]
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "terms-conditions-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative col-lg-6 col-md-6 col-12", children: [
      /* @__PURE__ */ jsx("h1", { children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("p", { children: "Understand the Rules of Using Apply4Study" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Terms & Conditions" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section light-background py-5", children: /* @__PURE__ */ jsxs("div", { className: "container", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsxs("p", { className: "lead", children: [
        "Welcome to ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ". By accessing or using our website, mobile app, or any associated services, you agree to the following Terms and Conditions. Please read them carefully before proceeding."
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "1. Acceptance of Terms" }),
      /* @__PURE__ */ jsx("p", { children: "By registering or using Apply4Study, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, along with our Privacy Policy, Refund Policy, and any additional guidelines posted on our platform." }),
      /* @__PURE__ */ jsx("h5", { children: "2. User Accounts" }),
      /* @__PURE__ */ jsx("p", { children: "To access specific features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and all activities under your account." }),
      /* @__PURE__ */ jsx("h5", { children: "3. Payment & Subscription" }),
      /* @__PURE__ */ jsx("p", { children: "Apply4Study offers various subscription plans for students and educators. By purchasing a plan, you agree to provide accurate billing details and authorize Apply4Study (and its partners like Razorpay, Paytm, or Stripe) to charge your account as per your selected plan." }),
      /* @__PURE__ */ jsx("h5", { children: "4. Cancellation & Refunds" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Refund requests are processed according to our",
        " ",
        /* @__PURE__ */ jsx("a", { href: `${APP_URL}/refund-policy`, children: "Cancellation & Refund Policy" }),
        ". You may cancel your subscription anytime from your dashboard."
      ] }),
      /* @__PURE__ */ jsx("h5", { children: "5. Intellectual Property Rights" }),
      /* @__PURE__ */ jsx("p", { children: "All content, trademarks, and digital assets on Apply4Study remain the intellectual property of their respective owners. Users may not reproduce, modify, or distribute platform content without prior consent." }),
      /* @__PURE__ */ jsx("h5", { children: "6. Limitation of Liability" }),
      /* @__PURE__ */ jsx("p", { children: "Apply4Study is not liable for any indirect, incidental, or consequential damages arising from the use of our services. We make reasonable efforts to ensure platform accuracy but do not guarantee uninterrupted access." }),
      /* @__PURE__ */ jsx("h5", { children: "7. Updates to These Terms" }),
      /* @__PURE__ */ jsx("p", { children: "These Terms may be updated periodically. Continued use of Apply4Study after updates constitutes your acceptance of the revised terms. Last updated: October 14, 2025." }),
      /* @__PURE__ */ jsx("h5", { children: "8. Contact Us" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For questions or clarifications, reach out at",
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
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/privacy-policy`, children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/shipping-policy`, children: "Shipping Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/refund-policy`, children: "Cancellation & Refund Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `${APP_URL}/contact`, children: "Contact Us" }) })
        ] })
      ] })
    ] }) })
  ] });
}
const documentProps = {
  title: "TermsConditions | Apply4Study",
  description: "TermsConditions page"
};
function Page() {
  return /* @__PURE__ */ jsx(TermsConditions, {});
}
export {
  Page,
  documentProps
};
