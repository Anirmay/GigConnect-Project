import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        {/* The Outlet component renders the current page (e.g., HomePage) */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
