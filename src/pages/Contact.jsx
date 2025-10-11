import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LazyImage from "../components/common/LazyImage";
import contactImg from "../assets/img/about.jpg";
import useSEO from "../hooks/useSEO";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const APP_URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useSEO({
    title: "Contact Apply4Study — Get in Touch",
    description:
      "Have questions or need support? Contact Apply4Study for online learning assistance, business inquiries, or partnership opportunities.",
    canonical: `${APP_URL}/contact`,
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Apply4Study",
        "url": `${APP_URL}/`,
        "logo": `${APP_URL}/assets/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9716003265",
          "email": "support@apply4study.com",
          "contactType": "customer support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://www.facebook.com/apply4study",
          "https://www.twitter.com/apply4study",
          "https://www.instagram.com/apply4study",
          "https://www.linkedin.com/company/apply4study",
          "https://www.pinterest.com/apply4study",
        ]
      }
    },
  });

  return (
    <>
      <div className="contact-page">
        {/* Page Title */}
        <div className="page-title dark-background contact_bg">
          <div className="container position-relative col-lg-6 col-md-6 col-12">
            <h1>Contact Us</h1>
            <p>We’d Love to Hear from You</p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href={APP_URL}>Home</a></li>
                <li className="current">Contact Us</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="contact section light-background">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Get in Touch with Apply4Study</h2>
              <p>
                Have a question about our online courses, classrooms, or partnership
                opportunities? We're here to help! Reach out using the contact form,
                or connect with us through email or phone.
              </p>
            </div>

            <div className="row gy-4 align-items-start">
              {/* Left Side - Contact Image */}
              <div
                className="col-lg-6 col-md-12"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <LazyImage
                  src={contactImg}
                  className="img-fluid rounded-3 shadow-sm w-100"
                  alt="Contact Apply4Study"
                />
              </div>

              {/* Right Side - Info + Map */}
              <div
                className="col-lg-6 col-md-12"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                {/* Google Map */}
                <div
                  className="map-container rounded-3 overflow-hidden shadow-sm"
                  style={{
                    width: "100%",
                    height: "240px",
                    maxHeight: "50vh",
                    border: "2px solid #FD7311" 
                  }}
                >
                  <iframe
                    title="Apply4Study Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.065210785168!2d77.209021175504!3d28.612912175685023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce31c14a22b8f%3A0x3f63b725a2e693c!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="info-box mb-4">
                  <h3>Contact Information</h3>
                  <ul className="list-unstyled">
                    <li>
                      <i className="bi bi-geo-alt"></i>{" "}
                      <strong>Address:</strong> A-108 Worldmark-2, Aerocity, New Delhi 110037
                    </li>
                    <li>
                      <i className="bi bi-telephone"></i>{" "}
                      <strong>Phone:</strong> {" "}
                      <a href="tel:+919716003265">+91-9716003265</a>
                    </li>
                    <li>
                      <i className="bi bi-envelope"></i>{" "}
                      <strong>Email:</strong>{" "}
                      <a href="mailto:support@apply4study.com">support@apply4study.com</a>
                    </li>
                    <li>
                      <i className="bi bi-clock"></i>{" "}
                      <strong>Hours:</strong> Mon–Sat: 9 AM – 6 PM
                    </li>
                  </ul>

                  <div className="social-links mt-3 mb-3">
                    <a href="https://www.facebook.com/apply4study" className="me-3"><i className="bi bi-facebook"></i></a>
                    <a href="https://twitter.com/apply4study" className="me-3"><i className="bi bi-twitter-x"></i></a>
                    <a href="https://www.instagram.com/apply4study" className="me-3"><i className="bi bi-instagram"></i></a>
                    <a href="https://www.linkedin.com/company/apply4study" className="me-3"><i className="bi bi-linkedin"></i></a>
                    <a href="https://www.pinterest.com/apply4study"><i className="bi bi-pinterest"></i></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact-form"
          className="section"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="container">
            <div className="section-title text-center">
              <h2>Send Us a Message</h2>
              <p>We’ll get back to you as soon as possible.</p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <form
                  action="https://formspree.io/f/xzzpqvdk"
                  method="POST"
                  className="php-email-form"
                >
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="6"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4 py-2"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
