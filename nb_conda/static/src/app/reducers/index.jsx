import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
});

export default rootReducer;
