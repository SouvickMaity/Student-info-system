import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="layout-body">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        
        <main className="main-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
