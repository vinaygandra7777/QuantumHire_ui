import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar'; // Assuming Sidebar handles its content

const DashboardLayout = ({ children }) => {
  // Define the width of the sidebar using a Tailwind class
  // Ensure your Sidebar component is styled to respect this width
  const sidebarWidthClass = 'w-64'; // Example: 16rem width

  // Define the height of the header using a Tailwind spacing scale
  // This helps position elements correctly below the header
  const headerHeightClass = 'h-16'; // Example: Adjust based on your header's actual height (p-4 might be around 8 units, let's use 16 for clarity/consistency with original pt-16)
  const headerPaddingTopClass = 'pt-16'; // Match this padding on content below header

  return (
    // Outer container - fills the screen height, base background color
    // We don't need flex-col here as header/sidebar/main will be positioned relative to viewport or each other
    <div className="min-h-screen bg-brand-dark text-white">
       {/* Sidebar */}
       {/* Positioned fixed to the left, below the header, full height remaining */}
       {/* Add overflow-y-auto so sidebar content can scroll if it's too long */}
       <div className={`fixed top-16 bottom-0 left-0 ${sidebarWidthClass} overflow-y-auto bg-brand-gray-extradark z-30`}>
         <Sidebar/> {/* Your Sidebar component goes here */}
       </div>

       {/* Main Content Area */}
       {/* This main area needs to:
           1. Be pushed to the right to make space for the fixed sidebar (ml-64)
           2. Have padding at the top to clear the fixed header (pt-16)
           3. Allow its own content to scroll (overflow-y-auto)
           4. Take up the remaining horizontal space (achieved implicitly by ml-* on flex-1 or block)
       */}
       <main className={`p-6 md:p-10 overflow-y-auto bg-brand-dark ${headerPaddingTopClass} ${sidebarWidthClass === 'w-64' ? 'ml-64' : ''}`}
             style={{ height: `calc(100vh - ${headerHeightClass.replace('h-', '') * 0.25}rem)` }}>
           {/* Using style height calc to ensure main content takes the exact height below header for proper scrolling within this div */}
           {children} {/* The page-specific content (Resume Analysis, UploadArea, etc.) */}
       </main>
    </div>
  );
};

export default DashboardLayout;