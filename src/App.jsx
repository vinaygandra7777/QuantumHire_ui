import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rellax from 'rellax'; // Import Rellax library

// Import Landing Page Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

// Import Dashboard Page
import DashboardPage from './pages/DashboardPage';

// Optional: Create a component for the landing page layout
const LandingPageLayout = () => {
  // --- MODIFIED: useEffect to safely initialize and clean up Rellax ---
  useEffect(() => {
    let rellaxInstance = null; // Declare a variable to hold the rellax instance

    // Check if Rellax is available before trying to initialize
    if (typeof Rellax !== 'undefined') {
      try {
        // Attempt to initialize Rellax
        rellaxInstance = new Rellax('.rellax', {
            speed: -2, // Default speed for all rellax elements
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false,
            // Consider adding mobile: false if parallax is jumpy on phones
            // mobile: false,
        });
      } catch (error) {
        // Catch any potential errors during initialization
        console.error("Failed to initialize Rellax:", error);
        // The error might happen here, preventing rellaxInstance from being created correctly
      }
    }

     // Clean up Rellax instance when the component unmounts or effect re-runs
     return () => {
         // Safely check if rellaxInstance was created and has a destroy method
         if (rellaxInstance && typeof rellaxInstance.destroy === 'function') {
             rellaxInstance.destroy();
             // Optional: Set rellaxInstance to null after destroying
             // rellaxInstance = null; // Though the variable goes out of scope anyway
         }
     };
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <div className="overflow-x-hidden bg-brand-black">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Pricing />
        <CallToAction />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPageLayout />} />

        {/* Route for the Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Add other routes like Login, Signup, etc. */}
      </Routes>
    </Router>
  );
}

export default App;