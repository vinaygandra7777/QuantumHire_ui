
import { useState, useRef } from 'react';
// Install html2pdf.js: npm install html2pdf.js
import html2pdf from 'html2pdf.js'; // Import the library
import DashboardLayout from '../Layouts/DashboardLayout'; // <--- Import DashboardLayout
// Import icons from lucide-react (Install: npm install lucide-react)
import { Phone, MapPin, Mail, Github, Linkedin, Edit, CheckCircle, Trash2, PlusCircle, UploadCloud, Eye, EyeOff } from 'lucide-react';


// Main Resume Builder Component
export default function ResumeBuilder() {
    // Resume state with default values based on the provided resume
    // Refactored projects to use a 'links' array consistently
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            name: 'VINAY KUMAR REDDY GANDRA',
            // Added title and location based on common resume structure and template 2 idea
            phone: '9014583641',
            location: 'Hyderabad, India', // Added location field
            email: 'vinaygandra7777@gmail.com',
            linkedin: 'www.linkedin.com/in/gandra-vinay-297376266',
            github: 'https://github.com/vinaygandra7777',
            photo: '', // Added photo field (data URL)
        },
        careerObjective: 'Detail-oriented and analytical fresher with strong SQL, Python, and business communication skills. Quick learner with a solid grasp of cloud platforms and data visualization tools. Seeking an opportunity to apply technical expertise and problem-solving abilities in a dynamic environment.',
        // Education remains a single object as in the first template
        education: {
            degree: 'Bachelor of Technology (Electrical and Communication Engineering)',
            gpa: '8.59/10',
            institution: 'Sreenidhi Institute of Science and Technology, Hyderabad.',
            years: '2020 – 2024',
        },
        skills: [
            'Programming Languages: Python, JavaScript',
            'Web Technologies: Html5, Css3, Bootstrap5, Node.js, Express.js',
            'Databases: Mysql, Firebase',
            'AI/ML Technologies: Generative AI, Machine Learning',
            'Tools: Git, Github, VsCode, PyCharm',
            'Soft Skills: Problem Solving, Leadership, Good Communication skills, Critical Thinking',
        ],
        projects: [
            {
                title: 'White Wine Quality Prediction using Python and Machine Learning',
                description: [
                    'Developed an efficient machine learning model in Python to predict the quality of white wine using physicochemical properties.',
                    'Utilized Random Forest Regression, a robust ensemble learning algorithm, to achieve accurate predictions.',
                    'Leveraged Python libraries such as pandas and matplotlib to build, analyze, and visualize the solution, highlighting the impact of key features on wine quality.',
                ],
                links: [], // Use links array consistently
            },
            {
                title: 'Starbucks Website Clone | HTML, CSS, JAVASCRIPT, FIREBASE',
                description: [
                    'Built a fully functional online ordering system using HTML(30%), CSS(20%), JavaScript(45%), and Firebase(5%) for user authentication.',
                    'Implemented key features like user login, menu browsing, cart management, and order summary.',
                    'Deployed the platform on GitHub Pages, showcasing skills in web development and version control.',
                ],
                links: [{ name: 'Project Link', url: 'https://vinaygandra7777.github.io/onlinefooddelivery/' }],
            },
            {
                title: 'Genii AI Chat – An Interactive AI-Powered Chatbot| HTML, CSS, JAVASCRIPT',
                description: [
                    'Developed an interactive chatbot using HTML(15%), CSS(15%), JavaScript(30%).',
                    'Integrated NLP capabilities from Gemini AI (40%), enabling natural language understanding for more human-like conversations.',
                    'Added user-friendly features like light mode and clear chat.',
                ],
                links: [{ name: 'Project Link', url: 'https://vinaygandra7777.github.io/geminiai/' }],
            },
            {
                title: 'Responsive Web Design Projects: The Burger Box & Lumin Serum | HTML,CSS',
                description: [
                    'Designed two responsive websites using HTML, CSS, and JavaScript.',
                    'Focused on mobile-first development ensuring cross-device compatibility.',
                ],
                links: [
                    { name: 'Burger Box', url: 'https://vinaygandra7777.github.io/BurgerBox/' },
                    { name: 'Lumin Serum', url: 'https://vinaygandra7777.github.io/serum/' },
                ],
            },
        ],
        certifications: [
            'Google AI-ML virtual Internship: Learned machine learning fundamentals, model development, and AI applications.',
            'Google Cloud Generative AI Training – Completed Google Cloud\'s Generative AI course, gaining expertise in AI model deployment, responsible AI, and foundation models.',
            'AWS Academy Cloud Architecting: Built cloud-based infrastructure to optimize business operations.',
            'Relevant Coursework: Data structures and Algorithms, Database Management Systems, Object-Oriented Programming (OOP), Generative AI & Machine Learning',
        ],
    });

    // State to track which sections are being edited (added from template 2 idea)
    const [editingSections, setEditingSections] = useState({
        personalInfo: false,
        careerObjective: false,
        education: false,
        skills: false,
        projects: false,
        certifications: false,
    });

    // State to control which sections are visible in the preview (added from template 2)
    const [visibleSections, setVisibleSections] = useState([
        'personalInfo',
        'careerObjective',
        'education',
        'skills',
        'projects',
        'certifications',
    ]);


    const [activeTab, setActiveTab] = useState('edit');
    const resumeRef = useRef(null);

    // --- Generic Handlers for Editing/Visibility ---

    // Toggles the edit mode for a specific section
    const toggleEditSection = (section) => {
        setEditingSections({
            ...editingSections,
            [section]: !editingSections[section],
        });
    };

     // Toggles visibility of a section in the preview (added)
    const toggleSectionVisibility = (sectionId) => {
        setVisibleSections(prevVisible =>
            prevVisible.includes(sectionId)
                ? prevVisible.filter(id => id !== sectionId)
                : [...prevVisible, sectionId]
        );
    };

    // Handles changes for simple object properties (e.g., personalInfo fields, Education fields)
    const handleObjectInputChange = (section, field, value) => {
        setResumeData({
            ...resumeData,
            [section]: {
                ...resumeData[section],
                [field]: value,
            },
        });
    };

     // Handles changes for the careerObjective textarea (added)
     const handleTextareaChange = (value) => {
        setResumeData({
            ...resumeData,
            careerObjective: value,
        });
    };

    // Handles changes for items within simple arrays (e.g., skills, certifications)
    const handleSimpleArrayItemChange = (section, index, value) => {
        const updatedArray = [...resumeData[section]];
        updatedArray[index] = value;
        setResumeData({
            ...resumeData,
            [section]: updatedArray,
        });
    };

    // Handles adding a new item to simple arrays (skills, certifications)
    const handleAddArrayItem = (section, defaultValue = '') => {
        setResumeData({
            ...resumeData,
            [section]: [...resumeData[section], defaultValue],
        });
    };

    // Handles removing an item from simple arrays (skills, certifications)
    const handleRemoveArrayItem = (section, index) => {
        const updatedArray = [...resumeData[section]];
        updatedArray.splice(index, 1);
        setResumeData({
            ...resumeData,
            [section]: updatedArray,
        });
    };

    // --- Project Specific Handlers (from original code, slightly refactored) ---

    // Handles changes for top-level fields in a project object (like title)
    const handleProjectFieldChange = (projectIndex, field, value) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects[projectIndex] = {
            ...updatedProjects[projectIndex],
            [field]: value,
        };
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Handles changes for description bullets within a project
    const handleProjectDescriptionChange = (projectIndex, descIndex, value) => {
        const updatedProjects = [...resumeData.projects];
        const updatedDesc = [...updatedProjects[projectIndex].description];
        updatedDesc[descIndex] = value;
        updatedProjects[projectIndex].description = updatedDesc;
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Adds a new bullet to a project's description
    const handleAddProjectBullet = (projectIndex) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects[projectIndex].description.push('');
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Removes a bullet from a project's description
    const handleRemoveProjectBullet = (projectIndex, descIndex) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects[projectIndex].description.splice(descIndex, 1);
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Handles changes for fields within a project link object (name or url)
    const handleProjectLinkChange = (projectIndex, linkIndex, field, value) => {
        const updatedProjects = [...resumeData.projects];
        const updatedLinks = [...updatedProjects[projectIndex].links];
        updatedLinks[linkIndex] = {
            ...updatedLinks[linkIndex],
            [field]: value,
        };
        updatedProjects[projectIndex].links = updatedLinks;
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Adds a new link object to a project's links array
    const handleAddProjectLink = (projectIndex) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects[projectIndex].links.push({ name: '', url: '' });
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Removes a link object from a project's links array
    const handleRemoveProjectLink = (projectIndex, linkIndex) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects[projectIndex].links.splice(linkIndex, 1);
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // Adds an entirely new project object
    const handleAddProject = () => {
        setResumeData({
            ...resumeData,
            projects: [
                ...resumeData.projects,
                {
                    title: 'New Project',
                    description: ['Project description bullet'],
                    links: [],
                },
            ],
        });
    };

    // Removes an entire project object
    const handleRemoveProject = (index) => {
        const updatedProjects = [...resumeData.projects];
        updatedProjects.splice(index, 1);
        setResumeData({
            ...resumeData,
            projects: updatedProjects,
        });
    };

    // --- Photo Handling (added) ---
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData(prevData => ({
                    ...prevData,
                    personalInfo: {
                        ...prevData.personalInfo,
                        photo: reader.result, // Store as data URL
                    },
                }));
            };
            reader.readAsDataURL(file); // Read file as data URL
        } else {
            alert("Please upload an image file.");
        }
        // Clear file input value so the same file can be selected again after removal
        event.target.value = '';
    };

    const handleRemovePhoto = () => {
        setResumeData(prevData => ({
            ...prevData,
            personalInfo: {
                ...prevData.personalInfo,
                photo: '',
            },
        }));
    };


    // --- PDF Download Handler ---
    const downloadPDF = () => {
        const element = resumeRef.current;
        if (!element) {
            console.error("Resume element not found for PDF generation.");
            alert("Error: Could not find the resume preview element.");
            return;
        }

        // Define PDF options
        const opt = {
            margin: 10,
            filename: `${resumeData.personalInfo.name.replace(/\s+/g, '_').toLowerCase()}_resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true, useCORS: true }, // useCORS important for photo
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please ensure the preview is fully loaded and try again.");
        }
    };


    return (
        // Wrap the content in DashboardLayout
        <DashboardLayout>
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-white mb-8"> {/* Added title */}
                Resume Builder
            </h1>

            <div className="container mx-auto p-0 flex-grow flex flex-col md:flex-row gap-6"> {/* Removed container padding here, handled by Layout */}
                {/* Edit/Controls Column */}
                <div className="w-full md:w-1/3 bg-brand-card-dark p-4 rounded-lg shadow-lg border border-brand-gray-dark sticky top-4 max-h-[calc(100vh-40px)] overflow-y-auto custom-scrollbar"> {/* Applied dark theme styles, sticky, max-height, custom-scrollbar */}
                    <div className="flex mb-4 border-b border-brand-gray-dark"> {/* Applied dark theme border */}
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`flex items-center px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-light
                ${activeTab === 'edit' ? 'border-b-2 border-brand-purple text-white' : 'text-brand-gray hover:text-white'}`}
                        >
                            <span className="mr-2">✏️</span>
                            Edit
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`flex items-center px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple-light
                ${activeTab === 'preview' ? 'border-b-2 border-brand-purple text-white' : 'text-brand-gray hover:text-white'}`}
                        >
                            <span className="mr-2">👁️</span>
                            Preview
                        </button>
                    </div>

                    {/* Edit Tab Content */}
                    {activeTab === 'edit' && (
                        <div className="space-y-6 pb-4"> {/* Adjusted max-height, added pb-4 */}

                            {/* Personal Information Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Personal Information</h2> {/* Applied dark theme text */}
                                    <div className="flex items-center gap-2">
                                         {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('personalInfo')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('personalInfo') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('personalInfo') ? 'Hide Personal Info' : 'Show Personal Info'}
                                            title={visibleSections.includes('personalInfo') ? 'Hide Personal Info' : 'Show Personal Info'}
                                        >
                                            {visibleSections.includes('personalInfo') ? <Eye size={14} /> : <EyeOff size={14} />}
                                             <span className="hidden sm:inline">{visibleSections.includes('personalInfo') ? 'Hide' : 'Show'}</span>
                                        </button>
                                        {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('personalInfo')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.personalInfo ? 'Done Editing Personal Info' : 'Edit Personal Info'}
                                             title={editingSections.personalInfo ? 'Done Editing Personal Info' : 'Edit Personal Info'}
                                        >
                                            {editingSections.personalInfo ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {editingSections.personalInfo ? (
                                    <div className="space-y-3 text-sm"> {/* Added text-sm for inputs */}
                                         {/* Photo Upload/Remove */}
                                        <div className="flex flex-col items-center gap-3 mb-4">
                                            
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-brand-gray">Full Name</label> {/* Applied dark theme text */}
                                            <input
                                                id="name"
                                                type="text"
                                                value={resumeData.personalInfo.name}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'name', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                         
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-brand-gray">Email</label> {/* Applied dark theme text */}
                                            <input
                                                id="email"
                                                type="email"
                                                value={resumeData.personalInfo.email}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'email', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-brand-gray">Phone</label> {/* Applied dark theme text */}
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={resumeData.personalInfo.phone}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'phone', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                         <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-brand-gray">Location</label> {/* Applied dark theme text */}
                                            <input
                                                id="location"
                                                type="text"
                                                value={resumeData.personalInfo.location}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'location', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="linkedin" className="block text-sm font-medium text-brand-gray">LinkedIn</label> {/* Applied dark theme text */}
                                            <input
                                                id="linkedin"
                                                type="text"
                                                value={resumeData.personalInfo.linkedin}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'linkedin', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="github" className="block text-sm font-medium text-brand-gray">GitHub</label> {/* Applied dark theme text */}
                                            <input
                                                id="github"
                                                type="text"
                                                value={resumeData.personalInfo.github}
                                                onChange={(e) => handleObjectInputChange('personalInfo', 'github', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-brand-gray-light text-sm"> {/* Applied dark theme text, text-sm */}
                                        <p><span className="font-medium text-white">Name:</span> {resumeData.personalInfo.name}</p> {/* Applied dark theme text */}
                                         {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">Email:</span> {resumeData.personalInfo.email}</p> {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">Phone:</span> {resumeData.personalInfo.phone}</p> {/* Applied dark theme text */}
                                         <p><span className="font-medium text-white">Location:</span> {resumeData.personalInfo.location}</p> {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">LinkedIn:</span> {resumeData.personalInfo.linkedin}</p> {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">GitHub:</span> {resumeData.personalInfo.github}</p> {/* Applied dark theme text */}
                                        {resumeData.personalInfo.photo && <p><span className="font-medium text-white">Photo:</span> Added</p>}
                                    </div>
                                )}
                            </div>

                            {/* Career Objective Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Career Objective</h2> {/* Applied dark theme text */}
                                     <div className="flex items-center gap-2">
                                        {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('careerObjective')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('careerObjective') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('careerObjective') ? 'Hide Career Objective' : 'Show Career Objective'}
                                            title={visibleSections.includes('careerObjective') ? 'Hide Career Objective' : 'Show Career Objective'}
                                        >
                                             {visibleSections.includes('careerObjective') ? <Eye size={14} /> : <EyeOff size={14} />}
                                             <span className="hidden sm:inline">{visibleSections.includes('careerObjective') ? 'Hide' : 'Show'}</span>
                                        </button>
                                         {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('careerObjective')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.careerObjective ? 'Done Editing Career Objective' : 'Edit Career Objective'}
                                             title={editingSections.careerObjective ? 'Done Editing Career Objective' : 'Edit Career Objective'}
                                        >
                                            {editingSections.careerObjective ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                     </div>
                                </div>

                                {editingSections.careerObjective ? (
                                    <div>
                                        <label htmlFor="objective" className="sr-only">Career Objective</label>
                                        <textarea
                                            id="objective"
                                            value={resumeData.careerObjective}
                                            onChange={(e) => handleTextareaChange(e.target.value)} // Use handleTextareaChange
                                            className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border h-32 bg-brand-black text-gray-light text-sm"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-brand-gray-light text-sm">{resumeData.careerObjective}</p>
                                )}
                            </div>

                            {/* Education Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Education</h2> {/* Applied dark theme text */}
                                     <div className="flex items-center gap-2">
                                        {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('education')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('education') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('education') ? 'Hide Education' : 'Show Education'}
                                            title={visibleSections.includes('education') ? 'Hide Education' : 'Show Education'}
                                        >
                                            {visibleSections.includes('education') ? <Eye size={14} /> : <EyeOff size={14} />}
                                             <span className="hidden sm:inline">{visibleSections.includes('education') ? 'Hide' : 'Show'}</span>
                                        </button>
                                         {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('education')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.education ? 'Done Editing Education' : 'Edit Education'}
                                             title={editingSections.education ? 'Done Editing Education' : 'Edit Education'}
                                        >
                                            {editingSections.education ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                     </div>
                                </div>

                                {editingSections.education ? (
                                    <div className="space-y-3 text-sm"> {/* Added text-sm for inputs */}
                                        <div>
                                            <label htmlFor="degree" className="block text-sm font-medium text-brand-gray">Degree</label> {/* Applied dark theme text */}
                                            <input
                                                id="degree"
                                                type="text"
                                                value={resumeData.education.degree}
                                                onChange={(e) => handleObjectInputChange('education', 'degree', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="gpa" className="block text-sm font-medium text-brand-gray">GPA</label> {/* Applied dark theme text */}
                                            <input
                                                id="gpa"
                                                type="text"
                                                value={resumeData.education.gpa}
                                                onChange={(e) => handleObjectInputChange('education', 'gpa', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="institution" className="block text-sm font-medium text-brand-gray">Institution</label> {/* Applied dark theme text */}
                                            <input
                                                id="institution"
                                                type="text"
                                                value={resumeData.education.institution}
                                                onChange={(e) => handleObjectInputChange('education', 'institution', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="years" className="block text-sm font-medium text-brand-gray">Years</label> {/* Applied dark theme text */}
                                            <input
                                                id="years"
                                                type="text"
                                                value={resumeData.education.years}
                                                onChange={(e) => handleObjectInputChange('education', 'years', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-brand-gray-light text-sm"> {/* Applied dark theme text, text-sm */}
                                        <p><span className="font-medium text-white">Degree:</span> {resumeData.education.degree}</p> {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">GPA:</span> {resumeData.education.gpa}</p> {/* Applied dark theme text */}
                                        <p><span className="font-medium text-white">Institution:</span> {resumeData.education.institution} {resumeData.education.years}</p> {/* Applied dark theme text */}
                                    </div>
                                )}
                            </div>

                            {/* Skills Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Skills</h2> {/* Applied dark theme text */}
                                     <div className="flex items-center gap-2">
                                         {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('skills')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('skills') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('skills') ? 'Hide Skills' : 'Show Skills'}
                                            title={visibleSections.includes('skills') ? 'Hide Skills' : 'Show Skills'}
                                        >
                                            {visibleSections.includes('skills') ? <Eye size={14} /> : <EyeOff size={14} />}
                                            <span className="hidden sm:inline">{visibleSections.includes('skills') ? 'Hide' : 'Show'}</span>
                                        </button>
                                         {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('skills')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.skills ? 'Done Editing Skills' : 'Edit Skills'}
                                             title={editingSections.skills ? 'Done Editing Skills' : 'Edit Skills'}
                                        >
                                            {editingSections.skills ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                     </div>
                                </div>

                                {editingSections.skills ? (
                                    <div className="space-y-3">
                                        {resumeData.skills.map((skill, index) => (
                                             skill !== null && skill !== undefined && ( // Added check for null/undefined items
                                            <div key={`skill-edit-${index}`} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) => handleSimpleArrayItemChange('skills', index, e.target.value)}
                                                    className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                                                    aria-label={`Skill ${index + 1}`}
                                                />
                                                <button
                                                    onClick={() => handleRemoveArrayItem('skills', index)}
                                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none"
                                                    aria-label={`Remove Skill ${index + 1}`}
                                                     title={`Remove Skill ${index + 1}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                             )
                                        ))}
                                        <button
                                            onClick={() => handleAddArrayItem('skills', 'New Skill: ')}
                                            className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none text-sm flex items-center gap-1"
                                        >
                                             <PlusCircle size={16} /> Add Skill
                                        </button>
                                    </div>
                                ) : (
                                    <ul className="list-disc pl-5 text-sm space-y-0.5 text-brand-gray-light"> {/* Applied dark theme text, text-sm, space-y */}
                                        {resumeData.skills.map((skill, index) => (
                                             skill && <li key={`skill-preview-${index}`}>{skill}</li> // Only show non-empty skills
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Projects</h2> {/* Applied dark theme text */}
                                     <div className="flex items-center gap-2">
                                        {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('projects')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('projects') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('projects') ? 'Hide Projects' : 'Show Projects'}
                                            title={visibleSections.includes('projects') ? 'Hide Projects' : 'Show Projects'}
                                        >
                                            {visibleSections.includes('projects') ? <Eye size={14} /> : <EyeOff size={14} />}
                                            <span className="hidden sm:inline">{visibleSections.includes('projects') ? 'Hide' : 'Show'}</span>
                                        </button>
                                         {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('projects')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.projects ? 'Done Editing Projects' : 'Edit Projects'}
                                             title={editingSections.projects ? 'Done Editing Projects' : 'Edit Projects'}
                                        >
                                            {editingSections.projects ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                     </div>
                                </div>

                                {editingSections.projects ? (
                                    <div className="space-y-6">
                                        {resumeData.projects.map((project, projectIndex) => (
                                             project !== null && project !== undefined && ( // Added check for null/undefined project items
                                            <div key={`project-edit-${projectIndex}`} className="border border-brand-gray-medium p-3 rounded bg-brand-gray-dark space-y-3 text-sm"> {/* Applied dark theme styles, text-sm */}
                                                <div className="flex justify-between items-center mb-3 border-b border-brand-gray-medium pb-2"> {/* Applied dark theme styles */}
                                                    <h3 className="font-semibold text-md text-white">Project {projectIndex + 1}</h3> {/* Applied dark theme text */}
                                                    <button
                                                        onClick={() => handleRemoveProject(projectIndex)}
                                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs focus:outline-none"
                                                        aria-label={`Remove Project ${projectIndex + 1}`}
                                                         title={`Remove Project ${projectIndex + 1}`}
                                                    >
                                                        Remove Project
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label htmlFor={`project-title-${projectIndex}`} className="block text-sm font-medium text-brand-gray">Title</label> {/* Applied dark theme text */}
                                                        <input
                                                            id={`project-title-${projectIndex}`}
                                                            type="text"
                                                            value={project.title}
                                                            onChange={(e) => handleProjectFieldChange(projectIndex, 'title', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light"
                                                        />
                                                    </div>

                                                    {/* Project Description Bullets */}
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <label className="block text-sm font-medium text-brand-gray">Description Bullets</label> {/* Applied dark theme text */}
                                                            <button
                                                                onClick={() => handleAddProjectBullet(projectIndex)}
                                                                className="px-2 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none flex items-center gap-1"
                                                                aria-label={`Add description bullet to Project ${projectIndex + 1}`}
                                                                 title={`Add description bullet to Project ${projectIndex + 1}`}
                                                            >
                                                                <PlusCircle size={12} /> Add Bullet
                                                            </button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {project.description.map((desc, descIndex) => (
                                                                 desc !== null && desc !== undefined && ( // Added check for null/undefined bullets
                                                                    <div key={`desc-edit-${projectIndex}-${descIndex}`} className="flex items-start gap-2">
                                                                        <input
                                                                            type="text"
                                                                            value={desc}
                                                                            onChange={(e) => handleProjectDescriptionChange(projectIndex, descIndex, e.target.value)}
                                                                            className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                                                                            aria-label={`Project ${projectIndex + 1} description bullet ${descIndex + 1}`}
                                                                        />
                                                                        {project.description.length > 1 && ( // Don't allow removing the last bullet
                                                                            <button
                                                                                onClick={() => handleRemoveProjectBullet(projectIndex, descIndex)}
                                                                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none flex-shrink-0"
                                                                                aria-label={`Remove description bullet ${descIndex + 1} from Project ${projectIndex + 1}`}
                                                                                 title={`Remove description bullet ${descIndex + 1} from Project ${projectIndex + 1}`}
                                                                            >
                                                                                <Trash2 size={14} />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                 )
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Project Links */}
                                                    <div>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <label className="block text-sm font-medium text-brand-gray">Links</label> {/* Applied dark theme text */}
                                                            <button
                                                                onClick={() => handleAddProjectLink(projectIndex)}
                                                                className="px-2 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none flex items-center gap-1"
                                                                aria-label={`Add link to Project ${projectIndex + 1}`}
                                                                 title={`Add link to Project ${projectIndex + 1}`}
                                                            >
                                                                <PlusCircle size={12} /> Add Link
                                                            </button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {project.links.map((link, linkIndex) => (
                                                                 link !== null && link !== undefined && ( // Added check for null/undefined link items
                                                                <div key={`link-edit-${projectIndex}-${linkIndex}`} className="flex flex-col sm:flex-row gap-2 border border-brand-gray-medium p-2 rounded"> {/* Applied dark theme styles */}
                                                                    <div className="flex-grow">
                                                                        <label htmlFor={`project-${projectIndex}-link-name-${linkIndex}`} className="block text-xs font-medium text-brand-gray">Link Name</label> {/* Applied dark theme text */}
                                                                        <input
                                                                            id={`project-${projectIndex}-link-name-${linkIndex}`}
                                                                            type="text"
                                                                            value={link.name}
                                                                            onChange={(e) => handleProjectLinkChange(projectIndex, linkIndex, 'name', e.target.value)}
                                                                            className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                                                                            aria-label={`Project ${projectIndex + 1} Link ${linkIndex + 1} Name`}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <label htmlFor={`project-${projectIndex}-link-url-${linkIndex}`} className="block text-xs font-medium text-brand-gray">URL</label>
                                                                        <input
                                                                            id={`project-${projectIndex}-link-url-${linkIndex}`}
                                                                            type="text"
                                                                            value={link.url}
                                                                            onChange={(e) => handleProjectLinkChange(projectIndex, linkIndex, 'url', e.target.value)}
                                                                            className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                                                                            aria-label={`Project ${projectIndex + 1} Link ${linkIndex + 1} URL`}
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleRemoveProjectLink(projectIndex, linkIndex)}
                                                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm self-center focus:outline-none flex-shrink-0"
                                                                        aria-label={`Remove Link ${linkIndex + 1} from Project ${projectIndex + 1}`}
                                                                         title={`Remove Link ${linkIndex + 1} from Project ${projectIndex + 1}`}
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                                 )
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                             )
                                        ))}

                                        <button
                                            onClick={handleAddProject}
                                            className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none text-sm flex items-center gap-1"
                                        >
                                            <PlusCircle size={16} /> Add Project
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-brand-gray-light text-sm"> {/* Applied dark theme text, text-sm */}
                                        {resumeData.projects.map((project, projectIndex) => (
                                             project && ( // Check if project object is not null/undefined
                                                <div key={`project-preview-${projectIndex}`}>
                                                    <h3 className="font-medium text-white">{project.title}</h3> {/* Applied dark theme text */}
                                                    {project.description && project.description.length > 0 && (
                                                        <ul className="list-disc pl-5 text-sm space-y-0.5">
                                                            {project.description.map((desc, descIndex) => (
                                                                desc && <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li> // Only show non-empty bullets
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {project.links && project.links.length > 0 && (
                                                        <div className="text-sm mt-1 space-y-0.5">
                                                            {project.links.map((link, linkIndex) => (
                                                                link && link.url && <p key={`link-preview-${projectIndex}-${linkIndex}`}> {/* Only show links with URLs */}
                                                                    <span className="font-medium text-white">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-brand-purple underline break-all hover:text-brand-purple-light">{link.url}</a> {/* Applied dark theme link styles */}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Certifications Section */}
                            <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg text-white">Certifications</h2> {/* Applied dark theme text */}
                                     <div className="flex items-center gap-2">
                                        {/* Visibility Toggle */}
                                        <button
                                            onClick={() => toggleSectionVisibility('certifications')}
                                            className={`p-1 rounded text-xs font-semibold flex items-center gap-1 ${visibleSections.includes('certifications') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                                            aria-label={visibleSections.includes('certifications') ? 'Hide Certifications' : 'Show Certifications'}
                                            title={visibleSections.includes('certifications') ? 'Hide Certifications' : 'Show Certifications'}
                                        >
                                            {visibleSections.includes('certifications') ? <Eye size={14} /> : <EyeOff size={14} />}
                                            <span className="hidden sm:inline">{visibleSections.includes('certifications') ? 'Hide' : 'Show'}</span>
                                        </button>
                                         {/* Edit Toggle */}
                                        <button
                                            onClick={() => toggleEditSection('certifications')}
                                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                                            aria-label={editingSections.certifications ? 'Done Editing Certifications' : 'Edit Certifications'}
                                             title={editingSections.certifications ? 'Done Editing Certifications' : 'Edit Certifications'}
                                        >
                                            {editingSections.certifications ? <CheckCircle size={20} /> : <Edit size={20} />}
                                        </button>
                                     </div>
                                </div>

                                {editingSections.certifications ? (
                                    <div className="space-y-3">
                                        {resumeData.certifications.map((cert, index) => (
                                             cert !== null && cert !== undefined && ( // Added check for null/undefined items
                                            <div key={`cert-edit-${index}`} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={cert}
                                                    onChange={(e) => handleSimpleArrayItemChange('certifications', index, e.target.value)}
                                                    className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                                                    aria-label={`Certification ${index + 1}`}
                                                />
                                                <button
                                                    onClick={() => handleRemoveArrayItem('certifications', index)}
                                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none"
                                                    aria-label={`Remove Certification ${index + 1}`}
                                                     title={`Remove Certification ${index + 1}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                             )
                                        ))}
                                        <button
                                            onClick={() => handleAddArrayItem('certifications', 'New Certification: ')}
                                            className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none text-sm flex items-center gap-1"
                                        >
                                            <PlusCircle size={16} /> Add Certification
                                        </button>
                                    </div>
                                ) : (
                                    <ul className="list-disc pl-5 text-sm space-y-0.5 text-brand-gray-light"> {/* Applied dark theme text, text-sm, space-y */}
                                        {resumeData.certifications.map((cert, index) => (
                                             cert && <li key={`cert-preview-${index}`}>{cert}</li> // Only show non-empty certs
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Preview Tab Content */}
                    {activeTab === 'preview' && (
                        <div className="pb-4"> {/* Adjusted max-height, added pb-4 */}
                            <p className="mb-4 text-brand-gray text-sm">Review your resume before downloading. The layout here is approximate and may vary slightly in the final PDF. Content length affects single-page fitting.</p> {/* Applied dark theme text */}
                            <button
                                onClick={downloadPDF}
                                className="w-full flex items-center justify-center px-4 py-2 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none"
                            >
                                <span className="mr-2">📥</span>
                                Download as PDF
                            </button>
                             <p className="text-xs text-brand-gray mt-2 text-center">
                                Note: Content length may cause the PDF to exceed one page.
                            </p>
                        </div>
                    )}
                </div>

                {/* Resume Preview Column */}
                {/* This column contains the actual resume content that gets converted to PDF */}
                <div className="w-full md:w-2/3">
                    <div className="bg-brand-card-dark p-6 rounded-lg shadow-lg border border-brand-gray-dark sticky top-4 max-h-[calc(100vh-40px)] overflow-y-auto custom-scrollbar"> {/* Applied dark theme styles, sticky, max-height, custom-scrollbar */}
                        {/* This is the div that html2pdf will target - KEEP WHITE BACKGROUND for PDF */}
                        <div
                            ref={resumeRef}
                            className="w-full mx-auto bg-white p-6 text-black font-sans" // KEEP bg-white and default text-black for PDF, ensured font-sans
                            style={{ maxWidth: '800px', minHeight: '1056px', lineHeight: '1.4' }} // Adjusted minHeight for A4, added line-height
                        >
                            {/* Resume Header - Use text-black or gray shades for readability on white PDF */}
                            {visibleSections.includes('personalInfo') && (
                                <div className="text-center mb-6">
                                     {resumeData.personalInfo.photo && (
                                         <img src={resumeData.personalInfo.photo} alt="Profile Photo" className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border border-gray-300" />
                                     )}
                                    <h1 className="text-2xl font-bold uppercase text-black">{resumeData.personalInfo.name}</h1>
                                     {resumeData.personalInfo.title && (
                                         <p className="text-base text-gray-800 mt-0.5">{resumeData.personalInfo.title}</p>
                                     )}
                                    <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 mt-2 text-gray-700"> {/* Use gray for details */}
                                        {resumeData.personalInfo.email && <p className="flex items-center">E-mail: {resumeData.personalInfo.email}</p>}
                                        {resumeData.personalInfo.phone && <p className="flex items-center"> Contact no: {resumeData.personalInfo.phone}</p>}
                                        {resumeData.personalInfo.location && <p className="flex items-center"> {resumeData.personalInfo.location}</p>}
                                    </div>
                                    <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 text-gray-700"> {/* Use gray for details */}
                                        {resumeData.personalInfo.linkedin && <p className="flex items-center">Linkedin: <a href={`https://${resumeData.personalInfo.linkedin.replace('https://', '').replace('http://', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all ml-1">{resumeData.personalInfo.linkedin}</a></p>} {/* Use a standard blue for links in PDF */}
                                        {resumeData.personalInfo.github && <p className="flex items-center"> Github: <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all ml-1">{resumeData.personalInfo.github}</a></p>} {/* Use a standard blue for links in PDF */}
                                    </div>
                                </div>
                            )}

                            {/* Career Objective - Use text-gray-700 for readability on white PDF */}
                            {visibleSections.includes('careerObjective') && resumeData.careerObjective && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">CAREER OBJECTIVE</h2> {/* Use black for title, gray border */}
                                    <p className="text-sm leading-relaxed text-gray-700">{resumeData.careerObjective}</p> {/* Use gray for body text */}
                                </div>
                            )}

                            {/* Education - Use text-black/gray for readability on white PDF */}
                            {visibleSections.includes('education') && resumeData.education && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">EDUCATION</h2> {/* Use black for title, gray border */}
                                    <div className="flex justify-between text-sm mb-1 text-gray-700"> {/* Use gray for body text */}
                                        <p><span className="font-medium text-black">{resumeData.education.degree}</span></p> {/* Use black for degree title */}
                                        {resumeData.education.gpa && <p>CGPA: {resumeData.education.gpa}</p>} {/* Only show GPA if it exists */}
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700"> {/* Use gray for body text */}
                                        <p>{resumeData.education.institution}</p>
                                        <p>{resumeData.education.years}</p>
                                    </div>
                                </div>
                            )}

                            {/* Skills - Use text-black/gray for readability on white PDF */}
                             {visibleSections.includes('skills') && Array.isArray(resumeData.skills) && resumeData.skills.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">SKILLS</h2> {/* Use black for title, gray border */}
                                    <ul className="list-disc pl-5 text-sm space-y-0.5 text-gray-700"> {/* Use gray for list items */}
                                        {resumeData.skills.map((skill, index) => (
                                            skill && <li key={`skill-preview-${index}`}>{skill}</li> // Only render non-empty skills
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Projects - Use text-black/gray for readability on white PDF */}
                             {visibleSections.includes('projects') && Array.isArray(resumeData.projects) && resumeData.projects.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">PROJECTS</h2> {/* Use black for title, gray border */}
                                    <div className="space-y-5 text-gray-700"> {/* Use gray for body text */}
                                        {resumeData.projects.map((project, projectIndex) => (
                                            project && ( // Check if project object is not null/undefined
                                                <div key={`project-preview-${projectIndex}`}>
                                                    <h3 className="text-md font-semibold mb-1 text-black">{project.title}</h3> {/* Use black for project title */}
                                                    {project.description && project.description.length > 0 && (
                                                        <ul className="list-disc pl-5 text-sm space-y-0.5"> {/* Inherits gray text */}
                                                            {project.description.map((desc, descIndex) => (
                                                                 desc && <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li> // Only show non-empty bullets
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {project.links && project.links.length > 0 && (
                                                        <div className="text-sm mt-1 space-y-0.5"> {/* Inherits gray text */}
                                                            {project.links.map((link, linkIndex) => (
                                                                 link && link.url && <p key={`link-preview-${projectIndex}-${linkIndex}`}> {/* Only show links with URLs */}
                                                                    <span className="font-medium text-black">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">{link.url}</a> {/* Use a standard blue for links in PDF */}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certifications - Use text-black/gray for readability on white PDF */}
                            {visibleSections.includes('certifications') && Array.isArray(resumeData.certifications) && resumeData.certifications.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">CERTIFICATIONS</h2> {/* Use black for title, gray border */}
                                    <ul className="list-disc pl-5 text-sm space-y-0.5 text-gray-700"> {/* Use gray for list items */}
                                        {resumeData.certifications.map((cert, index) => (
                                            cert && <li key={`cert-preview-${index}`}>{cert}</li> // Only render non-empty certs
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Add more sections as needed, always wrapped in visibleSections check */}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout> // Close DashboardLayout
    );
}