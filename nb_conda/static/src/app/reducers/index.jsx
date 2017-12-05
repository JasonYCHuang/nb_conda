import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawFileReducer from './raw-file';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  rawFile: RawFileReducer,
});

export default rootReducer;
