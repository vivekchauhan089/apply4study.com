import { useState, useEffect } from "react";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import AOS from "aos";
/* empty css                       */
import { Modal, Button } from "react-bootstrap";
import { u as useSEO } from "../chunks/chunk-C9YAkDoO.js";
import { N as Newsletter } from "../chunks/chunk-C070Suwd.js";
/*! src/assets/img/payments/paypal.png [vike:pluginModuleBanner] */
const paypalLogo = "data:image/png;base64,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";
/*! src/assets/img/payments/stripe.png [vike:pluginModuleBanner] */
const stripeLogo = "/assets/static/stripe.Chh-eKZo.png";
/*! src/components/Modal/PaymentModal.jsx [vike:pluginModuleBanner] */
const PaymentModal = ({ show, onHide, plan }) => {
  const [selectedGateway, setSelectedGateway] = useState(null);
  process.env.REACT_APP_URL;
  const paymentMethods = [
    { id: "razorpay", name: "Razorpay", logo: "./razorpay.svg" },
    { id: "paytm", name: "Paytm", logo: "./paytm.svg" },
    { id: "paypal", name: "PayPal", logo: paypalLogo },
    { id: "stripe", name: "Stripe", logo: stripeLogo }
  ];
  const handleProceed = async () => {
    if (!selectedGateway) return alert("Please select a payment method.");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: plan.id,
          plan_name: plan.name,
          amount: plan.price,
          gateway: selectedGateway,
          user_id: localStorage.getItem("user_id") || "68ee304335de1390e819b82e"
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment initiation failed");
      if (selectedGateway === "razorpay") {
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: "Apply4Study",
          description: plan.name,
          order_id: data.order_id,
          handler: async (paymentResponse) => {
            await fetch(`${process.env.REACT_APP_API_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                gateway: selectedGateway,
                plan_id: plan.id,
                user_id: localStorage.getItem("user_id") || "68ee304335de1390e819b82e",
                ...paymentResponse
              })
            });
            alert("✅ Payment successful!");
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (selectedGateway === "paytm") {
        window.location.href = data.redirect_url;
      } else if (selectedGateway === "paypal") {
        window.open(data.redirect_url, "_blank");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxs(Modal, { show, onHide, centered: true, className: "payment-modal", children: [
    /* @__PURE__ */ jsx(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsx(Modal.Title, { children: "Choose Payment Method" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx("div", { className: "d-flex flex-wrap grid grid-cols-2 gap-4", children: paymentMethods.map((m) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `payment-option ${selectedGateway === m.id ? "active" : ""}`,
        onClick: () => setSelectedGateway(m.id),
        style: {
          cursor: "pointer",
          border: selectedGateway === m.id ? "2px solid #007bff" : "1px solid #ccc",
          borderRadius: "12px",
          padding: "15px",
          width: "130px",
          textAlign: "center",
          transition: "0.3s"
        },
        children: [
          /* @__PURE__ */ jsx("img", { src: m.logo, alt: m.name, style: { height: `${m.id == "razorpay" || m.id == "paytm" ? "20" : "40"}px` } }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 mb-0", style: { fontSize: "0.9rem" }, children: m.name })
        ]
      },
      m.id
    )) }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: onHide, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: handleProceed, children: "Proceed to Pay" })
    ] })
  ] });
};
/*! src/components/PricePlan/PricePlan.jsx [vike:pluginModuleBanner] */
const PricePlan = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/plan/fetchall`);
        const data = await res.json();
        if (data.success) setPlans(data.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };
    fetchPlans();
  }, []);
  const handleBuyNow = async (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };
  return /* @__PURE__ */ jsxs("section", { className: "pricing section light-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-title", "data-aos": "fade-up", children: [
        /* @__PURE__ */ jsx("h5", { children: "Choose Your Plan" }),
        /* @__PURE__ */ jsx("p", { children: "We offer a variety of plans to suit your learning needs. Explore our options and find the perfect fit for you." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Explore our platform with a ",
          /* @__PURE__ */ jsx("strong", { children: "7-day free trial" }),
          " — no credit card required!"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-5 tabs", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn theme-btn mx-2 ${activeTab === "student" ? "active" : ""}`,
            onClick: () => setActiveTab("student"),
            children: "For Students"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `btn theme-btn mx-2 ${activeTab === "teacher" ? "active" : ""}`,
            onClick: () => setActiveTab("teacher"),
            children: "For Teachers"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mt-3", children: [
        activeTab === "student" && /* @__PURE__ */ jsx(Fragment, { children: plans.map((plan) => /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "pricing-item", children: [
          /* @__PURE__ */ jsx("h3", { children: plan.name }),
          /* @__PURE__ */ jsxs("h4", { children: [
            /* @__PURE__ */ jsx("sup", { children: "₹" }),
            plan.price,
            /* @__PURE__ */ jsx("span", { children: "/month" })
          ] }),
          /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx("span", { className: "na", children: "Perfect for exploring" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-description", children: "Get started with essential learning tools at no cost." }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
              " Access to selected free courses"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
              " Join live webinars & demo classes"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
              " Personalized learner dashboard"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
              " Progress tracking tools"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "na", children: [
              /* @__PURE__ */ jsx("i", { className: "bi bi-check2" }),
              " ",
              /* @__PURE__ */ jsx("span", { children: "No certificates or full course access" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "buy-btn",
              onClick: () => handleBuyNow(plan),
              children: "Buy Now"
            }
          )
        ] }) })) }),
        activeTab === "teacher" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "pricing-item", children: [
            /* @__PURE__ */ jsx("h3", { children: "🧑‍🏫 Basic Educator" }),
            /* @__PURE__ */ jsxs("h4", { children: [
              /* @__PURE__ */ jsx("sup", { children: "₹" }),
              "299",
              /* @__PURE__ */ jsx("span", { children: "/month" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Create and publish up to 5 courses"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Access to educator dashboard"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " View learner analytics"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Email support"
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "buy-btn", children: "Buy Now" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-lg-4 featured", children: /* @__PURE__ */ jsxs("div", { className: "pricing-item", children: [
            /* @__PURE__ */ jsx("h3", { children: "💼 Starter Plan" }),
            /* @__PURE__ */ jsxs("h4", { children: [
              /* @__PURE__ */ jsx("sup", { children: "₹" }),
              "499",
              /* @__PURE__ */ jsx("span", { children: "/month" })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "mb-0", children: /* @__PURE__ */ jsx("span", { children: "Ideal for beginners & students" }) }),
            /* @__PURE__ */ jsx("h6", { className: "mb-0", children: "Build strong foundations with structured learning." }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Full access to academic & skill courses"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Interactive video lessons & notes"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Live class access (limited sessions)"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Basic quizzes & assignments"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Monthly progress report"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Certificate of completion"
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "buy-btn", children: "Buy Now" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "pricing-item", children: [
            /* @__PURE__ */ jsx("h3", { children: "🌟 Pro Educator" }),
            /* @__PURE__ */ jsxs("h4", { children: [
              /* @__PURE__ */ jsx("sup", { children: "₹" }),
              "799",
              /* @__PURE__ */ jsx("span", { children: "/month" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Unlimited course publishing"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Access to live session tools"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Priority support"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Detailed engagement analytics"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "bi bi-check2-all" }),
                " Monetize your content"
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "buy-btn", children: "Buy Now" })
          ] }) })
        ] })
      ] })
    ] }),
    selectedPlan && /* @__PURE__ */ jsx(
      PaymentModal,
      {
        show: showPaymentModal,
        onHide: () => setShowPaymentModal(false),
        plan: selectedPlan
      }
    )
  ] });
};
/*! src/pages/Price.jsx [vike:pluginModuleBanner] */
function Price() {
  useEffect(() => {
    AOS.init({ duration: 1e3 });
  }, []);
  const APP_URL = process.env.REACT_APP_URL;
  useSEO({
    title: "Pricing Plans — Apply4Study",
    description: "Choose from affordable pricing plans for online courses and e-learning services at Apply4Study.",
    canonical: `${APP_URL}/pricing`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Apply4Study Course Subscription",
      "datePublished": "2025-10-01",
      "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      "price": "4999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${APP_URL}/pricing`,
      "eligibleRegion": {
        "@type": "Country",
        "name": "India"
      },
      "seller": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": `${APP_URL}`
      }
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "price-page", children: [
    /* @__PURE__ */ jsx("div", { className: "page-title dark-background pricing_bg", children: /* @__PURE__ */ jsxs("div", { className: "container position-relative", children: [
      /* @__PURE__ */ jsx("h1", { children: "Our Pricing" }),
      /* @__PURE__ */ jsx("nav", { className: "breadcrumbs", children: /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: APP_URL, children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "current", children: "Price" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container section-title", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h5", { children: " Learn More. Pay Less. Choose What Fits You Best." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At ",
        /* @__PURE__ */ jsx("strong", { children: "Apply4Study" }),
        ", we believe in making quality education affordable and flexible. Whether you're just getting started or ready to go all in, we have a plan that matches your goals — and your budget."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PricePlan, {}),
    /* @__PURE__ */ jsx("section", { className: "stats section mb-3", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: "🔒 No Hidden Fees. Cancel Anytime." }),
      /* @__PURE__ */ jsx("p", { children: "We offer secure payments, flexible billing, and the freedom to pause or cancel your subscription anytime." }),
      /* @__PURE__ */ jsx("p", { children: "We offer custom plans with admin dashboards, group analytics, and teacher tools." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "📧 Email us at ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:blog@apply4study.com",
            title: " blog@apply4study.com",
            children: "blog@apply4study.com"
          }
        ),
        " to pitch your idea!"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "stats section mb-3 light-background", children: /* @__PURE__ */ jsxs("div", { className: "container section-title col-lg-6 col-md-6 col-12 pb-0", "data-aos": "fade-up", children: [
      /* @__PURE__ */ jsx("h3", { children: "🎓 Special Plans for Schools & Groups" }),
      /* @__PURE__ */ jsx("p", { children: "Are you a school, institution, or learning center?" }),
      /* @__PURE__ */ jsx("p", { children: "We offer custom plans with admin dashboards, group analytics, and teacher tools." }),
      /* @__PURE__ */ jsx("p", { className: "my-3", children: /* @__PURE__ */ jsxs("strong", { children: [
        "📧 Email us at ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:blog@apply4study.com",
            title: " blog@apply4study.com",
            children: "blog@apply4study.com"
          }
        ),
        " to pitch your idea!"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Newsletter, {})
  ] }) });
}
/*! pages/Price.page.jsx [vike:pluginModuleBanner] */
const route = "/price";
const documentProps = {
  title: {
    default: "Price",
    template: "%s — Apply4Study",
    config: {}
  },
  description: {
    default: "Price page",
    config: {}
  }
};
const Price_page = {
  Page: Price,
  route,
  documentProps
};
export {
  Price_page as default,
  documentProps,
  route
};
