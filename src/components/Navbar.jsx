
// src/components/Navbar.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Example using lucide-react icons


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Adjusted links based on your existing structure
  const navLinks = [
    { name: 'Features', href: '#features' }, 
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }, // Link to the new FAQ section
    
    { name: 'Company', href: '#company' }, // Placeholder link
  ];

  return (
    // Navbar container: fixed top, full width, blur background, subtle bottom border
    // Using brand-card-dark for the background color as defined in your tailwind config
    <nav className="fixed top-0 w-full z-50 bg-brand-card-dark bg-opacity-20 backdrop-blur-lg border-brand-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main flex container for logo, links, and buttons */}
        <div className="flex items-center justify-between h-16"> {/* h-16 matches the height from reflect.app */}

          {/* Left Section: Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* Logo Link */}
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 bg-brand-purple rounded-md flex items-center justify-center mr-2">
                 
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
QuantumHire.<span className="text-white">AI</span>
</span>
              {/* Removed '.AI' gradient part for a cleaner look like reflect.app */}
            </a>
          </div>
          <div className="hidden md:flex flex-grow justify-center">
          
            <div className="flex items-center rounded-full border border-brand-gray-dark bg-brand-card-dark p-1"> {/* Added border, background, and slight padding (p-1) */}
              
              <div className="flex space-x-4"> {/* Adjust space-x for desired spacing between links */}
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    // Link styling: subtle gray default, white on hover, small padding
                    // Using text-white/60 for a less bright default state like reflect.app
                    className="text-white/60 hover:text-white px-3 py-1 text-sm font-medium transition-colors  font-['Exo']"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Buttons (Desktop Only) */}
          {/* Hidden on mobile, block layout on medium and larger screens */}
          {/* flex-shrink-0 ensures it doesn't shrink */}
          <div className="hidden md:flex items-center flex-shrink-0"> {/* Added items-center to align vertically */}
             {/* Login Button (Text Link) - Subtle, spaced from next button */}
             <a href="#" className="text-white/60 hover:text-white px-3 py-2 text-sm font-medium transition-colors mr-2"> {/* Adjusted text color and spacing */}
               Login
             </a>

             {/* Get Started/Trial Button (Filled Button) - Prominent, rounded, gradient-like background */}
             <a
               href="/dashboard" // Link to dashboard
               // Styling for the main button: rounded corners, padding, background
               // Using your brand-purple with a gradient effect (optional)
               // The reflect.app button has a subtle dark purple gradient
               // We can simulate this with gradient classes and maybe a border
               className="text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors
                          bg-gradient-to-br from-brand-purple-dark to-brand-purple
                          hover:from-brand-purple hover:to-brand-purple-light
                          shadow-lg" // Added shadow for depth
             >
               Get started {/* Changed text to match your button */}
             </a>
          </div>

          {/* Mobile Menu Button - Right Aligned */}
          {/* Visible on mobile, hidden on medium and larger screens */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              // Mobile button style: transparent background, text color indicates state
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card-dark focus:ring-white transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div> {/* End Main flex container */}
      </div> {/* End Max-w container */}

      {/* Mobile Menu, show/hide based on menu state. */}
      {/* Added background color to match the main navbar background */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-brand-card-dark`} id="mobile-menu">
        {/* Mobile Links: Block layout, padding, space-y for vertical gap */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              // Mobile links styling: block, padding, dark background on hover
              className="text-brand-gray hover:bg-brand-gray-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Mobile Buttons: Border top for separation, block layout, space-y for vertical gap */}
        <div className="pt-4 pb-3 border-t border-brand-gray-dark px-5 space-y-2"> {/* Added space-y */}
           {/* Login Button (Mobile) - Block */}
           <a href="#" className="block text-brand-gray hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors">
               Login
           </a>
           {/* Get Started Button (Mobile) - Block, Full width, prominent background */}
           <a
             href="/dashboard" // Link to dashboard
             // Mobile button styling: block, full width, prominent background
             className="block w-full text-center text-white px-4 py-2 rounded-md text-base font-medium transition-colors
                        bg-gradient-to-br from-brand-purple-dark to-brand-purple
                        hover:from-brand-purple hover:to-brand-purple-light"
             onClick={() => setIsOpen(false)} // Close menu on link click
           >
             Get started
           </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;