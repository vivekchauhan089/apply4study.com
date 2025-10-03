import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PricePlan from '../components/PricePlan/PricePlan';
import useSEO from "../hooks/useSEO";

export default function Price() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useSEO({
    title: "Pricing Plans — Apply4Study",
    description: "Choose from affordable pricing plans for online courses and e-learning services at Apply4Study.",
    canonical: "https://apply4study.com/pricing",
    schema: {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Apply4Study Course Subscription",
      "price": "4999",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://apply4study.com/pricing",
      "eligibleRegion": {
        "@type": "Country",
        "name": "India"
      },
      "seller": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": "https://apply4study.com"
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
            <li><a href="index.html">Home</a></li>
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

    <div className="section">

      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6 col-md-6 col-12" data-aos="slide-up" data-aos-delay="100">
            <div className="container section-title pb-0" data-aos="fade-up">
              <h5>Subscribe to Our Newsletter</h5>
              <p>Get the latest updates, learning tips, and offers delivered straight to your inbox.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12" data-aos="slide-down" data-aos-delay="200">
            <div className="newsletter-form mt-lg-0">
              <form className="newsletter-form mt-lg-0"
                onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
                <input type="email" placeholder="Enter your email" required  />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>

    </>
  );
}