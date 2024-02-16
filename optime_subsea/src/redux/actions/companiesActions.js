//companiesActions.js
import { ADD_COMPANY, SET_COMPANIES } from '../actionTypes';

export const addCompany = (companyName) => ({
  type: ADD_COMPANY,
  payload: companyName,
});

export const setCompanies = (companies) => ({
  type: SET_COMPANIES,
  payload: companies,
});
