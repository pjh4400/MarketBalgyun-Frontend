import { combineReducers } from 'redux';
import sales from './sales';
import general from './general';
import consigner from './consigner';

const rootReducer = combineReducers({
    sales,
    general,
    consigner,
  });

export default rootReducer;