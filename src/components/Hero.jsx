// src/components/Hero.js
import React from 'react';
import { Sparkles } from 'lucide-react'; // <--- Import the icon

const Hero = () => {
  return (
    // Add relative positioning and overflow-hidden to contain the glow
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32 px-4"> {/* Increased top padding */}

      {/* Background Glow 1 */}
      <div
        className="absolute top-[-50px] left-[10%] w-[500px] h-[500px] bg-brand-purple rounded-full opacity-15 blur-[100px] -z-10"
        aria-hidden="true"
      />
       {/* Background Glow 2 */}
      <div
        className="absolute bottom-[-100px] right-[5%] w-[600px] h-[400px] bg-brand-purple-light rounded-full opacity-10 blur-[120px] -z-10"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        {/* ****** START: Added Glassy Tag ****** */}
        <div className="mb-5 md:mb-6 flex justify-center"> {/* Centering wrapper */}
          <a
            href="#" // Make it clickable if desired
            className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors duration-200"
            >
             <Sparkles className="h-4 w-4 text-white/80 mr-2" />
             <span className="text-white text-sm font-medium leading-none"> {/* leading-none helps vertical alignment */}
                More than a resume builder
             </span>
          </a>
        </div>
        {/* ****** END: Added Glassy Tag ****** */}


        <h1 className="text-4xl md:text-6xl lg:text-7xl  text-white leading-tight mb-6 font-extrabold font-['Nura']">
        Build Resumes That Land Jobs
        </h1>
        <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto mb-10 ">
        QuantumHire helps you create professional, tailored resumes effortlessly using advanced AI — so you can focus on your career, not formatting
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <a
            href="#"
            className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors w-full sm:w-auto"
          >
            Start Building Now
          </a>
          
        </div>

        {/* Product image placeholder */}
        <div className="relative max-w-5xl mx-auto bg-brand-gray-extradark rounded-lg shadow-2xl p-4 border border-brand-gray-dark">
           {/* Optional Edge Glow */}
           <div className="absolute inset-[-1px] rounded-lg bg-gradient-to-br from-brand-purple/50 via-transparent to-brand-purple/50 opacity-70 blur-lg -z-10" aria-hidden="true"/>

           <div className="relative z-10 aspect-video bg-brand-dark rounded flex items-center justify-center">
              <span className="text-brand-gray">Product UI Screenshot Placeholder</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;