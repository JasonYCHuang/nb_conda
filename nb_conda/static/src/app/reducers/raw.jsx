import { FETCH_RAW, UPDATE_RAW } from '../actions/raw';

const defaultState = {
  files: [],
};

const RawReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_RAW:
    case UPDATE_RAW:
      return Object.assign({}, state, {
        files: action.payload,
      });
    default:
      return state;
  }
};

export default RawReducer;
