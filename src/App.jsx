// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rellax from 'rellax';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
// import Pricing from './components/Pricing'; // Keep commented out if not used in LandingPageLayout
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FAQ from './components/FAQ';

// --- Import Your Page/Component Files ---
import ResumeTemplateSelectionPage from './pages/ResumeTemplateSelectionPage';
import ResumeBuilderTemplate2 from './pages/ResumeBuilderTemplate2';
import DashboardPage from './pages/DashboardPage';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login'; // Assuming Login is a component/page itself
import Signup from './pages/Signup'; // Assuming Signup is a component/page itself
// Make sure the paths below correctly point to your files


// --- Landing Page Layout Component ---
const LandingPageLayout = () => {
  // --- useEffect to safely initialize and clean up Rellax ---
  useEffect(() => {
    let rellaxInstance = null; // Declare a variable to hold the rellax instance

    // Check if Rellax is available before trying to initialize
    // Also check if it hasn't been initialized already (more robust)
    if (typeof Rellax !== 'undefined') {
      try {
        // Attempt to initialize Rellax
        // Ensure elements with class 'rellax' exist on the page rendered by this component
        rellaxInstance = new Rellax('.rellax', {
            speed: -2, // Default speed for all rellax elements
            center: false,
            wrapper: null, // Default: window
            round: true,
            vertical: true,
            horizontal: false,
            // Consider adding mobile: false if parallax is jumpy on phones
            // mobile: false,
        });
        // Optional: console.log("Rellax initialized");
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
             // Optional: console.log("Rellax destroyed");
         }
     };
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    // Added `relative` to allow for absolute positioning of background elements if needed
    // Using the custom background class if defined in tailwind.config.js
    <div className="overflow-x-hidden relative bg-black bg-dark-gradient">
      {/* Background elements for parallax could go here */}
      {/* Example: <div className="absolute top-0 left-0 w-full h-full rellax" data-rellax-speed="-5"></div> */}

      <Navbar />
      <main>
        {/* Ensure components like Hero or others contain elements with class="rellax" */}
        <Hero />
        <TrustedBy />
        <Features />
        {/* <Pricing /> Uncomment if you add it back */}
        <CallToAction />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};


// --- Main App Component with Routing ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page using the Layout */}
        <Route path="/" element={<LandingPageLayout />} />

        {/* Routes for other specific pages using kebab-case for paths */}
        {/* NOTE: You might want to wrap pages like Dashboard, ResumeBuilder etc.
                   in a different layout or protect them if they require authentication */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume-template-selection" element={<ResumeTemplateSelectionPage />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-builder-template-2" element={<ResumeBuilderTemplate2 />}/>

        {/* Authentication Pages - also using kebab-case */}
        {/* These typically wouldn't use the LandingPageLayout */}
        {/* <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;