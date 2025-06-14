import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion'; 
import Rellax from 'rellax';// Import motion

// Animation variants for staggered effect
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32 px-4 background-image bg-cover  bg-no-repeat" style={{ backgroundImage: "url('/src/assets/background4.png')" }}>
      {/* Rellax background element */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate immediately on load
      >
        {/* Glassy Tag */}
        <motion.div variants={itemVariants} className="mb-5 md:mb-6 flex justify-center">
          <a
            href="#" // Replace with actual link if needed
            className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors duration-200"
          >
            <Sparkles className="h-4 w-4 text-white/80 mr-2" />
            <span className="text-white text-sm font-medium leading-none font-['Exo']">
              More than a resume builder
            </span>
          </a>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 font-extrabold font-['Nura']"
        >
          Build Resumes That Land Jobs
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-brand-gray max-w-3xl mx-auto mb-10 font-[Exo] "
        >
          QuantumHire helps you create professional, tailored resumes effortlessly using advanced AI — so you can focus on your career, not formatting
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <motion.a
            href="/dashboard" // Replace with actual link if needed
            className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors w-full sm:w-auto block " // Added block for motion layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building Now
          </motion.a>
          {/* Add a secondary button here if needed, styled appropriately */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }} // Delay after text/buttons
          // className="relative max-w-3xl mx-auto bg-brand-black-extradark rounded-lg shadow-2xl p-4 border border-brand-gray-dark rellax"
          data-rellax-speed="-2"
        >
        


          
          <img
            // !! IMPORTANT: Replace this path with the actual path to your image file !!
            src="/src/assets/image1.png" // Example path, adjust as needed
            alt="Screenshot of the resume builder tool interface" // Accessible alternative text
            className="relative z-10 max-w-4xl mx-auto  h-auto rounded-lg object-cover" // Styling for the image
          />
          

        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
