import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import ThemeToggle from '../components/common/ThemeToggle.jsx';


const Layout = () => (
  <div className='app-container'>
    <Header />
    {/* <ThemeToggle /> */}
    <main className='main-content mt-4'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;