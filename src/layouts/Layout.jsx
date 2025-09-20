import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ThemeToggle from '../components/common/ThemeToggle';


const Layout = () => (
  <div className='app-container'>
    <Header />
    {/* <ThemeToggle /> */}
    <main className='main-content'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;