import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Pricing from '../pages/Price';
import Services from '../pages/Services';
import Courses from '../pages/Courses';
import Blog from '../pages/Blog';
import Partners from '../pages/Partners';
// import SearchResults from '../pages/SearchResults';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/global.css';
import GetStarted from '../pages/getStarted';
import Contact from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions';
import ShippingPolicy from '../pages/ShippingPolicy';
import RefundPolicy from '../pages/RefundPolicy';

const LayoutRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='services' element={<Services />} />
      <Route path='blog' element={<Blog />} />
      <Route path='courses' element={<Courses />} />
      <Route path='partners' element={<Partners />} />
      <Route path='get-started' element={<GetStarted />} />
      <Route path='contact' element={<Contact />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path='terms-conditions' element={<TermsConditions />} />
      <Route path='shipping-policy' element={<ShippingPolicy />} />
      <Route path='refund-policy' element={<RefundPolicy />} />
      {/* <Route path="/search" element={<SearchResults />} /> */}
    </Route>
  </Routes>
);

export default LayoutRoutes;