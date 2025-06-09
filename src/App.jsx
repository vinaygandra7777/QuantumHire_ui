// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rellax from 'rellax';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
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

    
    if (typeof Rellax !== 'undefined') {
      try {
        
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

  }, []); // Empty dependency array means this runs once after the initial render

  return (
  
    <div className="overflow-x-hidden relative bg-dark-gradient min-h-screen">
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page using the Layout */}
        <Route path="/" element={<LandingPageLayout />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* **FIX: Corrected route path spelling** */}
        <Route path="/resume-template-selection" element={<ResumeTemplateSelectionPage />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        {/* **FIX: Corrected route path spelling** */}
        <Route path="/resume-builder-template-2" element={<ResumeBuilderTemplate2 />}/>
        <Route path ="/login" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;