import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Navbar'; // Reuse or create a specific Dashboard Navbar

const DashboardLayout = ({ children }) => {
  return (
    // Use App's base dark background
    <div className="min-h-screen bg-brand-dark flex flex-col">
       {/* You might want a simplified Navbar for the dashboard */}
       {/* <Navbar />  */}
       {/* Or a dedicated Dashboard Header */}
       <header className="bg-brand-gray-extradark border-b border-brand-gray-dark p-4 text-white text-center font-semibold fixed top-0 left-0 right-0 z-40 md:left-64"> {/* Adjust left margin for sidebar */}
         Dashboard Overview
       </header>

       <div className="flex flex-1 pt-16"> {/* Add padding top to avoid overlap with fixed header */}
          <Sidebar />
          {/* Main content area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-brand-dark"> {/* Ensure content scrolls */}
            {children}
          </main>
       </div>
    </div>
  );
};

export default DashboardLayout;