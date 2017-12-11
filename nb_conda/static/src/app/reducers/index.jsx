import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawReducer from './raw';
import SetReducer from './set';
import ModelReducer from './model';
import PredictionReducer from './prediction';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  raw: RawReducer,
  set: SetReducer,
  model: ModelReducer,
  prediction: PredictionReducer,
});

export default rootReducer;
