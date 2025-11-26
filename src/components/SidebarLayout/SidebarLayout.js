import React from 'react';
import AdSenseWidget from '../AdSenseWidget/AdSenseWidget';
import './SidebarLayout.css';

const SidebarLayout = ({ children }) => {
  return (
    <div className="sidebar-layout-container">
      <main className="sidebar-layout-main">
        {children}
      </main>
      <aside className="sidebar-layout-aside">
        <div className="sidebar-sticky-content">
            <AdSenseWidget />
            {/* You can add more sidebar widgets here in the future */}
        </div>
      </aside>
    </div>
  );
};

export default SidebarLayout;
