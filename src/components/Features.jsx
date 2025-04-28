import React from 'react';
// Import necessary icons - selecting ones relevant to the new features
import { Settings, Wand2, LayoutTemplate, Tags, Users, FileText } from 'lucide-react';

// Reverted FeatureCard to match the original structure more closely
// Removed h-full, flex, flex-col, and the extra text wrapper div
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark transition-all hover:border-brand-purple-light hover:shadow-lg">
     {/* --- This icon container styling is EXACTLY from your original code --- */}
     <div className="mb-4 inline-block p-3 rounded-full bg-brand-purple bg-opacity-20 text-brand-purple-light">
       <Icon size={24} />
     </div>
     {/* --- End of original icon container styling --- */}
     <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
     <p className="text-brand-gray">{description}</p>
  </div>
);

const Features = () => {
  // Updated featuresData with AI Resume specific content
  const featuresData = [
    {
      icon: Settings, // Icon for optimization/scoring
      title: 'AI ATS Score Checker',
      description: 'Optimize your resume to beat Applicant Tracking Systems. Get an instant AI-powered score and actionable tips to improve visibility.'
    },
    {
      icon: Wand2, // Icon for AI analysis/magic
      title: 'Intelligent Resume Analysis',
      description: 'Receive in-depth feedback on your resume\'s content, structure, and impact. Our AI identifies weaknesses and suggests improvements.'
    },
    {
      icon: LayoutTemplate, // Icon for building/templates
      title: 'AI-Powered Resume Builder',
      description: 'Effortlessly create professional resumes from scratch or enhance existing ones with AI suggestions, tailored content, and sleek templates.'
    },
    {
      icon: Tags, // Icon for keyword relevance
      title: 'Targeted Keyword Optimization',
      description: 'Ensure your resume uses the right language. Our AI extracts key terms from job descriptions and helps you integrate them effectively.'
    },
    {
      icon: Users, // Icon for comparing multiple candidates/users
      title: 'JD-Based Resume Ranking',
      description: 'Upload multiple resumes and a job description. Our AI analyzes and ranks candidates, instantly identifying the top matches for the role.'
    },
    {
      icon: FileText, // Icon for document generation (cover letter)
      title: 'AI Cover Letter Assistant',
      description: 'Generate compelling, personalized cover letters tailored to specific job applications in seconds, complementing your optimized resume.'
    },
  ];

  return (
    // Added a background color here just for better contrast in standalone viewing,
    // adjust or remove based on your actual page background.
    <section className="py-20 px-4 bg-gray-900"> {/* Example background */}
      <div className="max-w-7xl mx-auto">
        {/* --- Introductory Text --- */}
        <div className="text-center mb-16">
           <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-purple bg-brand-purple bg-opacity-10 rounded-full mb-2">
            Features
           </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Elevate Your Hiring & Job Search <br /> with AI Precision
          </h2>
          <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
             Leverage cutting-edge AI to analyze, build, and optimize resumes, ensuring you find the perfect fit or land your dream job faster.
          </p>
        </div>
        {/* --- End Introductory Text --- */}

        {/* --- Grid for Feature Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
        {/* --- End Grid --- */}
      </div>
    </section>
  );
};

export default Features;