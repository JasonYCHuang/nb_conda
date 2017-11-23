import { combineReducers } from 'redux';
import SelectMethodReducer from './select-method';
import RawDataReducer from './raw-data';

const rootReducer = combineReducers({
  method: SelectMethodReducer,
  rawData: RawDataReducer,
});

export default rootReducer;
