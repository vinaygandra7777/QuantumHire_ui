import React from 'react';
import { motion } from 'framer-motion';
// Optional: Install and use a gauge library like 'react-circular-progressbar'
// npm install react-circular-progressbar

const ScoreDisplay = ({ score }) => {
  // Determine color based on score
  const getScoreColor = (s) => {
    if (s === null || s === undefined) return 'text-brand-gray';
    if (s >= 85) return 'text-green-400';
    if (s >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const scoreColor = getScoreColor(score);

  // Simple text display for now
  return (
    <div className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark text-center">
        <h3 className="text-lg font-semibold text-white mb-3">ATS Compatibility Score</h3>
        {score !== null && score !== undefined ? (
            <motion.div
                key={score} // Animate when score changes
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`text-6xl font-extrabold ${scoreColor} mb-1`}
            >
                {score}<span className="text-3xl font-normal">%</span>
            </motion.div>
        ) : (
            <p className="text-4xl font-bold text-brand-gray">-</p>
        )}
        <p className="text-sm text-brand-gray mt-2">
            {score === null || score === undefined
            ? 'Upload a resume to see the score'
            : 'Based on standard ATS criteria'}
        </p>
    </div>
  );

  // Example using react-circular-progressbar (if installed)
  /*
  import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';

  return (
    <div className="bg-brand-gray-extradark p-6 rounded-lg border border-brand-gray-dark text-center flex flex-col items-center">
        <h3 className="text-lg font-semibold text-white mb-4">ATS Compatibility Score</h3>
        <div style={{ width: 150, height: 150 }}>
            {score !== null && score !== undefined ? (
                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                        pathColor: scoreColor.replace('text-', ''), // Extract color name for CSS variable or direct value
                        textColor: '#FFF', // White text
                        trailColor: '#374151', // brand-gray-dark approx
                        backgroundColor: '#1F2937', // brand-gray-extradark approx
                    })}
                 />
            ) : (
                 <p className="text-4xl font-bold text-brand-gray flex items-center justify-center h-full">-</p>
            )}
        </div>
         <p className="text-sm text-brand-gray mt-4">
            {score === null || score === undefined
            ? 'Upload a resume to see the score'
            : 'Based on standard ATS criteria'}
        </p>
    </div>
  )
  */
};

export default ScoreDisplay;