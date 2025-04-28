import React from 'react';
import { motion } from 'framer-motion'; // Import motion

// Replace with actual logo components or SVGs
const LogoPlaceholder = ({ name }) => (
  // Added motion here for individual logo animation
  <motion.div
      className="flex items-center justify-center h-10 text-brand-gray opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 0.6, y: 0 }} // Animate to default opacity
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ opacity: 1 }} // Keep CSS hover effect
  >
      <span className="font-semibold text-lg">{name}</span> {/* Slightly larger font */}
  </motion.div>
);

const TrustedBy = () => {
  const logos = ['Slack', 'Coinbase', 'Webflow', 'Dropbox', 'Discord', 'Zoom']; // Use actual names/keys

  return (
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
                className="text-center text-sm font-semibold text-brand-gray uppercase tracking-wider mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Trusted by businesses of all sizes worldwide.
            </motion.p>
            {/* Wrap grid in motion.div for potential stagger effect */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center"
                initial="hidden" // Use initial state defined in LogoPlaceholder
                whileInView="visible" // Use visible state defined in LogoPlaceholder
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.08 }} // Stagger logo appearance
            >
                {/* Render logos only once */}
                {logos.map((logoName) => (
                    <LogoPlaceholder key={logoName} name={logoName} />
                ))}
            </motion.div>
        </div>
    </section>
  );
};

export default TrustedBy;