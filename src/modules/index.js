import { combineReducers } from 'redux';
import auth from './auth';
import sales from './sales';
import general from './general';

const rootReducer = combineReducers({
    auth,
    sales,
    general,
  });

export default rootReducer;