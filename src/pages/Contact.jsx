import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LazyImage from "../components/common/LazyImage";
import contactImg from "../assets/img/about.jpg";
import useSEO from "../hooks/useSEO";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [validated, setValidated] = useState(false);
  const [IsMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    content: '',
    recaptcha: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const APP_URL = process.env.REACT_APP_URL;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.content.trim()) newErrors.content = 'Message is required';
    if (!formData.name.trim()) {
      newErrors.nameClass = 'is-invalid';
      newErrors.nameMsgClass = 'invalid-feedback';
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.emailClass = 'is-invalid';
      newErrors.emailMsgClass = 'invalid-feedback';
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailClass = 'is-invalid';
      newErrors.emailMsgClass = 'invalid-feedback';
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobile) {
      newErrors.mobileClass = 'is-invalid';
      newErrors.mobileMsgClass = 'invalid-feedback';
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobileClass = 'is-invalid';
      newErrors.mobileMsgClass = 'invalid-feedback';
      newErrors.mobile = 'Mobile must be a 10 digit number';
    }
    if (!formData.subject) {
      newErrors.subjectClass = 'is-invalid';
      newErrors.subjectMsgClass = 'invalid-feedback';
      newErrors.subject = 'Subject is required';
    }
    if (!formData.content) {
      newErrors.contentClass = 'is-invalid';
      newErrors.contentMsgClass = 'invalid-feedback';
      newErrors.content = 'Message is required';
    } 

    return newErrors;
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setErrors({});
      setValidated(true);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
          },
          body: JSON.stringify({
            name: formData.name,
            contact: formData.email,
            mobile:  formData.mobile,
            subject: formData.subject,
            content: formData.content,
            type:    "contact",
            recaptcha: token,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Subscribed successfully!");
          setFormData({
            name: "",
            email: "",
            mobile: "",
            subject: "",
            content: "",
            token: "",
          });
        } else {
          setMessage(data.message || "You are already subscribed.");
        }
      } catch (error) {
        console.error("Subscription error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // 🕒 Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
    description: "Have questions or need support? Contact Apply4Study for online learning assistance, business inquiries, or partnership opportunities.",
    canonical: `${APP_URL}/contact`,
    schema: {
      "datePublished": "2025-10-01",
      "dateModified": new Date().toISOString().split("T")[0],
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
          "https://www.x.com/apply4study",
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2833.2439050208177!2d77.11876935397093!3d28.550038263090855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c6bceebb54f%3A0xc96f5b857b627282!2sWorldmark%201%2C%20Aerocity%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1760641410781!5m2!1sen!2sin"
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
                      <strong>Address:</strong> Unit 307 Worldmark 1, Aerocity, New Delhi 110037
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
                    <a href="https://x.com/apply4study" className="me-3"><i className="bi bi-twitter-x"></i></a>
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
                <form noValidate validated={validated.toString()} onSubmit={handleContactFormSubmit}>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className={"form-control " + errors.nameClass}
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className={errors.nameMsgClass}>{errors.name}</div>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className={"form-control " + errors.emailClass}
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <div className={errors.emailMsgClass}>{errors.email}</div>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className={"form-control " + errors.mobileClass}
                        name="mobile"
                        maxLength="10"
                        placeholder="Your Mobile"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                      <div className={errors.mobileMsgClass}>{errors.mobile}</div>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className={"form-control " + errors.subjectClass}
                        name="subject"
                        placeholder="Subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <div className={errors.subjectMsgClass}>{errors.subject}</div>
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className={"form-control " + errors.contentClass}
                        name="content"
                        rows="6"
                        placeholder="Your Message"
                        required
                        value={formData.content}
                        onChange={handleChange}
                      >{formData.content}</textarea>
                      <div className={errors.contentMsgClass}>{errors.content}</div>
                    </div>

                    <div className="col-md-12">
                      {/* Google reCAPTCHA */}
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={(value) => setToken(value)}
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4 py-2"
                        disabled={!token}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
                {message && (
                  <p style={{ marginTop: "8px", color: "#FD7311", fontSize: "0.8rem" }}>
                    {message}{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
