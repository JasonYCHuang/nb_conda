import { FETCH_RAW_FILES, UPDATE_RAW_FILES } from '../actions/raw-file';

const defaultState = {
  files: [],
};

const RawFileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_RAW_FILES:
      return Object.assign({}, state, {
        files: action.payload,
      });
    case UPDATE_RAW_FILES:
      return Object.assign({}, state, {
        files: action.payload,
      });
    default:
      return state;
  }
};

export default RawFileReducer;
