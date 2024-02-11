import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCompany } from './redux/actions/companiesActions'; // Adjust import path as needed
import CompanyItem from './CompanyItem'; // Adjust import path as needed
import Styles from './style/Layoutstyle.module.css';

// Add Redux state and actions to props
const mapStateToProps = (state) => ({
  companies: state.companies,
});

const mapDispatchToProps = (dispatch) => ({
  addCompany: (companyName) => dispatch(addCompany(companyName)),
});

function Layout({ companies, addCompany, onProjectSelect }) {
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
    if (companyName.trim() !== '') { // Check if the companyName is not just empty spaces
      addCompany(companyName); // Dispatch the action to add a new company
      setCompanyName(''); // Clear the input field
    }
    setShowInput(false); // Hide the input field
  };

  return (
    <div className={Styles.component}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
