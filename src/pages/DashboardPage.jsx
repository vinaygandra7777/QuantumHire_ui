import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import UploadArea from '../components/Dashboard/UploadArea';
import ScoreDisplay from '../components/Dashboard/ScoreDisplay';
import FeedbackPanel from '../components/Dashboard/FeedbackPanel';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [atsScore, setAtsScore] = useState(null); // State to hold the ATS score
  const [analysisFeedback, setAnalysisFeedback] = useState(null); // State to hold the analysis feedback

  // Dummy function to simulate API call after file upload
  const handleResumeUpload = (file) => {
    console.log('Uploaded file:', file.name);
    // Reset previous results
    setAtsScore(null);
    setAnalysisFeedback(null);

    // *** Replace with actual API call to your backend ***
    // Simulate API response after a delay
    setTimeout(() => {
      // Dummy data - replace with actual API response structure
      const dummyScore = Math.floor(Math.random() * 50) + 50; // Score between 50-99
      const dummyFeedback = {
         strengths: [
            { title: 'Well Structured', content: 'The resume follows a clear, logical format.' },
            { title: 'Relevant Skills Listed', content: `Skills like ${dummyScore > 75 ? 'React, Node.js' : 'MS Office'} are present.` },
         ],
         weaknesses: [
            { title: 'Generic Summary', content: 'The professional summary could be more tailored to specific roles.' },
            ...(dummyScore < 65 ? [{ title: 'Missing Keywords', content: 'Important keywords for target roles seem absent.' }] : [])
         ],
         suggestions: [
            { title: 'Add Portfolio Link', content: 'Consider adding a link to your portfolio or GitHub profile.' },
            { title: 'Tailor Experience', content: 'Customize bullet points for each job application to match requirements.' },
         ]
      };

      setAtsScore(dummyScore);
      setAnalysisFeedback(dummyFeedback);
    }, 2000); // 2-second delay simulation
  };

  return (
    <DashboardLayout>
        {/* Page Title */}
        <motion.h1
          className="text-3xl font-bold text-white mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Resume Analysis
        </motion.h1>

        {/* Main content area - now a single column */}
        {/* Use space-y-* for vertical spacing between sections */}
        <div className="space-y-6">

            {/* Upload Area */}
            <motion.div
                 initial={{ opacity: 0, y: 20 }} // Staggered entrance from below
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.1 }}
            >
                <UploadArea onFileUpload={handleResumeUpload} />
            </motion.div>

            {/* Compatibility Score */}
            {/* Only show score after upload and calculation */}
            {atsScore !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Staggered entrance
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }} // Slight delay
                >
                    <ScoreDisplay score={atsScore} />
                </motion.div>
            )}

            {/* AI Feedback & Analysis */}
            {/* Only show feedback after upload and calculation */}
            {analysisFeedback !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Staggered entrance
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }} // Further delay
                >
                    <FeedbackPanel feedback={analysisFeedback} />
                </motion.div>
            )}
        </div>
    </DashboardLayout>
  );
};

export default DashboardPage;