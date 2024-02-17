import React, { useState } from 'react';
import './style/CompanyItemstyle.css';

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
    <div className="company-item-container">
      <div className="company-header">
        <span className="company-name">{companyName}</span>
        <button onClick={handleAddProjectClick} className="add-project-button">
          {/* Plus icon could be an SVG or an image */}
          +
        </button>
      </div>
      {showProjectsInput && (
        <form onSubmit={handleSubmitProject} className="project-form">
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            placeholder="Enter project name"
            className="project-input"
          />
          <button type="submit" className="submit-project-button">
            Submit
          </button>
        </form>
      )}
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} onClick={() => handleProjectNameClick(project)} className="project-item">
            {project}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyItem;
