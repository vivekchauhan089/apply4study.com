import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PricePlan from '../components/PricePlan/PricePlan.jsx';
import useSEO from "../hooks/useSEO.jsx";
import Newsletter from '../components/common/Newsletter.jsx';

export default function Price() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
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
      "dateModified": new Date().toISOString().split("T")[0],
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

  return (
    <>
    <div className="price-page">
      
    
    <div className="page-title dark-background pricing_bg">
      <div className="container position-relative">
        <h1>Our Pricing</h1>
        <nav className="breadcrumbs">
          <ol>
            <li><a href={APP_URL}>Home</a></li>
            <li className="current">Price</li>
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

    <PricePlan />


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