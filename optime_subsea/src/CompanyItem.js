// CompanyItem.js
import React, { useState } from 'react';
import Styles from './style/CompanyItemstyle.module.css';

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
      setProjectName(''); 
    }
    setShowProjectsInput(false); 
  };

  return (
    <li>
      <span className={Styles.companyName}>{companyName}</span>
      <button onClick={handleAddProjectClick} className={Styles.addProjectButton}>
      </button>
      {showProjectsInput && (
        <form onSubmit={handleSubmitProject} className={Styles.projectForm}>
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            placeholder="Enter project name"
            className={Styles.projectInput}
          />
          <button type="submit" className={Styles.submitButton}>Submit</button>
        </form>
      )}
      <ul className={Styles.projectList}>
        {projects.map((project, index) => (
           <li key={index} onClick={() => handleProjectNameClick(project)}>{project}</li>
        ))}
      </ul>
    </li>
  );
}

export default CompanyItem;
