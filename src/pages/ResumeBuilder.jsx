import { useState, useRef } from 'react';
// Install html2pdf.js: npm install html2pdf.js
import html2pdf from 'html2pdf.js'; // Import the library
import DashboardLayout from '../Layouts/DashboardLayout'; // <--- Import DashboardLayout

// Main Resume Builder Component
export default function ResumeBuilder() {
  // Resume state with default values based on the provided resume
  // Refactored projects to use a 'links' array consistently
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'VINAY KUMAR REDDY GANDRA',
      email: 'vinaygandra7777@gmail.com',
      phone: '9014583641',
      linkedin: 'www.linkedin.com/in/gandra-vinay-297376266',
      github: 'https://github.com/vinaygandra7777',
    },
    careerObjective: 'Detail-oriented and analytical fresher with strong SQL, Python, and business communication skills. Quick learner with a solid grasp of cloud platforms and data visualization tools. Seeking an opportunity to apply technical expertise and problem-solving abilities in a dynamic environment.',
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

  const [editingSections, setEditingSections] = useState({
    personalInfo: false,
    careerObjective: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
  });

  const [activeTab, setActiveTab] = useState('edit');
  const resumeRef = useRef(null);

  const toggleEditSection = (section) => {
    setEditingSections({
      ...editingSections,
      [section]: !editingSections[section],
    });
  };

  const handleObjectInputChange = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value,
      },
    });
  };

  const handleArrayItemChange = (section, index, value) => {
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = value;
    setResumeData({
      ...resumeData,
      [section]: updatedArray,
    });
  };

  const handleAddArrayItem = (section, defaultValue = '') => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], defaultValue],
    });
  };

  const handleRemoveArrayItem = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [section]: updatedArray,
    });
  };

  // --- Project Specific Handlers ---

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

  const handleAddProjectBullet = (projectIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].description.push('');
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleRemoveProjectBullet = (projectIndex, descIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].description.splice(descIndex, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

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

  const handleAddProjectLink = (projectIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].links.push({ name: '', url: '' });
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleRemoveProjectLink = (projectIndex, linkIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].links.splice(linkIndex, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleAddProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: 'New Project',
          description: ['Project description'],
          links: [], // New projects start with an empty links array
        },
      ],
    });
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
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
      html2canvas: { scale: 2, logging: true, useCORS: true },
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
      <h1 className="text-3xl font-bold text-white mb-8 mt-10"> {/* Added title */}
          Resume Builder
      </h1>

      <div className="container mx-auto p-0 flex-grow flex flex-col md:flex-row gap-6"> {/* Removed container padding here, handled by Layout */}
        {/* Edit/Controls Column */}
        <div className="w-full md:w-1/3 bg-brand-card-dark p-4 rounded-lg shadow-lg border border-brand-gray-dark"> {/* Applied dark theme styles */}
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
            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2"> {/* Adjusted max-height */}
              {/* Personal Information Section */}
              <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-white">Personal Information</h2> {/* Applied dark theme text */}
                  <button
                    onClick={() => toggleEditSection('personalInfo')}
                    className="text-brand-purple hover:text-brand-purple-light focus:outline-none" 
                    aria-label={editingSections.personalInfo ? 'Done Editing Personal Info' : 'Edit Personal Info'}
                  >
                    {editingSections.personalInfo ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.personalInfo ? (
                  <div className="space-y-3">
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
                  <div className="text-brand-gray-light"> {/* Applied dark theme text */}
                    <p><span className="font-medium text-white">Name:</span> {resumeData.personalInfo.name}</p> {/* Applied dark theme text */}
                    <p><span className="font-medium text-white">Email:</span> {resumeData.personalInfo.email}</p> {/* Applied dark theme text */}
                    <p><span className="font-medium text-white">Phone:</span> {resumeData.personalInfo.phone}</p> {/* Applied dark theme text */}
                    <p><span className="font-medium text-white">LinkedIn:</span> {resumeData.personalInfo.linkedin}</p> {/* Applied dark theme text */}
                    <p><span className="font-medium text-white">GitHub:</span> {resumeData.personalInfo.github}</p> {/* Applied dark theme text */}
                  </div>
                )}
              </div>

              {/* Career Objective Section */}
              <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-white">Career Objective</h2> {/* Applied dark theme text */}
                  <button
                    onClick={() => toggleEditSection('careerObjective')}
                     className="text-brand-purple hover:text-brand-purple-light focus:outline-none" 
                     aria-label={editingSections.careerObjective ? 'Done Editing Career Objective' : 'Edit Career Objective'}
                  >
                    {editingSections.careerObjective ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.careerObjective ? (
                  <div>
                     <label htmlFor="objective" className="sr-only">Career Objective</label>
                    <textarea
                      id="objective"
                      value={resumeData.careerObjective}
                      onChange={(e) => setResumeData({...resumeData, careerObjective: e.target.value})}
                      className="mt-1 block w-full rounded-md border-brand-gray-dark shadow-sm p-2 border h-32 bg-brand-black text-gray-light" 
                    />
                  </div>
                ) : (
                  <p className="text-brand-gray-light">{resumeData.careerObjective}</p>
                )}
              </div>

              {/* Education Section */}
              <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-white">Education</h2> {/* Applied dark theme text */}
                  <button
                    onClick={() => toggleEditSection('education')}
                     className="text-brand-purple hover:text-brand-purple-light focus:outline-none" 
                     aria-label={editingSections.education ? 'Done Editing Education' : 'Edit Education'}
                  >
                    {editingSections.education ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.education ? (
                  <div className="space-y-3">
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
                  <div className="text-brand-gray-light"> {/* Applied dark theme text */}
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
                  <button
                    onClick={() => toggleEditSection('skills')}
                    className="text-brand-purple hover:text-brand-purple-light focus:outline-none"
                    aria-label={editingSections.skills ? 'Done Editing Skills' : 'Edit Skills'}
                  >
                    {editingSections.skills ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.skills ? (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill, index) => (
                      <div key={`skill-edit-${index}`} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleArrayItemChange('skills', index, e.target.value)}
                           className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" 
                          aria-label={`Skill ${index + 1}`}
                        />
                        <button
                          onClick={() => handleRemoveArrayItem('skills', index)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none"
                          aria-label={`Remove Skill ${index + 1}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddArrayItem('skills', 'New Skill: ')}
                      className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none" 
                    >
                      Add Skill
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-brand-gray-light"> {/* Applied dark theme text */}
                    {resumeData.skills.map((skill, index) => (
                      <li key={`skill-preview-${index}`}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Projects Section */}
              <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-white">Projects</h2> {/* Applied dark theme text */}
                  <button
                    onClick={() => toggleEditSection('projects')}
                    className="text-brand-purple hover:text-brand-purple-light focus:outline-none" 
                    aria-label={editingSections.projects ? 'Done Editing Projects' : 'Edit Projects'}
                  >
                    {editingSections.projects ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.projects ? (
                  <div className="space-y-6">
                    {resumeData.projects.map((project, projectIndex) => (
                      <div key={`project-edit-${projectIndex}`} className="border border-brand-gray-medium p-3 rounded bg-brand-gray-dark"> {/* Applied dark theme styles */}
                        <div className="flex justify-between items-center mb-3 border-b border-brand-gray-medium pb-2"> {/* Applied dark theme styles */}
                          <h3 className="font-semibold text-md text-white">Project {projectIndex + 1}</h3> {/* Applied dark theme text */}
                          <button
                            onClick={() => handleRemoveProject(projectIndex)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs focus:outline-none" 
                             aria-label={`Remove Project ${projectIndex + 1}`}
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
                                className="px-2 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none" 
                                aria-label={`Add description bullet to Project ${projectIndex + 1}`}
                              >
                                Add Bullet
                              </button>
                            </div>

                            <div className="space-y-2">
                              {project.description.map((desc, descIndex) => (
                                <div key={`desc-edit-${projectIndex}-${descIndex}`} className="flex items-start gap-2">
                                  <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => handleProjectDescriptionChange(projectIndex, descIndex, e.target.value)}
                                    className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm" 
                                    aria-label={`Project ${projectIndex + 1} description bullet ${descIndex + 1}`}
                                  />
                                  <button
                                    onClick={() => handleRemoveProjectBullet(projectIndex, descIndex)}
                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none" 
                                     aria-label={`Remove description bullet ${descIndex + 1} from Project ${projectIndex + 1}`}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                           {/* Project Links */}
                           <div>
                             <div className="flex justify-between items-center mb-2">
                               <label className="block text-sm font-medium text-brand-gray">Links</label> {/* Applied dark theme text */}
                                <button
                                 onClick={() => handleAddProjectLink(projectIndex)}
                                 className="px-2 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light text-xs focus:outline-none" 
                                  aria-label={`Add link to Project ${projectIndex + 1}`}
                               >
                                 Add Link
                               </button>
                             </div>

                             <div className="space-y-2">
                               {project.links.map((link, linkIndex) => (
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
                                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm self-center focus:outline-none"
                                       aria-label={`Remove Link ${linkIndex + 1} from Project ${projectIndex + 1}`}
                                    >
                                      Remove
                                    </button>
                                 </div>
                                ))}
                             </div>
                           </div>

                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleAddProject}
                       className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none" 
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-brand-gray-light"> {/* Applied dark theme text */}
                    {resumeData.projects.map((project, projectIndex) => (
                      <div key={`project-preview-${projectIndex}`}>
                        <h3 className="font-medium text-white">{project.title}</h3> {/* Applied dark theme text */}
                        {project.description.length > 0 && (
                           <ul className="list-disc pl-5 text-sm space-y-0.5">
                             {project.description.map((desc, descIndex) => (
                               <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li>
                             ))}
                           </ul>
                        )}
                        {project.links.length > 0 && (
                          <div className="text-sm mt-1 space-y-0.5">
                            {project.links.map((link, linkIndex) => (
                              <p key={`link-preview-${projectIndex}-${linkIndex}`}>
                                <span className="font-medium text-white">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-brand-purple underline break-all hover:text-brand-purple-light">{link.url}</a> {/* Applied dark theme link styles */}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications Section */}
              <div className="border border-brand-gray-dark rounded-lg p-4"> {/* Applied dark theme styles */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-white">Certifications</h2> {/* Applied dark theme text */}
                  <button
                    onClick={() => toggleEditSection('certifications')}
                    className="text-brand-purple hover:text-brand-purple-light focus:outline-none" 
                    aria-label={editingSections.certifications ? 'Done Editing Certifications' : 'Edit Certifications'}
                  >
                    {editingSections.certifications ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.certifications ? (
                  <div className="space-y-3">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={`cert-edit-${index}`} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => handleArrayItemChange('certifications', index, e.target.value)}
                          className="flex-grow rounded-md border-brand-gray-dark shadow-sm p-2 border bg-brand-black text-gray-light text-sm"
                          aria-label={`Certification ${index + 1}`}
                        />
                        <button
                          onClick={() => handleRemoveArrayItem('certifications', index)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm focus:outline-none"
                          aria-label={`Remove Certification ${index + 1}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddArrayItem('certifications', 'New Certification: ')}
                      className="px-3 py-1 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none" 
                    >
                      Add Certification
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5 text-brand-gray-light"> {/* Applied dark theme text */}
                    {resumeData.certifications.map((cert, index) => (
                      <li key={`cert-preview-${index}`}>{cert}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Preview Tab Content */}
          {activeTab === 'preview' && (
            <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2"> {/* Adjusted max-height */}
              <p className="mb-4 text-brand-gray">Review your resume before downloading. The layout here is approximate and may vary slightly in the final PDF.</p> {/* Applied dark theme text */}
              <button
                onClick={downloadPDF}
                className="w-full flex items-center justify-center px-4 py-2 bg-brand-purple text-white rounded hover:bg-brand-purple-light focus:outline-none" 
              >
                <span className="mr-2">📥</span>
                Download as PDF
              </button>
            </div>
          )}
        </div>

        {/* Resume Preview Column */}
        {/* This column contains the actual resume content that gets converted to PDF */}
        <div className="w-full md:w-2/3">
          <div className="bg-brand-card-dark p-6 rounded-lg shadow-lg border border-brand-gray-dark sticky top-4 max-h-[calc(100vh-40px)] overflow-y-auto"> {/* Applied dark theme styles */}
            {/* This is the div that html2pdf will target - KEEP WHITE BACKGROUND for PDF */}
            <div
              ref={resumeRef}
              className="w-full mx-auto bg-white p-6 text-black" // KEEP bg-white and default text-black for PDF
              style={{ maxWidth: '800px', minHeight: '1056px' }}
            >
              {/* Resume Header - Use text-black or gray shades for readability on white PDF */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold uppercase text-black">{resumeData.personalInfo.name}</h1>
                <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 mt-1 text-gray-700"> {/* Use gray for details */}
                  {resumeData.personalInfo.email && <p>E-mail: {resumeData.personalInfo.email}</p>}
                  {resumeData.personalInfo.phone && <p>Contact no: {resumeData.personalInfo.phone}</p>}
                </div>
                 <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 text-gray-700"> {/* Use gray for details */}
                  {resumeData.personalInfo.linkedin && <p>Linkedin: <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">{resumeData.personalInfo.linkedin}</a></p>} {/* Use a standard blue for links in PDF */}
                  {resumeData.personalInfo.github && <p>Github: <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">{resumeData.personalInfo.github}</a></p>} {/* Use a standard blue for links in PDF */}
                </div>
              </div>

              {/* Career Objective - Use text-gray-700 for readability on white PDF */}
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">CAREER OBJECTIVE</h2> {/* Use black for title, gray border */}
                <p className="text-sm leading-relaxed text-gray-700">{resumeData.careerObjective}</p> {/* Use gray for body text */}
              </div>

              {/* Education - Use text-black/gray for readability on white PDF */}
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">EDUCATION</h2> {/* Use black for title, gray border */}
                <div className="flex justify-between text-sm mb-1 text-gray-700"> {/* Use gray for body text */}
                    <p><span className="font-medium text-black">{resumeData.education.degree}</span></p> {/* Use black for degree title */}
                     <p>CGPA: {resumeData.education.gpa}</p>
                </div>
                 <div className="flex justify-between text-sm text-gray-700"> {/* Use gray for body text */}
                    <p>{resumeData.education.institution}</p>
                     <p>{resumeData.education.years}</p>
                 </div>
              </div>

              {/* Skills - Use text-black/gray for readability on white PDF */}
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">SKILLS</h2> {/* Use black for title, gray border */}
                <ul className="list-disc pl-5 text-sm space-y-0.5 text-gray-700"> {/* Use gray for list items */}
                  {resumeData.skills.map((skill, index) => (
                    <li key={`skill-preview-${index}`}>{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Projects - Use text-black/gray for readability on white PDF */}
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">PROJECTS</h2> {/* Use black for title, gray border */}
                <div className="space-y-5 text-gray-700"> {/* Use gray for body text */}
                  {resumeData.projects.map((project, projectIndex) => (
                    <div key={`project-preview-${projectIndex}`}>
                      <h3 className="text-md font-semibold mb-1 text-black">{project.title}</h3> {/* Use black for project title */}
                      {project.description.length > 0 && (
                         <ul className="list-disc pl-5 text-sm space-y-0.5"> {/* Inherits gray text */}
                           {project.description.map((desc, descIndex) => (
                             <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li>
                           ))}
                         </ul>
                      )}
                      {project.links.length > 0 && (
                        <div className="text-sm mt-1 space-y-0.5"> {/* Inherits gray text */}
                          {project.links.map((link, linkIndex) => (
                            <p key={`link-preview-${projectIndex}-${linkIndex}`}>
                              <span className="font-medium text-black">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">{link.url}</a> {/* Use a standard blue for links in PDF */}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications - Use text-black/gray for readability on white PDF */}
              <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2 text-black">CERTIFICATIONS</h2> {/* Use black for title, gray border */}
                <ul className="list-disc pl-5 text-sm space-y-0.5 text-gray-700"> {/* Use gray for list items */}
                  {resumeData.certifications.map((cert, index) => (
                    <li key={`cert-preview-${index}`}>{cert}</li>
                  ))}
                </ul>
              </div>

              {/* Add more sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout> // Close DashboardLayout
  );
}