// src/components/CallToAction.js
import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Step into the future of design
        </h2>
        <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10">
          Join thousands of designers and teams using Framer to turn
          ideas into high-performing websites, fast.
        </p>
        <a
          href="#"
          className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors inline-block"
        >
          Start Building Now
        </a>

         {/* Optional: Add the second smaller product image here if needed */}
         {/* <div className="mt-16 max-w-3xl mx-auto bg-brand-gray-extradark rounded-lg shadow-2xl p-4 border border-brand-gray-dark">
           <div className="aspect-video bg-brand-dark rounded flex items-center justify-center">
              <span className="text-brand-gray">Another Product UI Placeholder</span>
           </div>
        </div> */}
      </div>
    </section>
  );
};

export default CallToAction;