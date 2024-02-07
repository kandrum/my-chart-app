// Layout.js
import React, { useState } from 'react';
import CompanyItem from './CompanyItem';
import Styles from './style/Layoutstyle.module.css';

function Layout({ companies, setCompanies, onProjectSelect }) {
  const [showInput, setShowInput] = useState(false);
  const [companyName, setCompanyName] = useState('');
  
  const handleAddCompanyClick = () => {
    setShowInput(!showInput); // Toggle the input display
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (companyName.trim() !== '') {
      setCompanies([...companies, companyName]);
      setCompanyName(''); // Clear the input field
    }
    setShowInput(false); 
  };

  return (
    <div className={Styles.component3}>
      <div className={Styles.sidebar}>
        <button onClick={handleAddCompanyClick} className={Styles.dropdownButton}>Add Company</button>
        {showInput && (
          <form onSubmit={handleSubmit} className={Styles.companyForm}>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              placeholder="Enter company name"
              className={Styles.companyInput}
            />
            <button type="submit" className={Styles.submitButton}>Submit</button>
          </form>
        )}
        <ul className={Styles.companyList}>
          {companies.map((company, index) => (
            <CompanyItem key={index} companyName={company} onProjectSelect={onProjectSelect} />
          ))}
        </ul>
      </div>
     
    </div>
  );
}

export default Layout;
