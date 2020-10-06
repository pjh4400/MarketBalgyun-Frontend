import { combineReducers } from 'redux';
import sales from './sales';
import general from './general';

const rootReducer = combineReducers({
    sales,
    general,
  });

export default rootReducer;