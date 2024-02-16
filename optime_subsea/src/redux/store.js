//store.js
import { createStore,combineReducers } from 'redux';
import companiesReducer from './reducers/companiesReducers';
import uploadProjectReducer from './reducers/uploadProjectReducers';

const rootReducer = combineReducers({
  companies: companiesReducer,
  uploadProject: uploadProjectReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
