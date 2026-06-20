import React from 'react';
import './SidebarLayout.css';

const SidebarLayout = ({ children }) => {
  return (
    <div className="sidebar-layout-container">
      <main className="sidebar-layout-main" role="main">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
