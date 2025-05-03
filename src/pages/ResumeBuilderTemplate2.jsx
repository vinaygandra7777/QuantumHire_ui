import { useState, useRef } from 'react';
// Install html2pdf.js: npm install html2pdf.js
import html2pdf from 'html2pdf.js'; // Import the library
import DashboardLayout from '../Layouts/DashboardLayout'; // Import DashboardLayout
import { Phone, MapPin, Mail, Link, Edit, CheckCircle, Trash2, PlusCircle, UploadCloud } from 'lucide-react'; // Icons for contact info, edit, delete, add, upload

// Define the structure and configuration of the resume sections
const resumeSectionsConfig = [
    { id: 'personalInfo', title: 'Personal Information', type: 'object' },
    { id: 'aboutMe', title: 'About Me', type: 'textarea' },
    { id: 'education', title: 'Education', type: 'list', itemType: 'education' },
    { id: 'workExperience', title: 'Work Experience', type: 'list', itemType: 'workExperience' },
    { id: 'skills', title: 'Skills', type: 'list', itemType: 'skill' },
    { id: 'reference', title: 'Reference', titlePlural: 'References', type: 'list', itemType: 'reference' },
    { id: 'achievement', title: 'Achievement', titlePlural: 'Achievements', type: 'list', itemType: 'achievement' },
    // Add other sections if needed, like Custom Section, Projects, etc.
];

// Default data structure for list items
const defaultItemData = {
    education: { institution: '', degreeDetails: '', years: '' },
    workExperience: { company: '', title: '', dates: '', description: [''] }, // Starts with one bullet
    skill: '', // Simple string
    reference: { name: '', affiliation: '', phone: '', email: '', website: '' }, // Added website based on image although it looked like email
    achievement: { title: '', details: '', description: [''] }, // Starts with one bullet
};

// Main Resume Builder Component (Template 2)
export default function ResumeBuilderTemplate2() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'ANAISHA PARVATI',
      title: 'Office Marketing',
      phone: '+123-456-7890',
      location: '123 Anywhere St., Any City',
      email: 'hello@reallygreatsite.com',
      photo: '', // Placeholder for image data URL
    },
    aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    education: [
      { institution: 'RIMBERIO UNIVERSITY', degreeDetails: 'Lorem ipsum dolor', years: '2024 – 2027' },
      { institution: 'RIMBERIO UNIVERSITY', degreeDetails: 'Lorem ipsum dolor', years: '2021 – 2024' },
       { institution: 'RIMBERIO UNIVERSITY', degreeDetails: 'Lorem ipsum dolor', years: '2021 – 2024' }, // Added another one based on image
    ],
    workExperience: [
      { company: 'Aldenaire & Partners', title: 'Office Marketing', dates: '2024-NOW', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'] },
      { company: 'Thynk Unlimited', title: 'Office Marketing', dates: '2019-2023', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'] },
       { company: 'Wardiere Inc', title: 'Office Marketing', dates: '2018-2019', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'] },
        { company: 'Wardiere Inc', title: 'Office Marketing', dates: '2018-2019', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'] }, // Added another one based on image
    ],
    skills: ['Customer Service', 'Market Research', 'Brand Awareness', 'Digital Marketing', 'Digital Marketing', 'Digital Marketing'], // Added based on image count
    reference: [
        { name: 'ALEXANDER ARONOWITZ', affiliation: 'Rimberio University', phone: '+123-456-7890', email: '', website: 'www.reallygreatsite.com' },
        { name: 'SAMIRA HADID', affiliation: 'Rimberio University', phone: '+123-456-7890', email: '', website: 'www.reallygreatsite.com' },
    ],
    achievement: [
        { title: 'BORCELLE AWARD', details: 'Best Manager - 2020', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'] },
        { title: 'BORCELLE AWARD', details: 'Best Manager - 2020', description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'] },
    ],
  });

   // State to control which sections are visible and their order in the preview
   const [visibleSections, setVisibleSections] = useState(resumeSectionsConfig.map(section => section.id));


  // State to track which section is being edited
  const [editingSections, setEditingSections] = useState({}); // Start with none open

  const [activeTab, setActiveTab] = useState('edit');
  const resumeRef = useRef(null);

  // Function to toggle edit mode for a section
  const toggleEditSection = (sectionId) => {
    setEditingSections({
      ...editingSections,
      [sectionId]: !editingSections[sectionId],
    });
  };

   // --- Generic Handlers for different data types ---

   // Handles changes for simple object properties (e.g., personalInfo fields)
   const handleObjectInputChange = (sectionId, field, value) => {
    setResumeData(prevData => ({
      ...prevData,
      [sectionId]: {
        ...prevData[sectionId],
        [field]: value,
      },
    }));
  };

  // Handles changes for textareas (e.g., aboutMe)
  const handleTextareaChange = (sectionId, value) => {
      setResumeData(prevData => ({
          ...prevData,
          [sectionId]: value,
      }));
  };


  // Handles changes for items within simple arrays (e.g., skills)
  const handleSimpleArrayItemChange = (sectionId, index, value) => {
    const updatedArray = [...resumeData[sectionId]];
    updatedArray[index] = value;
    setResumeData(prevData => ({
      ...prevData,
      [sectionId]: updatedArray,
    }));
  };

  // Handles changes for complex objects within arrays (e.g., education, workExperience entries)
   const handleComplexArrayItemChange = (sectionId, itemIndex, field, value) => {
    const updatedArray = [...resumeData[sectionId]];
    updatedArray[itemIndex] = {
      ...updatedArray[itemIndex],
      [field]: value,
    };
    setResumeData(prevData => ({
      ...prevData,
      [sectionId]: updatedArray,
    }));
  };

  // Handles changes for nested arrays (e.g., description bullets in workExperience/achievement)
   const handleNestedArrayItemChange = (sectionId, itemIndex, nestedArrayIndex, value) => {
    const updatedArray = [...resumeData[sectionId]];
    const updatedNestedArray = [...updatedArray[itemIndex].description]; // Assuming the nested array is always 'description'
    updatedNestedArray[nestedArrayIndex] = value;
    updatedArray[itemIndex].description = updatedNestedArray;
    setResumeData(prevData => ({
      ...prevData,
      [sectionId]: updatedArray,
    }));
  };


  // Adds a new item to any list-based section
  const handleAddArrayItem = (sectionId, itemType) => {
      const newItem = defaultItemData[itemType];
      setResumeData(prevData => ({
          ...prevData,
          [sectionId]: [...prevData[sectionId], newItem],
      }));
  };

  // Removes an item from any list-based section
  const handleRemoveArrayItem = (sectionId, index) => {
    const updatedArray = [...resumeData[sectionId]];
    updatedArray.splice(index, 1);
    setResumeData(prevData => ({
      ...prevData,
      [sectionId]: updatedArray,
    }));
  };

  // Adds a bullet to a nested array (e.g., work experience description)
   const handleAddNestedArrayItem = (sectionId, itemIndex) => {
       const updatedArray = [...resumeData[sectionId]];
       updatedArray[itemIndex].description.push('');
       setResumeData(prevData => ({
           ...prevData,
           [sectionId]: updatedArray,
       }));
   };

  // Removes a bullet from a nested array
    const handleRemoveNestedArrayItem = (sectionId, itemIndex, nestedArrayIndex) => {
        const updatedArray = [...resumeData[sectionId]];
        updatedArray[itemIndex].description.splice(nestedArrayIndex, 1);
        setResumeData(prevData => ({
            ...prevData,
            [sectionId]: updatedArray,
        }));
    };

   // --- Section Visibility and Ordering ---

    const toggleSectionVisibility = (sectionId) => {
        setVisibleSections(prevVisible =>
            prevVisible.includes(sectionId)
                ? prevVisible.filter(id => id !== sectionId)
                : [...prevVisible, sectionId]
        );
    };

    // Future enhancement: Implement drag-and-drop for section ordering

    // --- Photo Handling ---
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

    // Define PDF options - Adjust margin/scale/format as needed for single page
    const opt = {
      margin: [10, 10, 10, 10], // Top, Left, Bottom, Right margins in mm
      filename: `${resumeData.personalInfo.name.replace(/\s+/g, '_').toLowerCase()}_resume_template2.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
         scale: 2, // Higher scale for better resolution
         logging: true,
         useCORS: true, // Required if using external images (like photo)
      },
      jsPDF: {
         unit: 'mm',
         format: 'a4', // 'a4' is [210mm x 297mm]
         orientation: 'portrait',
         putOnlyUsedFonts: true, // Optimize fonts
         floatPrecision: 16 // Precision for rendering
      }
    };

    try {
        // html2pdf().from(element).set(opt).save(); // Directly save
        // Or use get() for more control, e.g., to handle multi-page (not the goal here)
        html2pdf().from(element).set(opt).save();

        // Note: Achieving a perfect single-page PDF for variable content is complex.
        // You might need to dynamically adjust font sizes, spacing, or truncate content
        // if the resume exceeds one page, which html2pdf doesn't do automatically.
        // For this implementation, it attempts to fit on A4, but long content will flow to page 2.

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please ensure the preview is fully loaded and try again.");
    }
  };

    // Helper function to render the editing panel for a section
    const renderEditSection = (sectionConfig) => {
        const { id, title, type, itemType, titlePlural } = sectionConfig;
        const isEditing = editingSections[id];
        const sectionData = resumeData[id];

        // Determine display title for list sections
        const displayTitle = type === 'list' && titlePlural && sectionData.length > 1 ? titlePlural : title;


        // Don't render edit section if data is null/undefined for non-list types (handles potential future state changes)
        if (type !== 'list' && !sectionData && sectionData !== '') return null;


        return (
             <div key={id} className="border border-brand-gray-dark rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg text-white">{displayTitle}</h2>
                     <div className="flex items-center gap-2">
                         {/* Visibility Toggle */}
                         <button
                             onClick={() => toggleSectionVisibility(id)}
                             className={`p-1 rounded text-xs font-semibold ${visibleSections.includes(id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-brand-gray'}`}
                             aria-label={visibleSections.includes(id) ? `Hide ${title}` : `Show ${title}`}
                              title={visibleSections.includes(id) ? `Hide ${title}` : `Show ${title}`}
                         >
                            {visibleSections.includes(id) ? 'Hide' : 'Show'}
                        </button>

                        {/* Edit Toggle */}
                        <button
                            onClick={() => toggleEditSection(id)}
                            className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                            aria-label={isEditing ? `Done Editing ${title}` : `Edit ${title}`}
                            title={isEditing ? `Done Editing ${title}` : `Edit ${title}`}
                        >
                            {isEditing ? <CheckCircle size={20} /> : <Edit size={20} />}
                        </button>
                     </div>
                </div>

                 {isEditing ? (
                    <div className="space-y-4">
                        {/* Render based on section type */}
                        {type === 'object' && id === 'personalInfo' && (
                            <div className="space-y-3">
                                {/* Photo Upload/Remove */}
                                <div className="flex flex-col items-center gap-3 mb-4">
                                    {sectionData.photo ? (
                                        <div className="relative">
                                            <img src={sectionData.photo} alt="Resume Photo" className="w-24 h-24 rounded-full object-cover border-2 border-brand-purple" />
                                            <button
                                                onClick={handleRemovePhoto}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs leading-none flex items-center justify-center hover:bg-red-700 focus:outline-none"
                                                 aria-label="Remove Photo"
                                                  title="Remove Photo"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="photo-upload" className="w-24 h-24 rounded-full border-2 border-dashed border-brand-gray flex flex-col items-center justify-center text-brand-gray cursor-pointer hover:border-brand-purple hover:text-brand-purple transition-colors duration-200">
                                            <UploadCloud size={30} />
                                            <span className="text-xs mt-1 text-center">Add Photo</span>
                                            <input
                                                id="photo-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Text Inputs */}
                                <div>
                                  <label htmlFor={`${id}-name`} className="block text-sm font-medium text-brand-gray">Full Name</label>
                                  <input id={`${id}-name`} type="text" value={sectionData.name} onChange={(e) => handleObjectInputChange(id, 'name', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light" />
                                </div>
                                <div>
                                  <label htmlFor={`${id}-title`} className="block text-sm font-medium text-brand-gray">Job Title / Headline</label>
                                  <input id={`${id}-title`} type="text" value={sectionData.title} onChange={(e) => handleObjectInputChange(id, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light" />
                                </div>
                                <div>
                                  <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-brand-gray">Phone</label>
                                  <input id={`${id}-phone`} type="tel" value={sectionData.phone} onChange={(e) => handleObjectInputChange(id, 'phone', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light" />
                                </div>
                                <div>
                                  <label htmlFor={`${id}-location`} className="block text-sm font-medium text-brand-gray">Location</label>
                                  <input id={`${id}-location`} type="text" value={sectionData.location} onChange={(e) => handleObjectInputChange(id, 'location', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light" />
                                </div>
                                <div>
                                  <label htmlFor={`${id}-email`} className="block text-sm font-medium text-brand-gray">Email</label>
                                  <input id={`${id}-email`} type="email" value={sectionData.email} onChange={(e) => handleObjectInputChange(id, 'email', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light" />
                                </div>
                            </div>
                        )}

                        {type === 'textarea' && (
                            <div>
                                <label htmlFor={`${id}-textarea`} className="sr-only">{title}</label>
                                <textarea id={`${id}-textarea`} value={sectionData} onChange={(e) => handleTextareaChange(id, e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border h-32 bg-brand-black text-gray-light" />
                            </div>
                        )}

                         {type === 'list' && (
                             <div className="space-y-6">
                                 {sectionData.map((item, itemIndex) => (
                                     <div key={`${id}-${itemIndex}`} className="border border-brand-gray-medium p-3 rounded bg-brand-gray-dark space-y-3">
                                         <div className="flex justify-between items-center border-b border-brand-gray-medium pb-2 mb-3">
                                             <h4 className="font-semibold text-white text-sm">{title} {itemIndex + 1}</h4>
                                             <button
                                                onClick={() => handleRemoveArrayItem(id, itemIndex)}
                                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs focus:outline-none"
                                                aria-label={`Remove ${title} ${itemIndex + 1}`}
                                                 title={`Remove ${title} ${itemIndex + 1}`}
                                             >
                                                Remove
                                             </button>
                                         </div>

                                         {/* Render inputs based on itemType */}
                                         {itemType === 'education' && (
                                             <div className="space-y-2">
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-institution`} className="block text-xs font-medium text-brand-gray">Institution</label>
                                                     <input id={`${id}-${itemIndex}-institution`} type="text" value={item.institution} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'institution', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  <div>
                                                     <label htmlFor={`${id}-${itemIndex}-details`} className="block text-xs font-medium text-brand-gray">Degree/Details</label>
                                                     <input id={`${id}-${itemIndex}-details`} type="text" value={item.degreeDetails} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'degreeDetails', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-years`} className="block text-xs font-medium text-brand-gray">Years (e.g., 2020-2024)</label>
                                                     <input id={`${id}-${itemIndex}-years`} type="text" value={item.years} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'years', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                             </div>
                                         )}

                                         {itemType === 'workExperience' && (
                                              <div className="space-y-2">
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-company`} className="block text-xs font-medium text-brand-gray">Company</label>
                                                     <input id={`${id}-${itemIndex}-company`} type="text" value={item.company} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'company', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-title`} className="block text-xs font-medium text-brand-gray">Title</label>
                                                     <input id={`${id}-${itemIndex}-title`} type="text" value={item.title} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  <div>
                                                    <label htmlFor={`${id}-${itemIndex}-dates`} className="block text-xs font-medium text-brand-gray">Dates (e.g., 2020-2024 or 2024-NOW)</label>
                                                     <input id={`${id}-${itemIndex}-dates`} type="text" value={item.dates} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'dates', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                 {/* Description Bullets */}
                                                 <div>
                                                     <div className="flex justify-between items-center mb-1">
                                                       <label className="block text-xs font-medium text-brand-gray">Description Bullets</label>
                                                        <button
                                                         onClick={() => handleAddNestedArrayItem(id, itemIndex)}
                                                         className="px-2 py-0.5 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none"
                                                          aria-label={`Add bullet to ${title} ${itemIndex + 1}`}
                                                           title={`Add bullet to ${title} ${itemIndex + 1}`}
                                                        >
                                                          <PlusCircle size={12} />
                                                       </button>
                                                     </div>
                                                     <div className="space-y-1">
                                                         {item.description.map((bullet, bulletIndex) => (
                                                             <div key={`${id}-${itemIndex}-${bulletIndex}`} className="flex items-start gap-2">
                                                                 <input
                                                                     type="text"
                                                                     value={bullet}
                                                                     onChange={(e) => handleNestedArrayItemChange(id, itemIndex, bulletIndex, e.target.value)}
                                                                     className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-1 border bg-brand-black text-gray-light text-sm"
                                                                     aria-label={`${title} ${itemIndex + 1} bullet ${bulletIndex + 1}`}
                                                                 />
                                                                 {item.description.length > 1 && ( // Don't allow removing the last bullet
                                                                    <button
                                                                      onClick={() => handleRemoveNestedArrayItem(id, itemIndex, bulletIndex)}
                                                                      className="px-1 py-0.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs flex-shrink-0 focus:outline-none"
                                                                      aria-label={`Remove bullet ${bulletIndex + 1}`}
                                                                       title={`Remove bullet ${bulletIndex + 1}`}
                                                                    >
                                                                      <Trash2 size={14} />
                                                                    </button>
                                                                 )}
                                                             </div>
                                                         ))}
                                                     </div>
                                                 </div>
                                             </div>
                                         )}

                                         {itemType === 'skill' && (
                                             <div>
                                                 <label htmlFor={`${id}-${itemIndex}-skill`} className="block text-xs font-medium text-brand-gray">Skill</label>
                                                 <input id={`${id}-${itemIndex}-skill`} type="text" value={item} onChange={(e) => handleSimpleArrayItemChange(id, itemIndex, e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                             </div>
                                         )}

                                          {itemType === 'reference' && (
                                             <div className="space-y-2">
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-name`} className="block text-xs font-medium text-brand-gray">Name</label>
                                                     <input id={`${id}-${itemIndex}-name`} type="text" value={item.name} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'name', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  <div>
                                                    <label htmlFor={`${id}-${itemIndex}-affiliation`} className="block text-xs font-medium text-brand-gray">Affiliation</label>
                                                     <input id={`${id}-${itemIndex}-affiliation`} type="text" value={item.affiliation} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'affiliation', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-phone`} className="block text-xs font-medium text-brand-gray">Phone</label>
                                                     <input id={`${id}-${itemIndex}-phone`} type="tel" value={item.phone} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'phone', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-email`} className="block text-xs font-medium text-brand-gray">Email</label>
                                                     <input id={`${id}-${itemIndex}-email`} type="email" value={item.email} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'email', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  <div>
                                                    <label htmlFor={`${id}-${itemIndex}-website`} className="block text-xs font-medium text-brand-gray">Website</label>
                                                     <input id={`${id}-${itemIndex}-website`} type="text" value={item.website} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'website', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                             </div>
                                         )}

                                          {itemType === 'achievement' && (
                                              <div className="space-y-2">
                                                 <div>
                                                    <label htmlFor={`${id}-${itemIndex}-title`} className="block text-xs font-medium text-brand-gray">Award/Title</label>
                                                     <input id={`${id}-${itemIndex}-title`} type="text" value={item.title} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  <div>
                                                    <label htmlFor={`${id}-${itemIndex}-details`} className="block text-xs font-medium text-brand-gray">Details (e.g., Best Manager - 2020)</label>
                                                     <input id={`${id}-${itemIndex}-details`} type="text" value={item.details} onChange={(e) => handleComplexArrayItemChange(id, itemIndex, 'details', e.target.value)} className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" />
                                                 </div>
                                                  {/* Description Bullets */}
                                                 <div>
                                                     <div className="flex justify-between items-center mb-1">
                                                       <label className="block text-xs font-medium text-brand-gray">Description Bullets</label>
                                                        <button
                                                         onClick={() => handleAddNestedArrayItem(id, itemIndex)}
                                                         className="px-2 py-0.5 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none"
                                                          aria-label={`Add bullet to ${title} ${itemIndex + 1}`}
                                                           title={`Add bullet to ${title} ${itemIndex + 1}`}
                                                        >
                                                          <PlusCircle size={12} />
                                                       </button>
                                                     </div>
                                                     <div className="space-y-1">
                                                         {item.description.map((bullet, bulletIndex) => (
                                                             <div key={`${id}-${itemIndex}-${bulletIndex}`} className="flex items-start gap-2">
                                                                 <input
                                                                     type="text"
                                                                     value={bullet}
                                                                     onChange={(e) => handleNestedArrayItemChange(id, itemIndex, bulletIndex, e.target.value)}
                                                                     className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-1 border bg-brand-black text-gray-light text-sm"
                                                                      aria-label={`${title} ${itemIndex + 1} bullet ${bulletIndex + 1}`}
                                                                 />
                                                                 {item.description.length > 1 && ( // Don't allow removing the last bullet
                                                                    <button
                                                                      onClick={() => handleRemoveNestedArrayItem(id, itemIndex, bulletIndex)}
                                                                      className="px-1 py-0.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs flex-shrink-0 focus:outline-none"
                                                                      aria-label={`Remove bullet ${bulletIndex + 1}`}
                                                                       title={`Remove bullet ${bulletIndex + 1}`}
                                                                    >
                                                                      <Trash2 size={14} />
                                                                    </button>
                                                                 )}
                                                             </div>
                                                         ))}
                                                     </div>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 ))}
                                 {/* Add Item Button for Lists */}
                                 <button
                                     onClick={() => handleAddArrayItem(id, itemType)}
                                     className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none text-sm"
                                 >
                                     Add {title}
                                 </button>
                             </div>
                         )}
                    </div>
                 ) : (
                    // Preview mode within the editing panel (simple text display)
                    <div className="text-brand-gray-light text-sm">
                         {type === 'object' && id === 'personalInfo' && (
                            <div className="space-y-1">
                                <p><span className="font-medium text-white">Name:</span> {sectionData.name}</p>
                                <p><span className="font-medium text-white">Title:</span> {sectionData.title}</p>
                                <p><span className="font-medium text-white">Contact:</span> {sectionData.phone} | {sectionData.location} | {sectionData.email}</p>
                                {sectionData.photo && <p><span className="font-medium text-white">Photo:</span> Added</p>}
                            </div>
                         )}
                         {type === 'textarea' && <p>{sectionData}</p>}
                         {type === 'list' && (
                              <ul className="list-disc pl-5">
                                  {sectionData.length === 0 && <li className="italic">No {displayTitle} added.</li>}
                                  {sectionData.map((item, itemIndex) => {
                                      // Display first field as summary
                                      if (itemType === 'education') return <li key={itemIndex}>{item.institution} ({item.years})</li>;
                                      if (itemType === 'workExperience') return <li key={itemIndex}>{item.title} at {item.company} ({item.dates})</li>;
                                      if (itemType === 'skill') return <li key={itemIndex}>{item}</li>;
                                      if (itemType === 'reference') return <li key={itemIndex}>{item.name} ({item.affiliation})</li>;
                                       if (itemType === 'achievement') return <li key={itemIndex}>{item.title}</li>;
                                      return null; // Fallback
                                  })}
                              </ul>
                         )}
                    </div>
                 )}
             </div>
        );
    };


  return (
    <DashboardLayout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-8 mt-10">
          Resume Builder (Template 2)
      </h1>

      <div className="container mx-auto p-0 flex-grow flex flex-col md:flex-row gap-6">
        {/* Edit/Controls Column */}
        <div className="w-full md:w-1/3 bg-brand-card-dark p-4 rounded-lg shadow-lg border border-brand-gray-dark">
          <div className="flex mb-4 border-b border-brand-gray-dark">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none
                ${activeTab === 'edit' ? 'border-b-2 border-brand-purple text-white' : 'text-brand-gray hover:text-white'}`}
            >
              <span className="mr-2">✏️</span>
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none
                ${activeTab === 'preview' ? 'border-b-2 border-brand-purple text-white' : 'text-brand-gray hover:text-white'}`}
            >
              <span className="mr-2">👁️</span>
              Preview
            </button>
          </div>

          {/* Edit Tab Content */}
          {activeTab === 'edit' && (
            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar */}
               {/* Render edit panels based on configuration and visibility */}
               {resumeSectionsConfig.map(sectionConfig =>
                   renderEditSection(sectionConfig)
               )}

                {/* Optional: Add button to add more section types if you had more beyond the template */}
                {/*
                <div className="mt-6 text-center">
                    <button className="px-4 py-2 bg-brand-purple text-white rounded hover:bg-brand-purple-light">Add Custom Section</button>
                </div>
                */}

            </div>
          )}

          {/* Preview Tab Content */}
          {activeTab === 'preview' && (
            <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar"> {/* Added custom-scrollbar */}
              <p className="mb-4 text-brand-gray text-sm">Review your resume before downloading. The layout here is approximate and may vary slightly in the final PDF. Content length affects single-page fitting.</p>
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

        {/* Resume Preview Column (The content inside this div gets captured for PDF) */}
        <div className="w-full md:w-2/3">
          <div className="bg-brand-card-dark p-6 rounded-lg shadow-lg border border-brand-gray-dark sticky top-4 max-h-[calc(100vh-40px)] overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar */}
            {/* This is the div that html2pdf will target - KEEP WHITE BACKGROUND for PDF */}
            <div
              ref={resumeRef}
              className="w-full mx-auto bg-white p-6 text-black font-sans" // KEEP bg-white and default text-black for PDF, ensured font-sans
              style={{ maxWidth: '800px', minHeight: '1056px', lineHeight: '1.4' }} // Adjusted minHeight for A4, added line-height
            >
               {/* ====== RESUME TEMPLATE 2 PREVIEW LAYOUT ====== */}

                {/* Header */}
               {visibleSections.includes('personalInfo') && resumeData.personalInfo && (
                   <div className="pb-4 mb-6 border-b border-gray-300 flex flex-col items-center md:flex-row md:items-start md:justify-between">
                       <div className="text-center md:text-left mb-4 md:mb-0 flex-grow">
                           <h1 className="text-3xl font-bold uppercase">{resumeData.personalInfo.name}</h1>
                           <p className="text-lg text-gray-700 mt-1">{resumeData.personalInfo.title}</p>
                            <div className="flex flex-wrap justify-center md:justify-start text-sm text-gray-700 gap-x-4 gap-y-1 mt-3">
                               {resumeData.personalInfo.phone && (
                                   <div className="flex items-center">
                                       <Phone size={14} className="mr-1 text-gray-600" />
                                        {resumeData.personalInfo.phone}
                                   </div>
                               )}
                                {resumeData.personalInfo.location && (
                                   <div className="flex items-center">
                                       <MapPin size={14} className="mr-1 text-gray-600" />
                                       {resumeData.personalInfo.location}
                                   </div>
                               )}
                                {resumeData.personalInfo.email && (
                                   <div className="flex items-center">
                                       <Mail size={14} className="mr-1 text-gray-600" />
                                       {resumeData.personalInfo.email}
                                   </div>
                               )}
                           </div>
                       </div>
                        {/* Photo */}
                        {resumeData.personalInfo.photo && (
                            <div className="flex-shrink-0 md:ml-6">
                                <img src={resumeData.personalInfo.photo} alt="Profile Photo" className="w-24 h-24 rounded-full object-cover border border-gray-300" />
                            </div>
                        )}
                   </div>
               )}

               {/* About Me */}
               {visibleSections.includes('aboutMe') && resumeData.aboutMe && (
                   <div className="mb-6 pb-4 border-b border-gray-300">
                        <h2 className="text-lg font-bold uppercase mb-2">ABOUT ME</h2>
                        <p className="text-sm text-gray-700">{resumeData.aboutMe}</p>
                   </div>
               )}

                {/* Main Two-Column Layout for remaining sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {/* Left Column */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Education */}
                        {visibleSections.includes('education') && resumeData.education.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-4">EDUCATION</h2> {/* Increased bottom margin */}
                                <div className="relative border-l-2 border-gray-300 ml-2 pl-6 space-y-6"> {/* Added vertical line */}
                                    {resumeData.education.map((edu, index) => (
                                        <div key={`edu-${index}`} className="relative">
                                             {/* Timeline Dot */}
                                             <div className="absolute left-[-33px] top-1 w-4 h-4 bg-gray-500 rounded-full border-2 border-white"></div> {/* Positioned on the line */}
                                            <p className="font-semibold">{edu.institution}</p>
                                            <p className="text-sm text-gray-700">{edu.degreeDetails}</p>
                                            <p className="text-sm text-gray-600">{edu.years}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skill */}
                         {visibleSections.includes('skills') && resumeData.skills.length > 0 && (
                             <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-4">SKILL</h2>
                                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-0.5">
                                    {resumeData.skills.map((skill, index) => (
                                        <li key={`skill-preview-${index}`}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                         )}

                         {/* Reference */}
                         {visibleSections.includes('reference') && resumeData.reference.length > 0 && (
                              <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-4">{resumeData.reference.length > 1 ? 'REFERENCES' : 'REFERENCE'}</h2>
                                <div className="space-y-4 text-sm text-gray-700">
                                    {resumeData.reference.map((ref, index) => (
                                        <div key={`ref-${index}`}>
                                            <p className="font-semibold text-black">{ref.name}</p>
                                            <p>{ref.affiliation}</p>
                                            <div className="flex items-center text-gray-600 mt-1">
                                                {ref.phone && (
                                                     <span className="flex items-center mr-4"><Phone size={12} className="mr-1" />{ref.phone}</span>
                                                )}
                                                 {ref.email && (
                                                     <span className="flex items-center mr-4"><Mail size={12} className="mr-1" /><a href={`mailto:${ref.email}`} className="text-blue-700 underline break-all">{ref.email}</a></span>
                                                )}
                                                {ref.website && (
                                                    <span className="flex items-center"><Link size={12} className="mr-1" /><a href={ref.website.startsWith('http') ? ref.website : `http://${ref.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">{ref.website}</a></span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-1 space-y-6">
                        {/* Work Experience */}
                        {visibleSections.includes('workExperience') && resumeData.workExperience.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-4">WORK EXPERIENCE</h2>
                                 <div className="relative border-l-2 border-gray-300 ml-2 pl-6 space-y-6"> {/* Added vertical line */}
                                    {resumeData.workExperience.map((job, index) => (
                                        <div key={`job-${index}`} className="relative">
                                             {/* Timeline Dot */}
                                             <div className="absolute left-[-33px] top-1 w-4 h-4 bg-gray-500 rounded-full border-2 border-white"></div> {/* Positioned on the line */}
                                             <div className="flex justify-between items-start">
                                                 <h3 className="font-semibold text-black">{job.company} - {job.title}</h3>
                                                  <span className="flex-shrink-0 ml-2 text-sm text-gray-600">{job.dates}</span>
                                             </div>
                                             {job.description && job.description.length > 0 && (
                                                 <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-0.5">
                                                     {job.description.map((bullet, bulletIndex) => (
                                                         bullet && <li key={`job-${index}-bullet-${bulletIndex}`}>{bullet}</li> // Only render non-empty bullets
                                                     ))}
                                                 </ul>
                                             )}
                                        </div>
                                    ))}
                                 </div>
                            </div>
                        )}

                         {/* Achievement */}
                         {visibleSections.includes('achievement') && resumeData.achievement.length > 0 && (
                             <div className="mb-6">
                                <h2 className="text-lg font-bold uppercase mb-4">{resumeData.achievement.length > 1 ? 'ACHIEVEMENTS' : 'ACHIEVEMENT'}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700"> {/* Use grid for multiple achievements */}
                                    {resumeData.achievement.map((ach, index) => (
                                        <div key={`ach-${index}`}>
                                            <p className="font-semibold text-black">{ach.title}</p>
                                            <p className="text-gray-600">{ach.details}</p>
                                             {ach.description && ach.description.length > 0 && (
                                                 <ul className="list-disc pl-5 text-sm text-gray-700 mt-1 space-y-0.5">
                                                     {ach.description.map((bullet, bulletIndex) => (
                                                          bullet && <li key={`ach-${index}-bullet-${bulletIndex}`}>{bullet}</li> // Only render non-empty bullets
                                                     ))}
                                                 </ul>
                                             )}
                                        </div>
                                    ))}
                                </div>
                             </div>
                         )}
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}