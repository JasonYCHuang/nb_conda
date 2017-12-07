import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawReducer from './raw';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  raw: RawReducer,
});

export default rootReducer;
