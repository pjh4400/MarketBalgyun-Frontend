import { combineReducers } from 'redux';
import auth from './auth';
import sales from './sales';

const rootReducer = combineReducers({
    auth,
    sales,
  });

export default rootReducer;