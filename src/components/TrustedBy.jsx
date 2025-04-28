// src/components/TrustedBy.js
import React from 'react';

// Replace with actual logo components or SVGs
const LogoPlaceholder = ({ name }) => (
  <div className="flex items-center justify-center h-10 text-brand-gray opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
    {/* Ideally use SVG/img tags here */}
    <span className="font-semibold">{name}</span>
  </div>
);

const TrustedBy = () => {
  const logos = ['slack', 'coinbase', 'webflow', 'Dropbox', 'DISCORD', 'Zoom']; // Use actual names/keys

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-brand-gray uppercase tracking-wider mb-8">
          Trusted by businesses of all sizes worldwide.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {logos.map((logoName) => (
            <LogoPlaceholder key={logoName} name={logoName} />
          ))}
           {/* Repeat or add more logos as needed to fill grid */}
           {logos.map((logoName) => (
            <LogoPlaceholder key={`${logoName}-2`} name={logoName} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;