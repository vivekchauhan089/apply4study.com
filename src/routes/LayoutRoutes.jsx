import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout.jsx';

// Pages
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Pricing from '../pages/Price.jsx';
import Services from '../pages/Services.jsx';
import Courses from '../pages/Courses.jsx';
import Blog from '../pages/Blog.jsx';
import BlogDetail from '../pages/BlogDetail.jsx';
import Partners from '../pages/Partners.jsx';
import SearchResults from '../pages/SearchResults.jsx';
import GetStarted from '../pages/GetStarted.jsx';
import Contact from '../pages/Contact.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import TermsConditions from '../pages/TermsConditions.jsx';
import ShippingPolicy from '../pages/ShippingPolicy.jsx';
import RefundPolicy from '../pages/RefundPolicy.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import WebDevelopment from '../pages/services/WebDevelopment.jsx';

// ✅ Styles (safe for prerender)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/global.css';

const LayoutRoutes = ({ skipRedirects }) => {
  // ✅ Load Bootstrap JS only on client-side
  useEffect(() => {
    if (typeof window !== "undefined" && !document?.body?.dataset?.prerendered) {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
        .then(() => {
          console.log('✅ Bootstrap JS loaded');
        })
        .catch((err) => console.error('⚠️ Bootstrap JS load failed:', err));
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='services' element={<Services />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:slug' element={<BlogDetail />} />
        <Route path='courses' element={<Courses />} />
        <Route path='partners' element={<Partners />} />
        <Route path='get-started' element={<GetStarted />} />
        <Route path='contact' element={<Contact />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='terms-conditions' element={<TermsConditions />} />
        <Route path='shipping-policy' element={<ShippingPolicy />} />
        <Route path='refund-policy' element={<RefundPolicy />} />
        <Route path='search' element={<SearchResults />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='services/web-development' element={<WebDevelopment />} />

        {/* SPA fallback */}
        {!skipRedirects && <Route path='*' element={<Home />} />}
      </Route>
    </Routes>
  );
};

export default LayoutRoutes;