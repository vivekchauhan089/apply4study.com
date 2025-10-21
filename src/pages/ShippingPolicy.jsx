import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "../hooks/useSEO.jsx";

export default function ShippingPolicy() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
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
      "dateModified": new Date().toISOString().split("T")[0],
      "publisher": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": APP_URL,
        "logo": `${APP_URL}/assets/logo.png`
      }
    }
  });

  return (
    <div className="shipping-policy-page">
      {/* Page Title */}
      <div className="page-title dark-background">
        <div className="container position-relative col-lg-6 col-md-6 col-12">
          <h1>Shipping & Delivery Policy</h1>
          <p>Your Privacy Matters to Us</p>
          <nav className="breadcrumbs">
            <ol>
              <li><a href={APP_URL}>Home</a></li>
              <li className="current">Shipping Policy</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section light-background">
        <div className="container" data-aos="fade-up">
          <p>
            At <strong>Apply4Study</strong>, all our services, subscriptions, and
            learning materials are delivered digitally. There is no physical
            shipping involved for any of our plans or courses.
          </p>

          <h5 className="mt-4">Digital Delivery</h5>
          <p>
            Once a successful payment is completed through Razorpay, you will
            receive immediate access to your selected course or subscription plan
            through your registered email address and dashboard. Please ensure your
            account details are accurate to avoid delays.
          </p>

          <h5 className="mt-4">Delivery Timelines</h5>
          <p>
            - Access is generally activated instantly after payment confirmation. <br />
            - In rare cases (e.g., technical issues or payment gateway delays),
            access may take up to <strong>24 hours</strong>.  
            If your course or plan access isn’t available after 24 hours, please
            contact our support team at{" "}
            <a href="mailto:support@apply4study.com">support@apply4study.com</a>.
          </p>

          <h5 className="mt-4">Contact for Assistance</h5>
          <p>
            For any questions or concerns regarding digital delivery, please reach
            out to our support team. We’ll be happy to help ensure you get access as
            soon as possible.
          </p>

          <p className="mt-5 text-muted">
            <em>Last updated: October 2025</em>
          </p>

          <hr className="my-4" />
          
          <div className="related-links mt-4">
            <h5>Related Policies</h5>
            <ul>
              <li><a href={`${APP_URL}/privacy-policy`}>Privacy Policy</a></li>
              <li><a href={`${APP_URL}/terms-conditions`}>Terms & Conditions</a></li>
              <li><a href={`${APP_URL}/refund-policy`}>Cancellation & Refund Policy</a></li>
              <li><a href={`${APP_URL}/contact`}>Contact Us</a></li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
