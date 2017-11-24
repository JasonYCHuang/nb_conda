import { FETCH_RAW_DATA_FILES } from '../actions/raw-data';

const defaultState = {
  files: [],
};

const RawDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_RAW_DATA_FILES:
      console.log(action.payload)
      return Object.assign({}, state, {
        files: action.payload,
      });
    default:
      return state;
  }
};

export default RawDataReducer;
