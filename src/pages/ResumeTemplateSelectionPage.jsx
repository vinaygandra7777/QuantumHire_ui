import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define available templates with their routes, info, and thumbnail paths
const templates = [
    {
        id: 'template1',
        name: 'Classic Professional',
        route: '/resume-builder', // The route for the existing component (Template 1)
        description: 'A clean, traditional layout suitable for most industries.',
        thumbnail: '/src/assets/Template1.png', // <--- Add path to your image in public/images
    },
     {
        id: 'template2',
        name: 'Modern Minimalist',
        route: '/ResumeBuilderTemplate2', // The route for the new component (Template 2)
        description: 'A modern design with clear sections and a timeline style.',
        thumbnail: '/src/assets/Template3.png', // <--- Add path to your image in public/images
    },
    // Add more templates here
    // {
    //     id: 'template3',
    //     name: 'Creative Layout',
    //     route: '/resume-builder-template3',
    //     description: 'A unique layout for creative fields.',
    //     thumbnail: '/images/template3-thumb.png', // <--- Add path
    // },
];

const ResumeTemplateSelectionPage = () => {
    const navigate = useNavigate();

    const handleTemplateSelect = (route) => {
        navigate(route);
    };

    return (
        <DashboardLayout>
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-white mb-8 mt-10">
                Select a Resume Template
            </h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
            >
                {templates.map(template => (
                    <motion.div
                        key={template.id}
                        className="bg-brand-card-dark p-6 rounded-lg shadow-lg border border-brand-gray-dark cursor-pointer hover:border-brand-purple transition-colors duration-200 flex flex-col" // Added flex flex-col
                        onClick={() => handleTemplateSelect(template.route)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                         {/* --- ADD THUMBNAIL IMAGE HERE --- */}
                         {template.thumbnail && (
                             <img
                                 src={template.thumbnail}
                                 alt={`${template.name} Thumbnail`}
                                 className="w-full h-100 object-cover rounded-md mb-4 border border-brand-gray-medium flex-shrink-0" // Added flex-shrink-0, adjusted height and border color
                             />
                         )}

                        <h2 className="text-xl font-semibold text-white mb-2">{template.name}</h2>
                        <p className="text-brand-gray text-sm flex-grow">{template.description}</p> {/* Added flex-grow to push button down */}

                         {/* Select Button/Link */}
                         <div className="mt-4 text-right flex-shrink-0"> {/* Added flex-shrink-0 */}
                             <span className="text-brand-purple hover:underline text-sm font-semibold">Select Template →</span>
                         </div>
                    </motion.div>
                ))}
            </motion.div>

             {/* Optional: Message for more templates */}
             {/* templates.length < 3 && ( // Example: Show message if less than 3 templates */}
             {/*    <p className="text-center text-brand-gray mt-8">More templates coming soon!</p> */}
             {/* ) */}

        </DashboardLayout>
    );
};

export default ResumeTemplateSelectionPage;