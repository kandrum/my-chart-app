import React, { useState } from 'react';

function CompanyItem({ companyName, onProjectSelect }) {
  const [showProjectsInput, setShowProjectsInput] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);

  const handleAddProjectClick = () => {
    setShowProjectsInput(!showProjectsInput);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectNameClick = (projectName) => {
    onProjectSelect(companyName, projectName);
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    if (projectName.trim() !== '') {
      setProjects([...projects, projectName]);
      setProjectName(''); // Reset input after submission
    }
    setShowProjectsInput(false); // Hide input field after submission
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{companyName}</span>
        <button onClick={handleAddProjectClick} className="bg-blue-500 text-white p-2 rounded-full">
          {/* Plus icon could be an SVG or an image */}
          +
        </button>
      </div>
      {showProjectsInput && (
        <form onSubmit={handleSubmitProject} className="my-2">
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            placeholder="Enter project name"
            className="border-2 border-gray-200 rounded py-2 px-4 w-full my-2"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded my-2">
            Submit
          </button>
        </form>
      )}
      <ul className="list-disc pl-5">
        {projects.map((project, index) => (
          <li key={index} onClick={() => handleProjectNameClick(project)} className="cursor-pointer hover:text-blue-600">
            {project}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyItem;
