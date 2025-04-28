// src/components/Footer.js
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example icons

const Footer = () => {
  const footerLinks = {
    PRODUCT: ['Platform', 'Design', 'Edit mode', 'Security', 'Ecommerce', 'Analyze', 'Optimize', 'SEO'],
    SOLUTIONS: ['Enterprise', 'Startups', 'Global alliances', 'Agencies', 'Freelancers', 'Classrooms'],
    'ABOUT US': ['Company', 'Help Center', 'Support', 'Brand', 'Careers', 'Legal'],
    COMMUNITY: ['Discover the community', 'Partner with Webflow', 'Certified Partners', 'Become a template designer', 'Become an affiliate', 'Become a Global Leader'],
  };

  return (
    <footer className="bg-brand-dark border-t border-brand-gray-dark mt-20 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Social */}
          <div className="lg:col-span-2 mb-8 md:mb-0">
             <div className="flex items-center mb-4">
                {/* Replace with SVG Logo */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mr-2 text-brand-purple" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/> </svg>
               <span className="text-2xl font-bold text-white">Craftify</span>
             </div>
             <p className="text-brand-gray mb-6 max-w-xs">
               Join thousands of designers and teams using Framer to turn ideas into high-performing websites, fast.
             </p>
             <div className="flex space-x-4">
               <a href="#" className="text-brand-gray hover:text-white transition-colors"><Twitter size={20} /></a>
               <a href="#" className="text-brand-gray hover:text-white transition-colors"><Github size={20} /></a>
               <a href="#" className="text-brand-gray hover:text-white transition-colors"><Linkedin size={20} /></a>
             </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
             <div key={title}>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
                <ul className="space-y-2">
                   {links.map((link) => (
                     <li key={link}>
                       <a href="#" className="text-brand-gray hover:text-white text-sm transition-colors relative">
                         {link}
                         {(link === 'Ecommerce' || link === 'Optimize') && <span className="absolute -top-1 -right-8 ml-1 text-xs bg-brand-purple text-white px-1.5 py-0.5 rounded-sm">NEW</span>}
                        </a>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>

         {/* Newsletter */}
        <div className="border-t border-brand-gray-dark pt-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h4 className="text-lg font-semibold text-white mb-1">Get free note-taking workflows</h4>
              <p className="text-sm text-brand-gray">In our weekly newsletter.</p>
           </div>
           <form className="flex w-full md:w-auto">
               <input
                 type="email"
                 placeholder="Enter your email"
                 className="flex-grow md:w-80 px-4 py-2 bg-brand-gray-extradark border border-brand-gray-dark rounded-l-md text-white placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
                 required
               />
               <button
                 type="submit"
                 className="bg-brand-purple hover:bg-brand-purple-light text-white px-6 py-2 rounded-r-md font-semibold transition-colors"
               >
                 Subscribe
               </button>
           </form>
        </div>


        {/* Copyright & Bottom Links */}
        <div className="border-t border-brand-gray-dark pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-gray">
          <p>© {new Date().getFullYear()} Craftify App, LLC. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;