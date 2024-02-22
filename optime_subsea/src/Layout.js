// Layout.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style/Layoutstyle.css';
import { setCurrentCompany, setCurrentProject } from './redux/actions/currentSelectionActions'; // Adjust the import path as needed

const Layout = () => {
  const [showAddCompanyInput, setShowAddCompanyInput] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const dispatch = useDispatch();
  const companies = useSelector(state => state.companies);

  const handleAddCompanyKeyPress = (e) => {
    if (e.key === 'Enter' && companyName.trim()) {
      dispatch({ type: 'ADD_COMPANY', payload: { name: companyName.trim() } });
      setCompanyName('');
      setShowAddCompanyInput(false);
    }
  };

  const handleAddProjectKeyPress = (e) => {
    if (e.key === 'Enter' && selectedCompany && projectName.trim()) {
      dispatch({
        type: 'ADD_PROJECT',
        payload: { companyName: selectedCompany, project: projectName.trim() }
      });
      setProjectName('');
      setSelectedCompany(null); // Clear selected company to hide the input box
    }
  };

  const handleProjectClick = (companyName, projectName) => {
   
    dispatch(setCurrentCompany(companyName));
    dispatch(setCurrentProject(projectName));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">Manage Companies and Projects</div>
      <div className="sidebar-content">
        {showAddCompanyInput ? (
          <input
            autoFocus
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyPress={handleAddCompanyKeyPress}
            placeholder="Enter company name"
            className="sidebar-input"
            onBlur={() => setShowAddCompanyInput(false)}
          />
        ) : (
          <button
            onClick={() => setShowAddCompanyInput(true)}
            className="add-company-btn"
          >
            + Add Company
          </button>
        )}

        {companies.map((company, index) => (
          <div key={index} className="company-section">
            <div className="company-name">{company.name}</div>
            {company.projects && company.projects.map((project, projIndex) => (
              <div
                key={projIndex}
                className="project-name clickable"
                onClick={() => handleProjectClick(company.name, project)}
              >
                {project}
              </div>
            ))}
            {selectedCompany === company.name && (
              <>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyPress={handleAddProjectKeyPress}
                  placeholder="Enter project name"
                  className="project-input"
                />
                <button
                  onClick={() => {
                    handleAddProjectKeyPress({ key: 'Enter' });
                  }}
                  className="add-project-confirm-btn"
                >
                  Add Project
                </button>
              </>
            )}
            <button
              onClick={() => setSelectedCompany(company.name)}
              className="add-project-btn"
            >
              + Add Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
