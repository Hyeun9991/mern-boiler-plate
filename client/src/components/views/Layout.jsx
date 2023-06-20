import React from 'react';
import Navbar from './Navbar';
import DarkModeToggle from '../DarkModeToggle';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <DarkModeToggle />
      <main className="h-screen bg-blue-100">{children}</main>
    </>
  );
};

export default Layout;
