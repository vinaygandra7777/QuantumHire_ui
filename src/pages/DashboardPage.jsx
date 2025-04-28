import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import UploadArea from '../components/Fashboard/UploadArea';
import ScoreDisplay from '../components/Dashboard/ScoreDisplay';
import FeedbackPanel from '../components/Dashboard/FeedbackPanel';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [atsScore, setAtsScore] = useState(null); // Example: 78
  const [analysisFeedback, setAnalysisFeedback] = useState(null); // Example feedback object

  // Dummy function to simulate API call after file upload
  const handleResumeUpload = (file) => {
    console.log('Uploaded file:', file.name);
    // Reset previous results
    setAtsScore(null);
    setAnalysisFeedback(null);

    // *** Replace with actual API call to your backend ***
    // Simulate API response after a delay
    setTimeout(() => {
      // Dummy data - replace with actual API response
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
          className="text-3xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            Resume Analysis
        </motion.h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (Upload + Score) */}
            <motion.div
                className="lg:col-span-1 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <UploadArea onFileUpload={handleResumeUpload} />
                <ScoreDisplay score={atsScore} />
            </motion.div>

            {/* Right Column (Feedback) */}
            <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
             >
                <FeedbackPanel feedback={analysisFeedback} />
             </motion.div>
        </div>
    </DashboardLayout>
  );
};

export default DashboardPage;