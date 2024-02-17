import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCompany } from './redux/actions/companiesActions';
import CompanyItem from './CompanyItem';
import './style/Layoutstyle.css';

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
    setShowInput(!showInput);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (companyName.trim() !== '') {
      addCompany(companyName);
      setCompanyName('');
    }
    setShowInput(false);
  };

  return (
    <div className="layout-container">
      <div className="layout-buttons">
        <button onClick={handleAddCompanyClick} className="add-company-button">
          Add Company
        </button>
        {showInput && (
          <form onSubmit={handleSubmit} className="company-form">
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              placeholder="Enter company name"
              className="company-input"
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
        <div className="company-list">
          {companies.map((company, index) => (
            <CompanyItem key={index} companyName={company} onProjectSelect={onProjectSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
