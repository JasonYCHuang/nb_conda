import { FETCH_SET } from '../actions/set';

const defaultState = {
  files: [],
};

const SetReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SET:
      return Object.assign({}, state, {
        files: action.payload,
      });
    default:
      return state;
  }
};

export default SetReducer;
