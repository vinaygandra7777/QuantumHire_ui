// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="overflow-x-hidden"> {/* Prevent horizontal scroll */}
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
}

export default App;