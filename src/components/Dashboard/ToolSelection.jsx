import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ToolSelection = ({ onSelectTool }) => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    { id: 'ats-checker', name: 'ATS Checker' },
    { id: 'resume-builder', name: 'Resume Builder' },
    { id: 'best-resume-picker', name: 'Best Resume Picker' },
  ];

  const handleToolClick = (toolId) => setSelectedTool(toolId);
  const handleContinueClick = () => selectedTool && onSelectTool(selectedTool);

  const renderFloatingShapes = (positionClass) => (
    <div className={`absolute ${positionClass} pointer-events-none`}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`border border-slate-200/20 rounded-xl animate-floating 
            ${i % 2 === 0 ? 'w-40 h-60' : 'w-24 h-32'}
            absolute`}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4 overflow-hidden bg-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background floating shapes in corners */}
      {renderFloatingShapes('top-0 left-0 w-1/2 h-1/2')}
      {renderFloatingShapes('bottom-0 left-0 w-1/2 h-1/2')}
      {renderFloatingShapes('top-0 right-0 w-1/2 h-1/2')}
      {renderFloatingShapes('bottom-0 right-0 w-1/2 h-1/2')}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center font-nura">
          Choose your tool
        </h2>
        <p className="text-md md:text-lg text-brand-gray mb-10 text-center max-w-md">
          Select the tool you want to use to optimize your career documents. We're constantly adding more!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              className={`px-6 py-3 rounded-full border text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-light
                ${selectedTool === tool.id
                  ? 'bg-brand-gray-dark border-brand-purple text-white'
                  : 'bg-brand-card-dark border-brand-gray-dark text-brand-gray hover:bg-brand-gray-dark hover:border-brand-gray-medium hover:text-white'
                }`}
              onClick={() => handleToolClick(tool.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedTool === tool.id && (
                <span className="inline-block w-2 h-2 mr-2 bg-brand-purple rounded-full"></span>
              )}
              {tool.name}
            </motion.button>
          ))}
        </div>

        <motion.button
          className={`px-8 py-3 rounded-full font-semibold transition-colors duration-200
            ${selectedTool
              ? 'bg-brand-purple hover:bg-brand-purple-light text-white'
              : 'bg-brand-gray-dark text-brand-gray cursor-not-allowed opacity-50'
            }`}
          onClick={handleContinueClick}
          disabled={!selectedTool}
          whileHover={{ scale: selectedTool ? 1.05 : 1 }}
          whileTap={{ scale: selectedTool ? 0.98 : 1 }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ToolSelection;
