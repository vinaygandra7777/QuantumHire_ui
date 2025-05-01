import React from 'react';
import { motion } from 'framer-motion';

const BackgroundGlow = ({
  initialStyle, // Object for initial CSS properties: { top, left, bottom, right, width, height, color }
  animation,    // Framer Motion animate prop (for looping animations)
  transition,   // Framer Motion transition prop
  className,    // Optional additional Tailwind classes for responsive hiding etc.
  blur = 80,    // Default blur level
  opacity = 0.1 // Default base opacity
}) => {
  // Default styles applied to all instances
  const defaultStyle = {
    position: 'absolute',
    borderRadius: '50%', // Makes it a circle/ellipse
    filter: `blur(${blur}px)`, // Apply blur effect
    pointerEvents: 'none', // Ensure it doesn't block clicks
    zIndex: 0, // Ensure it's behind content
  };

  // Merge default styles with the initialStyle prop provided by the parent component
  const combinedStyle = {
    ...defaultStyle,
    ...initialStyle,
    backgroundColor: initialStyle.color || 'rgba(139, 92, 246, 0.2)', // Default color if not provided (semi-transparent light purple)
    opacity: initialStyle.opacity || opacity, // Use initialStyle opacity if provided, otherwise default
  };

  return (
    <motion.div
      className={className} // Apply any extra classes (e.g., hidden lg:block)
      style={combinedStyle} // Apply combined styles
      animate={animation} // Apply looping animation
      transition={transition} // Apply animation transition
      // You could add whileInView animation here to fade them in as the section appears
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: initialStyle.opacity || opacity }}
      // viewport={{ once: true, amount: 0.1 }}
    ></motion.div>
  );
};

export default BackgroundGlow;