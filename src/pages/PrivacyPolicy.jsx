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
          <h2>1. Introduction</h2>
          <p>
            At <strong>Apply4Study</strong>, we value your trust. This Privacy Policy explains how we
            collect, use, and protect your personal information when you access our website or online learning platform.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect information you provide directly such as your name, email address,
            phone number, and course preferences. We also collect limited technical data such as IP address and device
            details to improve our services.
          </p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To create and manage your Apply4Study account.</li>
            <li>To deliver courses, live sessions, and personalized content.</li>
            <li>To communicate important updates or offers.</li>
            <li>To enhance website functionality and user experience.</li>
          </ul>

          <h2>4. Data Protection & Security</h2>
          <p>
            We implement appropriate technical and organizational measures to safeguard your data against unauthorized
            access, alteration, or disclosure. Your personal data is processed in accordance with applicable data
            protection laws.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We may use trusted third-party tools for analytics, payments, or email services. These partners comply with
            privacy standards and handle data only for agreed purposes.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, modify, or delete your personal data. You can also withdraw consent for
            communications anytime by contacting{" "}
            <a href="mailto:support@apply4study.com">support@apply4study.com</a>.
          </p>

          <h2>7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. The latest version will always be available on this page with
            the revised effective date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For privacy-related questions, contact us at:<br />
            <strong>Email:</strong> support@apply4study.com<br />
            <strong>Address:</strong> A-108 Worldmark-2, Aerocity, New Delhi 110037, India
          </p>
        </div>
      </section>
    </div>
  );
}
