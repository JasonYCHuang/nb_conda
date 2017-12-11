import { FETCH_MODEL, UPDATE_MODEL } from '../actions/model';

const defaultState = {
  files: [],
};

const ModelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_MODEL:
      return Object.assign({}, state, {
        files: action.payload,
      });
    case UPDATE_MODEL:
      return Object.assign({}, state, {
        files: [...state.files, action.payload],
      });
    default:
      return state;
  }
};

export default ModelReducer;
