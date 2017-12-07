import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawReducer from './raw';
import SetReducer from './set';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  raw: RawReducer,
  set: SetReducer,
});

export default rootReducer;
