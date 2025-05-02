import { useState, useRef } from 'react';
// Install html2pdf.js: npm install html2pdf.js
import html2pdf from 'html2pdf.js'; // Import the library

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
        // Changed to 'links' array for consistency
        links: [],
      },
      {
        title: 'Starbucks Website Clone | HTML, CSS, JAVASCRIPT, FIREBASE',
        description: [
          'Built a fully functional online ordering system using HTML(30%), CSS(20%), JavaScript(45%), and Firebase(5%) for user authentication.',
          'Implemented key features like user login, menu browsing, cart management, and order summary.',
          'Deployed the platform on GitHub Pages, showcasing skills in web development and version control.',
        ],
        // Changed to 'links' array for consistency
        links: [{ name: 'Project Link', url: 'https://vinaygandra7777.github.io/onlinefooddelivery/' }],
      },
      {
        title: 'Genii AI Chat – An Interactive AI-Powered Chatbot| HTML, CSS, JAVASCRIPT',
        description: [
          'Developed an interactive chatbot using HTML(15%), CSS(15%), JavaScript(30%).',
          'Integrated NLP capabilities from Gemini AI (40%), enabling natural language understanding for more human-like conversations.',
          'Added user-friendly features like light mode and clear chat.',
        ],
        // Changed to 'links' array for consistency
        links: [{ name: 'Project Link', url: 'https://vinaygandra7777.github.io/geminiai/' }],
      },
      {
        title: 'Responsive Web Design Projects: The Burger Box & Lumin Serum | HTML,CSS',
        description: [
          'Designed two responsive websites using HTML, CSS, and JavaScript.',
          'Focused on mobile-first development ensuring cross-device compatibility.',
        ],
        // Kept as 'links' array, adjusting names/urls
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

  // State to track which section is being edited
  const [editingSections, setEditingSections] = useState({
    personalInfo: false,
    careerObjective: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
  });

  // State for active tab (Edit or Preview)
  const [activeTab, setActiveTab] = useState('edit');

  // Reference to resume for PDF generation
  const resumeRef = useRef(null);

  // Function to toggle edit mode for a section
  const toggleEditSection = (section) => {
    setEditingSections({
      ...editingSections,
      [section]: !editingSections[section],
    });
  };

  // Function to handle text input changes for simple objects (e.g., personalInfo, education)
  const handleObjectInputChange = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value,
      },
    });
  };

  // Function to handle text input changes for array items (skills, certifications)
  const handleArrayItemChange = (section, index, value) => {
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = value;
    setResumeData({
      ...resumeData,
      [section]: updatedArray,
    });
  };

  // Function to add new item to an array (skills, certifications)
  const handleAddArrayItem = (section, defaultValue = '') => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], defaultValue],
    });
  };

  // Function to remove item from an array (skills, certifications)
  const handleRemoveArrayItem = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [section]: updatedArray,
    });
  };

  // --- Project Specific Handlers ---

  // Function to handle project field changes (e.g., title)
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

  // Function to handle changes in project description bullets
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

  // Function to add a new description bullet to a project
  const handleAddProjectBullet = (projectIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].description.push('');
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Function to remove a description bullet from a project
  const handleRemoveProjectBullet = (projectIndex, descIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].description.splice(descIndex, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Function to handle changes in project links
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

  // Function to add a new link to a project
  const handleAddProjectLink = (projectIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].links.push({ name: '', url: '' });
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Function to remove a link from a project
  const handleRemoveProjectLink = (projectIndex, linkIndex) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[projectIndex].links.splice(linkIndex, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Function to add a new project
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

  // Function to remove a project
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
      // Create a filename based on the name
      filename: `${resumeData.personalInfo.name.replace(/\s+/g, '_').toLowerCase()}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas options (adjust scale for resolution)
      html2canvas: { scale: 2, logging: true, useCORS: true },
      // jspdf options
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf to generate and download the PDF
    try {
        html2pdf().from(element).set(opt).save();
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please ensure the preview is fully loaded and try again.");
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <p className="text-sm">Create, edit, and download your professional resume</p>
        </div>
      </header>

      <div className="container mx-auto p-4 flex-grow flex flex-col md:flex-row gap-6">
        {/* Edit/Controls Column */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
          <div className="flex mb-4 border-b">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center px-4 py-2 ${activeTab === 'edit' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <span className="mr-2">✏️</span>
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center px-4 py-2 ${activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <span className="mr-2">👁️</span>
              Preview
            </button>
          </div>

          {/* Edit Tab Content */}
          {activeTab === 'edit' && (
            <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2"> {/* Added max-height and overflow for scrolling */}
              {/* Personal Information Section */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Personal Information</h2>
                  <button
                    onClick={() => toggleEditSection('personalInfo')}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={editingSections.personalInfo ? 'Done Editing Personal Info' : 'Edit Personal Info'}
                  >
                    {editingSections.personalInfo ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.personalInfo ? (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => handleObjectInputChange('personalInfo', 'name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handleObjectInputChange('personalInfo', 'email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => handleObjectInputChange('personalInfo', 'phone', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                      <input
                        id="linkedin"
                        type="text"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => handleObjectInputChange('personalInfo', 'linkedin', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                      <input
                        id="github"
                        type="text"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => handleObjectInputChange('personalInfo', 'github', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><span className="font-medium">Name:</span> {resumeData.personalInfo.name}</p>
                    <p><span className="font-medium">Email:</span> {resumeData.personalInfo.email}</p>
                    <p><span className="font-medium">Phone:</span> {resumeData.personalInfo.phone}</p>
                    <p><span className="font-medium">LinkedIn:</span> {resumeData.personalInfo.linkedin}</p>
                    <p><span className="font-medium">GitHub:</span> {resumeData.personalInfo.github}</p>
                  </div>
                )}
              </div>

              {/* Career Objective Section */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Career Objective</h2>
                  <button
                    onClick={() => toggleEditSection('careerObjective')}
                     className="text-blue-500 hover:text-blue-700 focus:outline-none"
                     aria-label={editingSections.careerObjective ? 'Done Editing Career Objective' : 'Edit Career Objective'}
                  >
                    {editingSections.careerObjective ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.careerObjective ? (
                  <div>
                     <label htmlFor="objective" className="sr-only">Career Objective</label> {/* sr-only for accessibility */}
                    <textarea
                      id="objective"
                      value={resumeData.careerObjective}
                      onChange={(e) => setResumeData({...resumeData, careerObjective: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-32"
                    />
                  </div>
                ) : (
                  <p>{resumeData.careerObjective}</p>
                )}
              </div>

              {/* Education Section */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Education</h2>
                  <button
                    onClick={() => toggleEditSection('education')}
                     className="text-blue-500 hover:text-blue-700 focus:outline-none"
                     aria-label={editingSections.education ? 'Done Editing Education' : 'Edit Education'}
                  >
                    {editingSections.education ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.education ? (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        id="degree"
                        type="text"
                        value={resumeData.education.degree}
                        onChange={(e) => handleObjectInputChange('education', 'degree', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">GPA</label>
                      <input
                        id="gpa"
                        type="text"
                        value={resumeData.education.gpa}
                        onChange={(e) => handleObjectInputChange('education', 'gpa', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                      <input
                        id="institution"
                        type="text"
                        value={resumeData.education.institution}
                        onChange={(e) => handleObjectInputChange('education', 'institution', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="years" className="block text-sm font-medium text-gray-700">Years</label>
                      <input
                        id="years"
                        type="text"
                        value={resumeData.education.years}
                        onChange={(e) => handleObjectInputChange('education', 'years', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><span className="font-medium">Degree:</span> {resumeData.education.degree}</p>
                    <p><span className="font-medium">GPA:</span> {resumeData.education.gpa}</p>
                    <p><span className="font-medium">Institution:</span> {resumeData.education.institution} {resumeData.education.years}</p>
                  </div>
                )}
              </div>

              {/* Skills Section */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Skills</h2>
                  <button
                    onClick={() => toggleEditSection('skills')}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={editingSections.skills ? 'Done Editing Skills' : 'Edit Skills'}
                  >
                    {editingSections.skills ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.skills ? (
                  <div className="space-y-3">
                    {resumeData.skills.map((skill, index) => (
                      <div key={`skill-edit-${index}`} className="flex items-center gap-2"> {/* Added items-center */}
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleArrayItemChange('skills', index, e.target.value)}
                          className="flex-grow rounded-md border-gray-300 shadow-sm p-2 border"
                          aria-label={`Skill ${index + 1}`}
                        />
                        <button
                          onClick={() => handleRemoveArrayItem('skills', index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none" // Added text-sm
                          aria-label={`Remove Skill ${index + 1}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddArrayItem('skills', 'New Skill: ')} // Added default value
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Add Skill
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5">
                    {resumeData.skills.map((skill, index) => (
                      <li key={`skill-preview-${index}`}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Projects Section */}
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Projects</h2>
                  <button
                    onClick={() => toggleEditSection('projects')}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={editingSections.projects ? 'Done Editing Projects' : 'Edit Projects'}
                  >
                    {editingSections.projects ? '✓' : '✏️'}
                  </button>
                </div>

                {editingSections.projects ? (
                  <div className="space-y-6">
                    {resumeData.projects.map((project, projectIndex) => (
                      <div key={`project-edit-${projectIndex}`} className="border p-3 rounded bg-gray-50"> {/* Added bg-gray-50 */}
                        <div className="flex justify-between items-center mb-3 border-b pb-2"> {/* Added border-b */}
                          <h3 className="font-semibold text-md">Project {projectIndex + 1}</h3> {/* Added text-md */}
                          <button
                            onClick={() => handleRemoveProject(projectIndex)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs focus:outline-none"
                             aria-label={`Remove Project ${projectIndex + 1}`}
                          >
                            Remove Project
                          </button>
                        </div>

                        <div className="space-y-4"> {/* Increased space */}
                          <div>
                            <label htmlFor={`project-title-${projectIndex}`} className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                              id={`project-title-${projectIndex}`}
                              type="text"
                              value={project.title}
                              onChange={(e) => handleProjectFieldChange(projectIndex, 'title', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                          </div>

                           {/* Project Description Bullets */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-gray-700">Description Bullets</label>
                              <button
                                onClick={() => handleAddProjectBullet(projectIndex)}
                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs focus:outline-none"
                                aria-label={`Add description bullet to Project ${projectIndex + 1}`}
                              >
                                Add Bullet
                              </button>
                            </div>

                            <div className="space-y-2"> {/* Added space-y-2 */}
                              {project.description.map((desc, descIndex) => (
                                <div key={`desc-edit-${projectIndex}-${descIndex}`} className="flex items-start gap-2"> {/* Changed items-center to items-start */}
                                  <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => handleProjectDescriptionChange(projectIndex, descIndex, e.target.value)}
                                    className="flex-grow rounded-md border-gray-300 shadow-sm p-2 border text-sm"
                                    aria-label={`Project ${projectIndex + 1} description bullet ${descIndex + 1}`}
                                  />
                                  <button
                                    onClick={() => handleRemoveProjectBullet(projectIndex, descIndex)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none"
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
                               <label className="block text-sm font-medium text-gray-700">Links</label>
                                <button
                                 onClick={() => handleAddProjectLink(projectIndex)}
                                 className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs focus:outline-none"
                                  aria-label={`Add link to Project ${projectIndex + 1}`}
                               >
                                 Add Link
                               </button>
                             </div>

                             <div className="space-y-2"> {/* Added space-y-2 */}
                               {project.links.map((link, linkIndex) => (
                                 <div key={`link-edit-${projectIndex}-${linkIndex}`} className="flex flex-col sm:flex-row gap-2 border p-2 rounded"> {/* Added border, padding, rounded, flex-col for small screens */}
                                    <div className="flex-grow">
                                       <label htmlFor={`project-${projectIndex}-link-name-${linkIndex}`} className="block text-xs font-medium text-gray-600">Link Name</label>
                                      <input
                                        id={`project-${projectIndex}-link-name-${linkIndex}`}
                                        type="text"
                                        value={link.name}
                                        onChange={(e) => handleProjectLinkChange(projectIndex, linkIndex, 'name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
                                         aria-label={`Project ${projectIndex + 1} Link ${linkIndex + 1} Name`}
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <label htmlFor={`project-${projectIndex}-link-url-${linkIndex}`} className="block text-xs font-medium text-gray-600">URL</label>
                                      <input
                                        id={`project-${projectIndex}-link-url-${linkIndex}`}
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => handleProjectLinkChange(projectIndex, linkIndex, 'url', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
                                        aria-label={`Project ${projectIndex + 1} Link ${linkIndex + 1} URL`}
                                      />
                                    </div>
                                     <button
                                      onClick={() => handleRemoveProjectLink(projectIndex, linkIndex)}
                                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm self-center focus:outline-none" // Added self-center
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
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resumeData.projects.map((project, projectIndex) => (
                      <div key={`project-preview-${projectIndex}`}>
                        <h3 className="font-medium">{project.title}</h3>
                        {project.description.length > 0 && ( // Only render list if there are bullets
                          <ul className="list-disc pl-5 text-sm">
                            {project.description.map((desc, descIndex) => (
                              <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li>
                            ))}
                          </ul>
                        )}
                        {project.links.length > 0 && ( // Only render links if there are any
                          <div className="text-sm mt-1"> {/* Added mt-1 */}
                            {project.links.map((link, linkIndex) => (
                              <p key={`link-preview-${projectIndex}-${linkIndex}`}>
                                <span className="font-medium">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{link.url}</a> {/* Added styling and break-all */}
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
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Certifications</h2>
                  <button
                    onClick={() => toggleEditSection('certifications')}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
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
                          className="flex-grow rounded-md border-gray-300 shadow-sm p-2 border"
                          aria-label={`Certification ${index + 1}`}
                        />
                        <button
                          onClick={() => handleRemoveArrayItem('certifications', index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none"
                          aria-label={`Remove Certification ${index + 1}`}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddArrayItem('certifications', 'New Certification: ')}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Add Certification
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-5">
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
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2"> {/* Added max-height and overflow */}
              <p className="mb-4 text-gray-600">Review your resume before downloading. The layout here is approximate and may vary slightly in the final PDF.</p>
              <button
                onClick={downloadPDF}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                <span className="mr-2">📥</span>
                Download as PDF
              </button>
            </div>
          )}
        </div>

        {/* Resume Preview Column */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-6 rounded shadow sticky top-4 max-h-[calc(100vh-40px)] overflow-y-auto"> {/* Added sticky, max-height, overflow */}
            {/* This is the div that html2pdf will target */}
            <div
              ref={resumeRef}
              className="w-full mx-auto bg-white p-6" // Added p-6 for internal padding in the PDF
              style={{ maxWidth: '800px', minHeight: '1056px' }} // Adjusted minHeight slightly for A4 (approx 1123px, reduced for padding)
            >
              {/* Resume Header */}
              <div className="text-center mb-6"> {/* Increased mb */}
                <h1 className="text-2xl font-bold uppercase">{resumeData.personalInfo.name}</h1> {/* Increased text size */}
                <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1 mt-1"> {/* Adjusted gap */}
                  {resumeData.personalInfo.email && <p>E-mail: {resumeData.personalInfo.email}</p>} {/* Conditional rendering */}
                  {resumeData.personalInfo.phone && <p>Contact no: {resumeData.personalInfo.phone}</p>} {/* Conditional rendering */}
                </div>
                 <div className="flex flex-wrap justify-center text-sm gap-x-4 gap-y-1">
                  {resumeData.personalInfo.linkedin && <p>Linkedin: <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{resumeData.personalInfo.linkedin}</a></p>} {/* Added link */}
                  {resumeData.personalInfo.github && <p>Github: <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{resumeData.personalInfo.github}</a></p>} {/* Added link */}
                </div>
              </div>

              {/* Career Objective */}
              <div className="mb-6"> {/* Increased mb */}
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">CAREER OBJECTIVE</h2> {/* Adjusted border */}
                <p className="text-sm leading-relaxed">{resumeData.careerObjective}</p> {/* Added leading-relaxed */}
              </div>

              {/* Education */}
              <div className="mb-6"> {/* Increased mb */}
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">EDUCATION</h2> {/* Adjusted border */}
                {/* Display education details clearly */}
                <div className="flex justify-between text-sm mb-1">
                    <p><span className="font-medium">{resumeData.education.degree}</span></p>
                     <p>CGPA: {resumeData.education.gpa}</p>
                </div>
                 <div className="flex justify-between text-sm">
                    <p>{resumeData.education.institution}</p>
                     <p>{resumeData.education.years}</p>
                 </div>
              </div>

              {/* Skills */}
              <div className="mb-6"> {/* Increased mb */}
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">SKILLS</h2> {/* Adjusted border */}
                 {/* Skills are typically key-value pairs or lists. Display as list items. */}
                <ul className="list-disc pl-5 text-sm space-y-0.5"> {/* Added space-y-0.5 */}
                  {resumeData.skills.map((skill, index) => (
                    <li key={`skill-preview-${index}`}>{skill}</li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="mb-6"> {/* Increased mb */}
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">PROJECTS</h2> {/* Adjusted border */}
                <div className="space-y-5"> {/* Increased space */}
                  {resumeData.projects.map((project, projectIndex) => (
                    <div key={`project-preview-${projectIndex}`}>
                      <h3 className="text-md font-semibold mb-1">{project.title}</h3> {/* Adjusted text size and weight */}
                      {project.description.length > 0 && (
                         <ul className="list-disc pl-5 text-sm space-y-0.5">
                           {project.description.map((desc, descIndex) => (
                             <li key={`desc-preview-${projectIndex}-${descIndex}`}>{desc}</li>
                           ))}
                         </ul>
                      )}
                      {project.links.length > 0 && (
                        <div className="text-sm mt-1 space-y-0.5"> {/* Added space-y-0.5 */}
                          {project.links.map((link, linkIndex) => (
                            <p key={`link-preview-${projectIndex}-${linkIndex}`}>
                              <span className="font-medium">{link.name || 'Link'}:</span> <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{link.url}</a>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6"> {/* Increased mb */}
                <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2> {/* Adjusted border */}
                <ul className="list-disc pl-5 text-sm space-y-0.5"> {/* Added space-y-0.5 */}
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
    </div>
  );
}