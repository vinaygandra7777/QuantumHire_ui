import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Landing Page Components (or a single LandingPage component)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Import Dashboard Page
import DashboardPage from './pages/DashboardPage';

// Optional: Create a component for the landing page layout
const LandingPageLayout = () => (
  <div className="overflow-x-hidden bg-brand-dark"> {/* Ensure background */}
    <Navbar />
    <main>
      <Hero />
      <TrustedBy />
      <Features />
      <Pricing />
      <CallToAction />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPageLayout />} />

        {/* Route for the Dashboard */}
        {/* Add more specific dashboard routes as needed, e.g., /dashboard/settings */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Add other routes like Login, Signup, etc. */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

         {/* Optional: Catch-all 404 route */}
         {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;