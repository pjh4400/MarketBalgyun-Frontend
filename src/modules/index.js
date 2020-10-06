import { combineReducers } from 'redux';
import sales from './sales';
import register from './register';

const rootReducer = combineReducers({
    sales,
    register,
  });

export default rootReducer;