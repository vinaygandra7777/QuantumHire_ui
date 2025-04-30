import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, SparkleIcon } from 'lucide-react'; // Example Icons
import DashboardLayout from '../../Layouts/DashboardLayout';

const Sidebar = () => {
  const navItems = [
    { name: 'ATS Score', icon: SparkleIcon, href: '#' }, // Replace # with actual paths
    { name: 'Resume Builder', icon: FileText, href: '#' },
    { name: 'Best Resume Picker', icon: FileText, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
  ];

  return (
    
    <aside className="fixed top-0 left-0 z-30 w-64 h-screen pt-16 transition-transform -translate-x-full bg-brand-gray-extradark border-r border-brand-gray-dark md:translate-x-0" aria-label="Sidebar"> 
       {/* Adjust pt */}
        <div className="h-full px-3 pb-4 overflow-y-auto bg-brand-gray-extradark">
        <div className="flex items-center mb-3 border-b border-brand-gray-dark"> {/* Use flex to align icon and text */}
                   <LayoutDashboard className="w-5 h-5 text-brand-gray mr-3" /> {/* Add the icon */}
                   <h3 className="text-lg font-bold text-white">Dashboard</h3>
               </div>
            <ul className="space-y-4 font-medium mt-4">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className="flex items-center p-2 text-brand-gray rounded-lg hover:bg-brand-gray-dark hover:text-white group"
                        >
                            <item.icon className="w-5 h-5 text-brand-gray transition duration-75 group-hover:text-white" />
                            <span className="ms-3">{item.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
            {/* Logout or User Profile Section */}
            <div className="absolute bottom-4 left-0 right-0 px-3">
                <a
                    href="#" // Logout link
                    className="flex items-center p-2 text-brand-gray rounded-lg hover:bg-brand-gray-dark hover:text-white group"
                >
                    <LogOut className="w-5 h-5 text-brand-gray transition duration-75 group-hover:text-white" />
                    <span className="ms-3">Log Out</span>
                </a>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;