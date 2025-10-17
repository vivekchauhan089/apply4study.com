import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.scss';
import logo from '../../assets/img/apply4study_logo.png';
import LazyImage from '../common/LazyImage';
import SearchResults from '../../pages/SearchResults';
import Modals from '../Modal/Modal.jsx';
import { Button } from 'react-bootstrap';

const navLinks = [
  { path: './', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/courses', label: 'Courses' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/blog', label: 'Blog' },
  { path: '/partners', label: 'Partners' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/get-started', label: 'Get Started' }, 
  // { path: '/join', label: 'Join Us' },
];

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('register');

  const handleOpenModal = (type) => {
    setModalType(type);      
    setModalShow(true); 
  };


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

  useEffect(() => {
    const toggleScrolled = () => {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader) return;

      const hasStickyClass =
        selectHeader.classList.contains('scroll-up-sticky') ||
        selectHeader.classList.contains('sticky-top') ||
        selectHeader.classList.contains('fixed-top');

      if (!hasStickyClass) return;

      if (window.scrollY > 100) {
        selectBody.classList.add('scrolled');
      } else {
        selectBody.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', toggleScrolled);
    toggleScrolled();

    return () => {
      window.removeEventListener('scroll', toggleScrolled);
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToggle() {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn?.classList.toggle('bi-list');
      mobileNavToggleBtn?.classList.toggle('bi-x');
    }

    mobileNavToggleBtn?.addEventListener('click', mobileNavToggle);

    const navLinks = document.querySelectorAll('#navmenu a');
    navLinks.forEach(link =>
      link.addEventListener('click', () => {
        if (body.classList.contains('mobile-nav-active')) {
          mobileNavToggle();
        }
      })
    );

    const dropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling?.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    return () => {
      mobileNavToggleBtn?.removeEventListener('click', mobileNavToggle);
      navLinks.forEach(link =>
        link.removeEventListener('click', mobileNavToggle)
      );
      dropdownToggles.forEach(toggle =>
        toggle.removeEventListener('click', mobileNavToggle)
      );
    };
  }, []);



  return (
    <header id="header" className={`${styles.header} header d-flex align-items-center fixed-top`}>
      <div className="top-info-bar">
        {/* Desktop info bar */}
        {!isMobile && (
        <div className="top-info-container">
          <div className="info-left desktop-only">
            <a href="mailto:info@apply4study.com" className="info-link">
              <i className="bi bi-envelope" aria-hidden="true"></i> info@Apply4study.com
            </a>
            <a href="tel:+919716003265" className="info-link">
              <i className="bi bi-phone" aria-hidden="true"></i> +91-9716003265
            </a>
            <span className="working-hours">Mon — Sat: 9:00 AM – 6:00 PM</span>
          </div>

          <div className="info-right desktop-only">
            <a href="https://www.facebook.com/apply4study" className="social-link" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://x.com/apply4study" className="social-link" aria-label="Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://www.instagram.com/apply4study/" className="social-link" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/apply4study" className="social-link" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://www.pinterest.com/apply4study" className="social-link" aria-label="Pinterest">
              <i className="bi bi-pinterest"></i>
            </a>
          </div>
        </div>
        )}
        {/* Mobile info bar */}
        {isMobile && (
          <div className="mobile-info">
            <a href="mailto:info@apply4study.com" className="info-link">
              <i className="bi bi-envelope"></i> info@Apply4study.com
            </a>
            <div className="social-links">
              <a href="https://www.facebook.com/apply4study" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://x.com/apply4study" className="social-link" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.instagram.com/apply4study" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/apply4study" className="social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://www.pinterest.com/apply4study" className="social-link" aria-label="Pinterest">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="container-fluid container-xl position-relative">
        <div className='d-flex align-items-center justify-content-between w-100'>
          <Link to='/' className={`${styles.logo} logo d-flex align-items-center`}>
            <LazyImage src={logo} alt="logo" className="img-fluid" fetchPriority="high" />
          </Link>
          <nav id="navmenu" className={`${styles.navmenu} navmenu`}>
            <ul>
              {navLinks.map(({ path, label }) => (
                path === "/get-started" && isMobile ? (
                  <li key={label}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? `${styles.active} active nav-link` : 'nav-link'
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ) : (path != "/get-started" && (
                  <li key={label}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? `${styles.active} active nav-link` : 'nav-link'
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))
              ))}              
            </ul>
            <i className="d-xl-none bi bi-list mobile-nav-toggle"></i>

          </nav>
          {!isMobile && (
            <div className='d-flex align-items-center justify-content-start col-lg-2 pt-1'>
              <SearchResults />
              <Link to='/get-started' className="btn ms-2 glossy-button--blue joinBtn py-1">Get Started</Link>
            </div>
          )}
        </div>

        {isMobile && (
          <div className='d-flex align-items-center justify-content-start w-100 pt-1'>
            <SearchResults />
          </div>
        )
        }


        <Button variant="primary" className="getStartedBtn fw-bold" onClick={() => handleOpenModal('register')}>
          Get Started
        </Button>
        <Button variant="primary" className="subscribeBtn fw-bold" onClick={() => handleOpenModal('subscribe')}>
          Subscribe
        </Button>

        <Modals show={modalShow} onHide={() => setModalShow(false)} type={modalType} />
      </div>
    </header>

  );
}