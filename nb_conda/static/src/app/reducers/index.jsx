import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawReducer from './raw';
import SetReducer from './set';
import ModelReducer from './model';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  raw: RawReducer,
  set: SetReducer,
  model: ModelReducer,
});

export default rootReducer;
