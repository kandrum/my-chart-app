//companiesReducers.js
import { ADD_COMPANY, SET_COMPANIES } from '../actionTypes';

const initialState = [];

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      return [...state, action.payload];
    case SET_COMPANIES:
      return action.payload;
    default:
      return state;
  }
};

export default companiesReducer;
