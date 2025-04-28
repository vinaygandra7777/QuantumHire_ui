// src/components/Navbar.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Example using lucide-react icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Start', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Resources', href: '#' },
    { name: 'Help', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-dark bg-opacity-80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
             <span className="text-2xl font-bold text-white">
               {/* Replace with SVG Logo */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mr-2 text-brand-purple" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/> </svg>
               QUANTUMHIRE
             </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-brand-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:block">
             <a href="#" className="text-brand-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-2 transition-colors">
               Login
             </a>
             <a
               href="#"
               className="bg-brand-purple hover:bg-brand-purple-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
             >
               Get started
             </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand-gray-dark inline-flex items-center justify-center p-2 rounded-md text-brand-gray hover:text-white hover:bg-brand-gray-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-white"
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
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-brand-gray hover:bg-brand-gray-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-brand-gray-dark px-5">
           <a href="#" className="block text-brand-gray hover:text-white px-3 py-2 rounded-md text-base font-medium mb-2 transition-colors">
               Login
           </a>
           <a
             href="#"
             className="block w-full text-center bg-brand-purple hover:bg-brand-purple-light text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
           >
             Get started
           </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;