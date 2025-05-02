import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import UploadArea from '../components/Dashboard/UploadArea';
import ScoreDisplay from '../components/Dashboard/ScoreDisplay';
import FeedbackPanel from '../components/Dashboard/FeedbackPanel';
import ToolSelection from '../components/Dashboard/ToolSelection';
import { motion, AnimatePresence } from 'framer-motion';
// --- IMPORT useNavigate ---
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  // State to control which part of the dashboard is shown
  const [currentView, setCurrentView] = useState('selection'); // 'selection' or 'ats-analysis'

  // States for ATS Analysis (keep these for the ATS view)
  const [atsScore, setAtsScore] = useState(null);
  const [analysisFeedback, setAnalysisFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- INITIALIZE useNavigate ---
  const navigate = useNavigate();

  // Function called by ToolSelection when a tool is chosen
  const handleToolSelected = (toolId) => {
    if (toolId === 'ats-checker') {
      setCurrentView('ats-analysis'); // Move to the ATS view
      // Optionally reset ATS states here if needed on entry, but upload handles reset
    } else if (toolId === 'resume-builder') { // --- CHECK FOR RESUME BUILDER ---
      // Navigate to the Resume Builder page
      navigate('/resume-builder'); // --- NAVIGATE TO THE NEW ROUTE ---
    }
    else {
      // Handle other tool selections (e.g., show coming soon)
      alert(`${toolId.replace('-', ' ').toUpperCase()} Coming Soon!`);
      // Optionally reset selection or keep it selected
      // setCurrentView('selection'); // Could go back to selection, or stay on selection with message
    }
  };

  // Dummy function to simulate API call after file upload (within ATS view)
  const handleResumeUpload = (file) => {
    console.log('Uploaded file:', file.name);
    // Reset previous results
    setAtsScore(null);
    setAnalysisFeedback(null);
    setIsLoading(true); // Start loading

    // *** Replace with actual API call to your backend ***
    // Simulate API response after a delay
    setTimeout(() => {
      // Dummy data - replace with actual API response structure
      const dummyScore = Math.floor(Math.random() * 50) + 50; // Score between 50-99
      const dummyFeedback = {
         strengths: [
            { title: 'Well Structured', content: 'The resume follows a clear, logical format.' },
            { title: 'Relevant Skills Listed', content: `Skills like ${dummyScore > 75 ? 'React, Node.js' : 'MS Office'} are present.` },
            { title: 'Clear Section Headings', content: 'Sections are clearly labeled and easy to navigate.' },
         ],
         weaknesses: [
            { title: 'Generic Summary', content: 'The professional summary could be more tailored to specific roles.' },
            ...(dummyScore < 65 ? [{ title: 'Missing Keywords', content: 'Important keywords for target roles seem absent based on common job descriptions.' }] : []),
             { title: 'Inconsistent Formatting', content: 'Check for consistent date formats and bullet point styles.' },
         ],
         suggestions: [
            { title: 'Add Portfolio Link', content: 'Consider adding a link to your portfolio or GitHub profile to showcase projects.' },
            { title: 'Tailor Experience', content: 'Customize bullet points for each job application to match requirements and include accomplishments.' },
             { title: 'Quantify Achievements', content: 'Add numbers or metrics to demonstrate the impact of your work (e.g., "Increased sales by 15%").' },
         ]
      };

      setAtsScore(dummyScore);
      setAnalysisFeedback(dummyFeedback);
      setIsLoading(false); // End loading
    }, 2000); // 2-second delay simulation
  };

  return (
    <DashboardLayout>
        {/* Use AnimatePresence to enable exit animations */}
        <AnimatePresence mode='wait'> {/* mode='wait' waits for the exiting component to finish before animating the new one */}
            {/* Conditionally render based on the currentView state */}
            {currentView === 'selection' && (
                <motion.div
                    key="selection-view" // Key is required for AnimatePresence
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* ToolSelection will call handleToolSelected */}
                    <ToolSelection onSelectTool={handleToolSelected} />
                </motion.div>
            )}

            {currentView === 'ats-analysis' && (
                <motion.div
                     key="ats-view" // Key is required for AnimatePresence
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }} // Define exit animation
                     transition={{ duration: 0.5 }}
                >
                     {/* Page Title for ATS Analysis */}
                     <h1 className="text-3xl font-bold text-white mb-8 mt-10">
                         Resume Analysis
                     </h1>

                     {/* Main ATS content area */}
                     {/* Using subtle background/border variations */}
                     <div className="space-y-8 p-6 rounded-lg bg-brand-gray-extradark border border-brand-gray-dark shadow-lg">

                         {/* Upload Area */}
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                         >
                             <UploadArea onFileUpload={handleResumeUpload} />
                         </motion.div>

                         {/* Loading Indicator */}
                         {isLoading && (
                              <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                  className="text-center text-brand-purple font-semibold"
                              >
                                  Analyzing your resume...
                              </motion.div>
                         )}


                         {/* Compatibility Score */}
                         {/* Only show score after upload and calculation AND not loading */}
                         {atsScore !== null && !isLoading && (
                             <motion.div
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: 0.2 }}
                             >
                                 <ScoreDisplay score={atsScore} />
                             </motion.div>
                         )}

                         {/* AI Feedback & Analysis */}
                         {/* Only show feedback after upload and calculation AND not loading */}
                         {analysisFeedback !== null && !isLoading && (
                             <motion.div
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: 0.3 }}
                             >
                                 {/* FeedbackPanel already has its own styling */}
                                 <FeedbackPanel feedback={analysisFeedback} />
                             </motion.div>
                         )}
                     </div>
                 </motion.div>
            )}
        </AnimatePresence>
        {/* The ResumeBuilder component itself will be rendered by App.jsx at the /resume-builder route,
            so it doesn't need to be conditionally rendered here in the DashboardPage layout. */}
    </DashboardLayout>
  );
};

export default DashboardPage;