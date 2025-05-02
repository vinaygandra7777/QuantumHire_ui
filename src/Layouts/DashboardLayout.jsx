import React from 'react';


const DashboardLayout = ({ children }) => {
  
  const headerHeightClass = 'h-16'; // Navbar height is 16 (4rem)
  const headerPaddingTopClass = 'pt-16'; // Match this padding on content below header

  return (
  
    <div className="min-h-screen bg-brand-black text-white"> {/* Changed bg-brand-dark to bg-brand-black */}
       <main className={`p-6 md:p-10 bg-brand-black ${headerPaddingTopClass}`}> {/* Changed bg-brand-dark to bg-brand-black */}
           {children} {/* The page-specific content (Resume Analysis, UploadArea, etc.) */}
       </main>
    </div>
  );
};

export default DashboardLayout;