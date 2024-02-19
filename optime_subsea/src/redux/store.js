//store.js
import { createStore,combineReducers } from 'redux';
import companiesReducer from './reducers/companiesReducers';
import uploadProjectReducer from './reducers/uploadProjectReducers';
import userTypeReduce from './reducers/VerifyReducer';

const rootReducer = combineReducers({
  companies: companiesReducer,
  uploadProject: uploadProjectReducer,
  userType:userTypeReduce,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
