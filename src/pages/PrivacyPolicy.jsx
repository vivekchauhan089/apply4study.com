import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../hooks/useSEO";

export default function PrivacyPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Privacy Policy — Apply4Study",
    description:
      "Learn how Apply4Study protects your privacy and personal information while delivering secure and trusted online learning experiences.",
    canonical: `${APP_URL}/privacy-policy`,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - Apply4Study",
      "description":
        "Apply4Study respects your privacy and ensures transparency in how your personal data is collected and used.",
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      }
    }
  });

  return (
    <div className="privacy-policy-page">
      {/* Page Title */}
      <div className="page-title dark-background">
        <div className="container position-relative col-lg-6 col-md-6 col-12">
          <h1>Privacy Policy</h1>
          <p>Your Privacy Matters to Us</p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href={APP_URL}>Home</a></li>
              <li className="current">Privacy Policy</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section light-background">
        <div className="container" data-aos="fade-up">
          <p>
            <strong>Apply4Study</strong> values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, mobile application, and services.
          </p>

          <h5>1. Information We Collect</h5>
          <p>
            We collect information you provide directly (e.g., name, email, phone,
            academic details), as well as data automatically gathered through
            analytics tools, cookies, and third-party integrations such as Razorpay
            for secure payments.
          </p>

          <h5>2. How We Use Your Information</h5>
          <p>
            We use your data to:
            <ul>
              <li>Provide and personalize learning services</li>
              <li>Process secure payments via Razorpay</li>
              <li>Send updates, newsletters, and support messages</li>
              <li>Improve user experience through analytics</li>
            </ul>
          </p>

          <h5>3. Data Security</h5>
          <p>
            We use SSL encryption, secure databases, and PCI-DSS-compliant payment
            processing via Razorpay to safeguard all personal and financial data.
          </p>

          <h5>4. Cookies & Tracking</h5>
          <p>
            Our platform uses cookies to improve site functionality and user
            experience. You can modify cookie preferences via your browser settings.
          </p>

          <h5>5. Sharing of Information</h5>
          <p>
            We never sell or rent your data. Information may only be shared with:
            <ul>
              <li>Authorized service providers (e.g., Razorpay, AWS, SendGrid)</li>
              <li>Legal authorities, if required by law</li>
            </ul>
          </p>

          <h5>6. Your Rights</h5>
          <p>
            You have the right to access, update, or delete your personal data.
            Contact{" "}
            <a href="mailto:privacy@apply4study.com">privacy@apply4study.com</a> for
            assistance.
          </p>

          <h5>7. Updates to This Policy</h5>
          <p>
            This policy may be updated periodically. Changes will be reflected on
            this page with the revised effective date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For privacy-related questions, contact us at:<br />
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
