import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.scss';
import logo from '../../assets/img/apply4study_logo.png';
import LazyImage from '../common/LazyImage';

export default function Footer() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
  };
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
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href=""><i className="bi bi-twitter-x"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
                <a href=""><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul className='nav flex-column'>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
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
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </footer>
      <div className='text-center bg-dark text-white py-3'>
        <p>&copy; {new Date().getFullYear()} Apply4Study. All rights reserved.</p>
        <nav>
          <ul className={`${styles.footerNav} d-flex justify-content-center list-unstyled m-0 p-0`}>
            {['Terms & condition', 'Privacy & policy'].map((path) => (
              <li key={path} className="mx-2">
                <Link
                  to={path === 'home' ? '/' : `/${path}`}
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


