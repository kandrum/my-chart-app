import { SET_UPLOAD_PROJECT } from '../actionTypes';

const initialState = { visible: false, projectName: '', companyName: '' };

const uploadProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOAD_PROJECT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default uploadProjectReducer;
