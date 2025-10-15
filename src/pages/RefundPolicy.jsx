import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../hooks/useSEO";

export default function RefundPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Cancellation & Refund Policy — Apply4Study",
    description:
      "Read Apply4Study’s cancellation and refund policy for payments made via Razorpay. Understand eligibility, refund timelines, and support process.",
    canonical: `${APP_URL}/cancellation-refund-policy`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cancellation & Refund Policy - Apply4Study",
      "description":
        "Apply4Study’s policy describing refund eligibility and cancellation procedures for Razorpay transactions.",
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

  return (
    <div className="refund-policy-page">
      {/* Page Title */}
      <div className="page-title dark-background">
        <div className="container position-relative col-lg-6 col-md-6 col-12">
          <h1>Cancellation & Refund Policy</h1>
          <p>Your Privacy Matters to Us</p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href={APP_URL}>Home</a></li>
              <li className="current">Refund Policy</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section light-background">
        <div className="container" data-aos="fade-up">
          <p>
            At <strong>Apply4Study</strong>, we aim to provide valuable learning experiences. As our services are digital and subscription-based, our refund and cancellation terms comply with standard digital servicepractices and Razorpay policies.
          </p>

          <h5 className="mt-4">1. Cancellation Policy</h5>
          <p>
            - You may cancel your subscription plan at any time from your account
            dashboard. <br />
            - Cancellations stop auto-renewal of your plan but do not generate a
            refund for the current billing period.  
            - Once a course or plan is activated, it remains accessible until the
            end of your billing cycle.
          </p>

          <h5 className="mt-4">2. Refund Policy</h5>
          <p>
            - Refunds are not applicable once a digital plan or course has been
            activated. <br />
            - In case of duplicate payment, technical error, or unauthorized
            transaction, please email{" "}
            <a href="mailto:support@apply4study.com">support@apply4study.com</a>{" "}
            within <strong>7 days</strong> of the transaction with payment details.{" "}
            <br />
            - Approved refunds (if any) are processed within{" "}
            <strong>7–10 business days</strong> via Razorpay or the original payment
            method.
          </p>

          <h5 className="mt-4">3. Payment Disputes</h5>
          <p>
            - If you notice any discrepancies in payment, please contact our support
            before raising a dispute with Razorpay.  
            - We’ll ensure a transparent resolution process for all genuine cases.
          </p>

          <h5 className="mt-4">4. Contact for Refund Queries</h5>
          <p>
            For assistance related to cancellations or refunds, please contact our
            support team at{" "}
            <a href="mailto:support@apply4study.com">support@apply4study.com</a>.
          </p>

          <p className="mt-5 text-muted">
            <em>Last updated: October 2025</em>
          </p>
        </div>
      </section>
    </div>
  );
}
