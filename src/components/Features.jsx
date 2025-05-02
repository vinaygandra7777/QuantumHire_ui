import React from 'react';
import { Settings, Wand2, LayoutTemplate, Tags, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

// Reusable card animation
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Card component with motion and hover effect
const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark transition-colors duration-300 hover:border-brand-purple-light hover:shadow-lg"
        variants={cardVariants} // Use variants defined above
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} // Subtle hover scale
    >
        <div className="mb-4 inline-block p-3 rounded-full bg-brand-purple bg-opacity-20 text-brand-purple-light">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-brand-gray">{description}</p>
    </motion.div>
);

const Features = () => {
  const featuresData = [
    // ... (keep featuresData as is)
    {
      icon: Settings,
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
  ];

  return (
    <section className="py-20 px-4 "> {/* Removed example bg */}
        <div className="max-w-7xl mx-auto">
      
            {/* Introductory Text Animation */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
                    Features
                </span>
                <h2 >
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Elevate Your Hiring & Job Search <br /> with AI Precision
</span>
                </h2>
                
                <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto font-extrabold font-[Exo] mt-4 ">
                    Leverage cutting-edge AI to analyze, build, and optimize resumes, ensuring you find the perfect fit or land your dream job faster.
                </p>
            </motion.div>

            {/* Grid with Staggered Card Animation */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-[Exo]"
                initial="hidden"
                whileInView="visible" // Trigger when grid comes into view
                viewport={{ once: true, amount: 0.1 }} // Trigger early
                transition={{ staggerChildren: 0.1 }} // Stagger card appearance
            >
                {featuresData.map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </motion.div>
        </div>
    </section>
  );
};

export default Features;