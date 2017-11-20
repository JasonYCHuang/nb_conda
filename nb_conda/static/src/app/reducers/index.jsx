import { combineReducers } from 'redux';
import CategoryReducer from './category';

const rootReducer = combineReducers({
  category: CategoryReducer,
});

export default rootReducer;
