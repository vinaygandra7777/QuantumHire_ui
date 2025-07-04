import React from 'react';
import { motion } from 'framer-motion'; // Keep motion for the paragraph if you want
const LogoPlaceholder = ({ name }) => (
  <div className="flex items-center justify-center h-20 text-white opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex-shrink-0 min-w-[100px]"> {/* Added flex-shrink-0 and a min-width for consistent spacing */}
      <span className="font-semibold text-lg font-[Exo]">{name}</span>
  </div>
);

const TrustedBy = () => {
  const logos = ['Slack', 'Coinbase', 'Webflow', 'Dropbox', 'Discord', 'Zoom', 'Stripe', 'Notion', 'Airbnb', 'Uber']; // Added more logos for a longer scroll
  const duplicatedLogos = [...logos, ...logos];


  return (
    // Keep the main section wrapper and intro text
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.p // Keep motion for the intro paragraph
                className="text-center text-md font-semibold text-brand-gray uppercase tracking-wider mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Trusted by businesses of all sizes worldwide.
            </motion.p>
            <div className="overflow-hidden">
                <div className="flex space-x-12 w-max animate-scroll-left font-[Exo]"> {/* Added flex, space-x for gap, w-max, and animation class */}
                    {/* Map duplicated logos */}
                    {duplicatedLogos.map((logoName, index) => (
                        <LogoPlaceholder key={`${logoName}-${index}`} name={logoName.toUpperCase()} />
                    ))}
                </div>
            </div>
            {/* --- END MODIFIED --- */}

        </div>
    </section>
  );
};

export default TrustedBy;