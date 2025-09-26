import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.scss';
import logo from '../../assets/img/apply4study_logo.png';
import LazyImage from '../common/LazyImage';
import SearchResults from '../../pages/SearchResults';
import Modals from '../Modal/Modal';
import { Button } from 'react-bootstrap';

const navLinks = [
  { path: './', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/Courses', label: 'Courses' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/blog', label: 'Blog' },
  { path: '/partners', label: 'Partners' },
  // { path: '/get-started', label: 'Get Started' }, 
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
      <div className="container-fluid container-xl position-relative">
        <div className='d-flex align-items-center justify-content-between w-100'>
          <Link to='/' className={`${styles.logo} logo d-flex align-items-center`}>
            <LazyImage src={logo} alt="logo" className="img-fluid" loading='lazy' />
          </Link>
          <nav id="navmenu" className={`${styles.navmenu} navmenu`}>
            <ul>
              {navLinks.map(({ path, label }) => (
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
              ))}
            </ul>
            <i className="d-xl-none bi bi-list mobile-nav-toggle"></i>

          </nav>
          {!isMobile && (
            <div className='d-flex align-items-center justify-content-start col-lg-4 pt-2'>
              <SearchResults />
              <Link to='/joinUs' className="btn ms-3 glossy-button--blue joinBtn py-1">Join Us</Link>
            </div>
          )}
        </div>

        {isMobile && (
          <div className='d-flex align-items-center justify-content-start w-100 pt-2'>
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