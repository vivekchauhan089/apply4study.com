import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../hooks/useSEO";

export default function TermsConditions() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Terms & Conditions — Apply4Study",
    description:
      "Review Apply4Study’s Terms & Conditions to understand the rules and responsibilities of using our online learning platform.",
    canonical: `${APP_URL}/terms-conditions`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions - Apply4Study",
      "description":
        "These Terms & Conditions govern your access and use of Apply4Study's learning platform and services.",
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      }
    }
  });

  return (
    <div className="terms-conditions-page">
      {/* Page Title */}
      <div className="page-title dark-background">
        <div className="container position-relative col-lg-6 col-md-6 col-12">
          <h1>Terms & Conditions</h1>
          <p>Understand the Rules of Using Apply4Study</p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href={APP_URL}>Home</a></li>
              <li className="current">Terms & Conditions</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section light-background">
        <div className="container" data-aos="fade-up">
          
          <p>
            Welcome to <strong>Apply4Study</strong>. By using our website and services, you agree to comply with the following terms and conditions. Please read them carefully before registering or making a purchase.
          </p>

          <h5>1. Eligibility</h5>
          <p>
            Users must be at least 13 years old to create an account. By using our
            services, you confirm that all information you provide is accurate and
            current.
          </p>

          <h5>2. Account Responsibility</h5>
          <p>
            You are responsible for maintaining the confidentiality of your login
            credentials and for all activities under your account.
          </p>

          <h5>3. Use of Services</h5>
          <p>
            Our platform is intended solely for educational purposes. Any misuse,
            including sharing of copyrighted material or unauthorized commercial use,
            is strictly prohibited.
          </p>

          <h5>4. Payment Terms</h5>
          <p>
            Payments are securely processed via Razorpay or other supported gateways.
            Once a digital plan is activated, it is non-transferable and
            non-refundable, except as stated in our{" "}
            <a href="/refund-policy">Refund Policy</a>.
          </p>

          <h5>5. Intellectual Property</h5>
          <p>
            All course materials, content, and design are the intellectual property
            of Apply4Study and its partners. Unauthorized copying or redistribution
            is not permitted.
          </p>

          <h5>6. Termination</h5>
          <p>
            We reserve the right to suspend or terminate accounts that violate our
            policies, engage in fraudulent activity, or misuse platform resources.
          </p>

          <h5>7. Governing Law</h5>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            subject to the jurisdiction of the courts in Delhi, India.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For any concerns about these Terms, please contact:<br />
            <strong>Email:</strong> support@apply4study.com<br />
            <strong>Address:</strong> A-108 Worldmark-2, Aerocity, New Delhi 110037, India
          </p>

          <p className="mt-5 text-muted">
            <em>Last updated: October 2025</em>
          </p>

        </div>
      </section>
    </div>
  );
}
