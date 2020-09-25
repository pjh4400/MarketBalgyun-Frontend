import { combineReducers } from 'redux';
import auth from './auth';
import sales from './sales';
import product from './product';

const rootReducer = combineReducers({
    auth,
    sales,
    product,
  });

export default rootReducer;