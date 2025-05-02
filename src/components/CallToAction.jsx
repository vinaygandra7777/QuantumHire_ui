import React from 'react';
import { motion } from 'framer-motion'; // Import motion

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 px-4 text-center">
        <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Build Resumes That Land Jobs — Instantly
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-10">
                Join thousands of professionals using AI-powered tools to craft tailored, high-impact resumes in minutes.
                Stand out, impress recruiters, and unlock more career opportunities effortlessly.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <motion.a
                    href="#"
                    className="bg-brand-purple hover:bg-brand-purple-light text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create Your Resume
                </motion.a>
            </div>

            {/* Optional: Product Preview Section */}
            <motion.div
                className="mt-16 max-w-3xl mx-auto bg-brand-gray-extradark rounded-lg shadow-2xl p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }} // Slight delay
            >
                <div className="aspect-video bg-brand-dark rounded flex items-center justify-center">
                    <img src="/src/assets/image6.png" 
                    className="relative z-10 max-w-[500px] mx-auto  h-auto rounded-lg object-cover"></img>
                </div>
            </motion.div>
        </motion.div>
    </section>
  );
};

export default CallToAction;