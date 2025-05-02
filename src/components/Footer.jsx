import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Icons

const Footer = () => {
  const footerLinks = {
    FEATURES: ['AI Resume Builder', 'Job Match Analysis', 'ATS Optimization', 'Cover Letter Generator', 'Portfolio Builder', 'Career Dashboard'],
    SOLUTIONS: ['For Students', 'For Job Seekers', 'For Professionals', 'Career Coaches', 'HR Teams'],
    COMPANY: ['About', 'Careers', 'Help Center', 'Blog', 'Privacy Policy', 'Terms of Service'],
    RESOURCES: ['Resume Examples', 'Career Advice', 'Interview Tips', 'Salary Guide', 'Webinars', 'Templates Library'],
  };

  return (
    <footer className="bg-brand-dark border-t border-brand-gray-dark mt-20 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Social */}
          <div className="lg:col-span-2 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              {/* Replace with SVG Logo */}
          
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
    QuantumHire <span className="text-white">AI</span>
  </span>
            </div>
            <p className="text-brand-gray mb-6 max-w-xs font-[Exo]">
              Empowering you to craft resumes that get noticed. Build your career story with AI-driven precision.
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
                    <a href="#" className="text-brand-gray hover:text-white text-sm transition-colors relative font-[Exo]">
                      {link}
                      {(link === 'Cover Letter Generator' || link === 'Career Dashboard') && (
                        <span className="absolute -top-1 -right-15 ml-1 text-xs bg-brand-purple text-white px-1.5 py-0.5 rounded-lg"> NEW</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-brand-gray-dark pt-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 font-[Exo]">
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">Get Career Tips Weekly</h4>
            <p className="text-sm text-brand-gray">Insights, templates, and growth hacks delivered to your inbox.</p>
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

        {/* Copyright */}
        <div className="border-t border-brand-gray-dark pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-gray font-[Exo]">
          <p>© {new Date().getFullYear()} ResumeAI, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="opacity-50">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
