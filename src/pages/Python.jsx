import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LazyImage from '../components/common/LazyImage';
import AvailableCourses from '../components/Courses/AvailableCourses';
import useSEO from "../hooks/useSEO";
import Newsletter from '../components/common/Newsletter';

export default function Courses() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "Full-Stack Web Development Course — Apply4Study",
    description: "Learn full-stack development with Apply4Study’s online course covering React, Node.js, and MongoDB.",
    canonical: `${APP_URL}/courses/fullstack-web-development`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Full-Stack Web Development",
      "description": "Comprehensive full-stack course covering React, Node.js, MongoDB, and deployment best practices.",
      "provider": {
        "@type": "Organization",
        "name": "Apply4Study",
        "sameAs": `${APP_URL}`
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "startDate": "2025-10-15",
        "endDate": "2026-03-15",
        "instructor": {
          "@type": "Person",
          "name": "John Doe"
        },
        "location": {
          "@type": "VirtualLocation",
          "url": `${APP_URL}/classroom`
        },
        "offers": {
          "@type": "Offer",
          "price": "9999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${APP_URL}/courses/fullstack-web-development`
        }
      }
    }
  });

  return (
    <>
    <div className="price-page">
      <div className="page-title dark-background pricing_bg">
        <div className="container position-relative">
          <h1>Enroll Courses</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href={APP_URL}>Home</a></li>
              <li className="current">Courses</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container section-title" data-aos="fade-up">
          <h5> Learn More. Pay Less. Choose What Fits You Best.</h5>
          <p>At <strong>Apply4Study</strong>, we believe in making quality education affordable and flexible. Whether
            you're just getting started or ready to go all in, we have a plan that matches your goals — and your budget.
          </p>
        </div>
      </section>

      <AvailableCourses />


      <section className="stats section mb-3">
        <div className="container section-title col-lg-6 col-md-6 col-12 pb-0" data-aos="fade-up">
          <h3>🔒 No Hidden Fees. Cancel Anytime.</h3>
          <p>We offer secure payments, flexible billing, and the freedom to pause or cancel your subscription anytime.</p>
          <p>We offer custom plans with admin dashboards, group analytics, and teacher tools.</p>
          <p className="my-3"><strong>📧 Email us at <a href="mailto:blog@apply4study.com"
                title=" blog@apply4study.com">blog@apply4study.com</a> to pitch your idea!</strong></p>
        </div>
      </section>

      <section className="stats section mb-3 light-background">
        <div className="container section-title col-lg-6 col-md-6 col-12 pb-0" data-aos="fade-up">
          <h3>🎓 Special Plans for Schools & Groups</h3>
          <p>Are you a school, institution, or learning center?</p>
          <p>We offer custom plans with admin dashboards, group analytics, and teacher tools.</p>
          <p className="my-3"><strong>📧 Email us at <a href="mailto:blog@apply4study.com"
                title=" blog@apply4study.com">blog@apply4study.com</a> to pitch your idea!</strong></p>
        </div>
      </section>

      <Newsletter />
      </div>
    </>
  );
}