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
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Apply4Study</strong>, you agree to comply with these Terms &
            Conditions. If you do not agree, please discontinue using the platform.
          </p>

          <h2>2. Use of Our Services</h2>
          <ul>
            <li>You must be at least 13 years old to use Apply4Study.</li>
            <li>You agree not to misuse the platform or engage in fraudulent activities.</li>
            <li>All information provided during registration must be accurate and up to date.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All course materials, graphics, and logos on Apply4Study are protected by copyright and intellectual property
            laws. You may not copy, reproduce, or redistribute our content without prior permission.
          </p>

          <h2>4. Payments and Refunds</h2>
          <p>
            Fees for paid courses or subscriptions must be paid in advance. Refunds are subject to course-specific terms,
            which will be clearly mentioned at the time of purchase.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            Apply4Study will not be liable for any direct or indirect damages arising from the use of our platform,
            including technical errors or interruptions.
          </p>

          <h2>6. Account Suspension</h2>
          <p>
            We reserve the right to suspend or terminate user accounts found violating our policies or engaging in
            inappropriate conduct.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed under the laws of India. Any disputes will be subject to the
            jurisdiction of New Delhi courts.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For any concerns about these Terms, please contact:<br />
            <strong>Email:</strong> support@apply4study.com<br />
            <strong>Address:</strong> A-108 Worldmark-2, Aerocity, New Delhi 110037, India
          </p>
        </div>
      </section>
    </div>
  );
}
