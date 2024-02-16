import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCompany } from './redux/actions/companiesActions';
import CompanyItem from './CompanyItem';

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
    <div className="bg-gray-200 shadow-lg h-full">
      <div className="flex flex-col items-center py-6">
        <button
          onClick={handleAddCompanyClick}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Add Company
        </button>
        {showInput && (
          <form onSubmit={handleSubmit} className="w-full px-4 my-2">
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              placeholder="Enter company name"
              className="mt-2 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md mt-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        )}
        <div className="w-full px-4">
          {companies.map((company, index) => (
            <CompanyItem key={index} companyName={company} onProjectSelect={onProjectSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
