import React, { useState, useEffect } from 'react'; // <--- Import useEffect
import { motion } from 'framer-motion';

const ToolSelection = ({ onSelectTool }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  // 2. State to hold the shape data
  const [shapeData, setShapeData] = useState(null);

  // 3. Calculate shape data once on mount
  useEffect(() => {
    const generateShapes = (count, positionPrefix) => {
      const shapes = [];
      for (let i = 0; i < count; i++) {
        shapes.push({
          // Add a unique key for React lists
          key: `${positionPrefix}-${i}`,
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
          animationDelay: `${Math.random()*0}s`,
          // Store information needed for className
          isEven: i % 2 === 0,
        });
      }
      return shapes;
    };

    const data = {
      topLeft: generateShapes(3, 'tl'),
      bottomLeft: generateShapes(3, 'bl'),
      topRight: generateShapes(3, 'tr'),
      bottomRight: generateShapes(3, 'br'),
    };

    setShapeData(data);
  }, []); // Empty dependency array means this runs only once after initial render


  const tools = [
    { id: 'ats-checker', name: 'ATS Checker' },
    { id: 'resume-builder', name: 'Resume Builder' },
    { id: 'best-resume-picker', name: 'best-resume-picker' },
  ];

  const handleToolClick = (toolId) => setSelectedTool(toolId);
  const handleContinueClick = () => selectedTool && onSelectTool(selectedTool);

  // 4. Modified function to use the stored shape data
  const renderFloatingShapes = (positionClass, shapes) => {
      // Don't render shapes until data is loaded
      if (!shapes) return null;

      return (
        <div className={`absolute ${positionClass} pointer-events-none`}>
          {shapes.map((shape) => (
            <div
              // Use the unique key from the generated data
              key={shape.key}
              className={`border border-slate-200/20 rounded animate-floating
                ${shape.isEven ? 'w-40 h-60' : 'w-24 h-32'}
                absolute`}
              style={{
                // Use the pre-calculated random values
                top: shape.top,
                left: shape.left,
                animationDelay: shape.animationDelay,
              }}
            />
          ))}
        </div>
      );
  };


  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4 bg-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 3 }}
    >
      {/* Background floating shapes using generated data */}
      {/* Pass the specific array of shapes for this corner */}
      {renderFloatingShapes('top-0 left-0 w-1/2 h-1/2', shapeData?.topLeft)} {/* Use ?. for safety */}
      {renderFloatingShapes('bottom-10 left-0 w-1/2 h-1/2', shapeData?.bottomLeft)}
      {renderFloatingShapes('top-0 right-0 w-1/2 h-1/2', shapeData?.topRight)}
      {renderFloatingShapes('bottom-10 right-0 w-1/2 h-1/2', shapeData?.bottomRight)}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl  text-white mb-4 text-center font-extrabold font-['Nura']">
          Choose Your Tool
        </h2>
        {/* Keeping mb-10 as in your provided code */}
        <p className="font-extrabold font-['Nura'] text-brand-gray mb-10 text-center max-w-md">
          Select the tool you want to use to optimize your career documents. We're constantly adding more!
        </p>

        {/* Keeping gap-3 mb-4 as in your provided code */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              className={`px-6 py-3 rounded-lg border text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-light
                ${selectedTool === tool.id
                  ? 'bg-brand-gray-dark border-brand-purple text-white'
                  : 'bg-brand-card-dark border-brand-gray-dark text-brand-gray hover:bg-brand-gray-dark hover:border-brand-gray-medium hover:text-white'
                }`}
              onClick={() => handleToolClick(tool.id)}
              whileHover={{ scale: 1.01 }}
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
          className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200
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