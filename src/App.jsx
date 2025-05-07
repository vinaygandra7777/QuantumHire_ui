// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// **FIX: Import Rellax correctly if it's not in the node_modules root**
// Assuming Rellax was installed via npm/yarn, this import should be fine.
// If it's a script tag in index.html, you don't need the import here,
// but the useEffect logic needs adjustment to check `window.Rellax`.
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
import Login from './pages/Login';
import Signup from './pages/Signup';

// --- Landing Page Layout Component ---
const LandingPageLayout = () => {
  // --- useEffect to safely initialize and clean up Rellax ---
  useEffect(() => {
    let rellaxInstance = null; // Declare a variable to hold the rellax instance

    // Check if Rellax is available before trying to initialize
    // This check is important if Rellax is included via script tag or sometimes for SSR
    // If installed via npm, `typeof Rellax` will be 'function'.
    // If via script tag, check `typeof window.Rellax`.
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
             mobile: false, // Added mobile: false as parallax can be unstable on mobile
        });
        // Optional: console.log("Rellax initialized");
      } catch (error) {
        // Catch any potential errors during initialization
        console.error("Failed to initialize Rellax:", error);
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
     // Rellax typically doesn't need to re-initialize unless the DOM structure changes significantly
     // If Hero/other rellax components are dynamic, you might need dependencies, but usually not for a static layout.
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    // Added `relative` to allow for absolute positioning of background elements if needed
    // Using the custom background class if defined in tailwind.config.js
    // **FIX: Use the defined dark gradient class**
    <div className="overflow-x-hidden relative bg-dark-gradient min-h-screen"> {/* Added min-h-screen to ensure gradient covers the view */}
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
        {/* **FIX: Corrected route path spelling** */}
        <Route path="/resume-template-selection" element={<ResumeTemplateSelectionPage />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        {/* **FIX: Corrected route path spelling** */}
        <Route path="/resume-builder-template-2" element={<ResumeBuilderTemplate2 />}/>
        <Route path ="/login" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />

        {/* Authentication Pages - also using kebab-case */}
        {/* These typically wouldn't use the LandingPageLayout */}
        {/* **FIX: Uncomment Login and Signup routes** */}
      </Routes>
    </Router>
  );
}

export default App;