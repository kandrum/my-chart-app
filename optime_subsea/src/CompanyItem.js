// CompanyItem.js
import React, { useState } from 'react';
import Styles from './style/CompanyItemstyle.module.css';

function CompanyItem({ companyName, onProjectSelect }) {
  const [showProjectsInput, setShowProjectsInput] = useState(false);//toggle the visibility of inputfeild for adding new project
  const [projectName, setProjectName] = useState('');//stores the current input value for the new project name.
  const [projects, setProjects] = useState([]);//Stores projectName associated with company.

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
      <button onClick={handleAddProjectClick} className={Styles.addProjectButton}> {/* plus button here*/}
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
        ))} {/* List rendering with each CompnayItem displays clickable project names that when clicked triggers onProjectSelect*/}
      </ul>
    </li>
  );
}

export default CompanyItem;
