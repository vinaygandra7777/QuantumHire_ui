
import React from 'react';
import { Settings, Wand2, LayoutTemplate, Tags, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

// Variants for the section intro (can keep or adjust)
const sectionIntroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// Variants for each feature block (new animation per block)
const featureBlockVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Features = () => {
  const featuresData = [
    // !! KEEP YOUR EXISTING FEATURES DATA HERE !!
    {
      icon: Settings, // Icon component from lucide-react
      title: 'AI ATS Score Checker',
      description: 'Optimize your resume to beat Applicant Tracking Systems. Get an instant AI-powered score and actionable tips to improve visibility.'
    },
    {
      icon: Wand2,
      title: 'Intelligent Resume Analysis',
      description: 'Receive in-depth feedback on your resume\'s content, structure, and impact. Our AI identifies weaknesses and suggests improvements.'
    },
    {
      icon: LayoutTemplate,
      title: 'AI-Powered Resume Builder',
      description: 'Effortlessly create professional resumes from scratch or enhance existing ones with AI suggestions, tailored content, and sleek templates.'
    },
    {
      icon: Tags,
      title: 'Targeted Keyword Optimization',
      description: 'Ensure your resume uses the right language. Our AI extracts key terms from job descriptions and helps you integrate them effectively.'
    },
    {
      icon: Users,
      title: 'JD-Based Resume Ranking',
      description: 'Upload multiple resumes and a job description. Our AI analyzes and ranks candidates, instantly identifying the top matches for the role.'
    },
    {
      icon: FileText,
      title: 'AI Cover Letter Assistant',
      description: 'Generate compelling, personalized cover letters tailored to specific job applications in seconds, complementing your optimized resume.'
    },
    // ... add more features if needed
  ];

  // Map feature data to include placeholder image paths for the layout
  const featuresWithImages = featuresData.map((feature, index) => ({
      ...feature,
      // !! IMPORTANT: REPLACE THESE PLACEHOLDER PATHS with your actual image files !!
      imagePath: `/src/assets/feature-image-${index + 1}.png`, // Example: feature-image-1.png, feature-image-2.png, etc.
      imageAlt: `Illustration for ${feature.title}` // Descriptive alt text
  }));


  return (
    <section className="py-20 px-4"> {/* Use a dark background matching your theme */}
        <div className="max-w-7xl mx-auto">

            {/* Introductory Text (Heading & Description) - Keep as is, maybe style slightly */}
            <motion.div
                className="text-center mb-16"
                variants={sectionIntroVariants} // Use defined variants
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
            >
                 <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
                    Features
                </span>
                <h2>
                    <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 leading-tight"> {/* Adjusted text size and added leading-tight */}
                        Elevate Your Hiring & Job Search <br className="hidden md:inline"/> with AI Precision {/* Added break for responsiveness */}
                    </span>
                </h2>
                <p className="text-md md:text-lg text-gray-300 max-w-3xl mx-auto font-extrabold font-[Exo] mt-4"> {/* Adjusted text color to gray-300 */}
                    Leverage cutting-edge AI to analyze, build, and optimize resumes, ensuring you find the perfect fit or land your dream job faster.
                </p>
            </motion.div>

            {/* Feature Blocks Container */}
            <div className="space-y-16"> {/* Add vertical space between blocks */}
                {featuresWithImages.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        // Apply styles for the dark, rounded block container
                        className="bg-black-900/50  p-6 md:p-10  backdrop-blur-sm" // Dark background, rounded, border, padding
                        variants={featureBlockVariants} // Animation for each block
                        initial="hidden"
                        whileInView="visible" // Trigger animation when block comes into view
                        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of block is visible
                    >
                        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="md:w-1/2 text-center md:text-left"> {/* Text takes half width on medium+ */}
                                {/* Icon (optional, based on image) */}
                                <div className="mb-4 inline-block p-3 rounded-full bg-brand-purple bg-opacity-20 text-brand-purple-light"> {/* Icon container */}
                                    <feature.icon size={28} /> {/* Increased icon size */}
                                </div>
                                {/* Feature Title */}
                                <h3 className="text-5xl md:text-3xl font-bold text-white mb-3">{feature.title}</h3>
                                {/* Feature Description */}
                                <p className="text-base md:text-lg text-gray-300">{feature.description}</p> {/* Slightly larger description, adjusted color */}
                            </div>

                            {/* Image/Graphic */}
                            <div className="md:w-1/2 flex justify-center items-center"> {/* Image takes half width on medium+, centered */}
                                {/* !! Replace src with the actual path to your feature image !! */}
                                <img
                                    src={feature.imagePath} // Placeholder image path
                                    alt={feature.imageAlt} // Alt text for accessibility
                                    className="w-full max-w-md h-auto object-contain rounded-lg shadow-xl" // Styling for the image
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Features;