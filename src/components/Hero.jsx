import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

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
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32 px-4">
      {/* Background Glows (remain static or add subtle pulse if desired) */}
      <div
        className="absolute top-[-50px] left-[10%] w-[500px] h-[500px] bg-brand-purple rounded-full opacity-15 blur-[100px] -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-100px] right-[5%] w-[600px] h-[400px] bg-brand-purple-light rounded-full opacity-10 blur-[120px] -z-10"
        aria-hidden="true"
      />

      {/* Wrap content in motion.div for staggered animation */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate immediately on load
      >
        {/* Glassy Tag */}
        <motion.div variants={itemVariants} className="mb-5 md:mb-6 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors duration-200"
          >
            <Sparkles className="h-4 w-4 text-white/80 mr-2" />
            <span className="text-white text-sm font-medium leading-none">
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
          className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto mb-10 "
        >
          QuantumHire helps you create professional, tailored resumes effortlessly using advanced AI — so you can focus on your career, not formatting
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <motion.a
            href="#"
            className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors w-full sm:w-auto block" // Added block for motion layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Building Now
          </motion.a>
        </motion.div>

        {/* Product image placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }} // Delay after text/buttons
          className="relative max-w-5xl mx-auto bg-brand-gray-extradark rounded-lg shadow-2xl p-4 border border-brand-gray-dark"
        >
          <div className="absolute inset-[-1px] rounded-lg bg-gradient-to-br from-brand-purple/50 via-transparent to-brand-purple/50 opacity-70 blur-lg -z-10" aria-hidden="true"/>
          <div className="relative z-10 aspect-video bg-brand-dark rounded flex items-center justify-center">
            <span className="text-brand-gray">Product UI Screenshot Placeholder</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;