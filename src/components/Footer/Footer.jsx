import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.scss';
import logo from '../../assets/img/apply4study_logo.png';
import LazyImage from '../common/LazyImage';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify({ contact: email, type: 'newsletter' }), // field name matches backend
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "You are already subscribed.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

  return (
    <>
      <footer className='footer py-4 position-relative'>


        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to='/' className="logo d-flex align-items-center">
                <LazyImage src={logo} alt="logo" className="img-fluid" loading='lazy' />
              </Link>
              <div className="footer-contact pt-3">
                <p>A-108 Worldmark-2</p>
                <p>Aerocity, New Delhi 110037</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+91 9716003265</span></p>
                <p><strong>Email:</strong> <span>info@Apply4Study.com</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="https://www.facebook.com/apply4study"><i className="bi bi-facebook"></i></a>
                <a href="https://www.twitter.com/apply4study"><i className="bi bi-twitter-x"></i></a>
                <a href="https://www.instagram.com/apply4study"><i className="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/apply4study"><i className="bi bi-linkedin"></i></a>
                <a href="https://www.pinterest.com/apply4study"><i className="bi bi-pinterest"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul className='nav flex-column'>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/service">Services</a></li>
                <li><a href="/terms-conditions">Terms of service</a></li>
                <li><a href="/privacy-policy">Privacy policy</a></li>
                <li><a href="/shipping-policy">Shipping policy</a></li>
                <li><a href="/refund-policy">Refund policy</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul className='nav flex-column'>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Graphic Design</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p className='mb-0'>Subscribe to our newsletter and receive the latest news about our products and services!</p>
              <div className="newsletter-form mt-0 justify-content-start">
                <form className="newsletter-form justify-content-start" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </div>
              {message && (
                <p style={{ marginTop: "8px", color: "#FD7311", fontSize: "0.9rem" }}>
                  {message}
                </p>
              )}
            </div>

          </div>
        </div>

      </footer>
      <div className='text-center bg-dark text-white py-3'>
        <p>&copy; {new Date().getFullYear()} Apply4Study. All rights reserved.</p>
        <nav>
          <ul className={`${styles.footerNav} d-flex justify-content-center list-unstyled m-0 p-0`}>
            {['Terms & Conditions', 'Privacy & Policy'].map((path) => (
              <li key={path} className="mx-2">
                <Link
                  to={path === 'home' ? '/' : `/${path.toLowerCase().replace(' & ', '-')}`}
                  className={`${styles.footerLinks}`}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i
        className="bi bi-arrow-up-short"></i></a>

      {/* <div id="preloader"></div> */}
    </>



  )
};


