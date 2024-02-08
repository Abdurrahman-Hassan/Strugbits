// reducers/index.js
import { combineReducers } from 'redux';
import itemsReducer from './itemsSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;
