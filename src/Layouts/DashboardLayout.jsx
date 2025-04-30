import React from 'react';
// Removed: import Sidebar from '../components/Dashboard/Sidebar';

const DashboardLayout = ({ children }) => {
  // sidebarWidthClass is no longer needed as there's no sidebar
  // const sidebarWidthClass = 'w-30'; // Removed

  // headerHeightClass is still relevant for calculating top padding
  const headerHeightClass = 'h-16'; // Navbar height is 16 (4rem)
  const headerPaddingTopClass = 'pt-16'; // Match this padding on content below header

  return (
    // Outer container - fills the screen height, pure black background
    // The min-h-screen here is crucial for ensuring the page takes at least the full viewport height
    <div className="min-h-screen bg-brand-black text-white"> {/* Changed bg-brand-dark to bg-brand-black */}
       {/* Navbar is expected to be rendered elsewhere, likely fixed at the top,
           or you could add it here if it's part of *this* layout,
           but based on App.jsx structure, it's part of the LandingPageLayout
           and DashboardLayout implicitly assumes it's there (hence pt-16).
           Assuming Navbar is handled at the root or App.jsx level.
           If Navbar should be part of this layout, add it here:
           <Navbar />
       */}

       {/* Main Content Area */}
       {/* Removed ml- classes */}
       {/* Removed overflow-y-auto from this main tag - let children control scrolling or rely on body/root scrolling */}
       {/* Removed the problematic style={{ height: 'calc(...)' }} */}
       <main className={`p-6 md:p-10 bg-brand-black ${headerPaddingTopClass}`}> {/* Changed bg-brand-dark to bg-brand-black */}
           {children} {/* The page-specific content (Resume Analysis, UploadArea, etc.) */}
       </main>
    </div>
  );
};

export default DashboardLayout;