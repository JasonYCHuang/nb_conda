import { CONVERT_MODEL } from '../actions/model';

const defaultState = {
  files: [],
};

const ModelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONVERT_MODEL:
      return Object.assign({}, state, {
        files: [...state.files, action.payload],
      });
    default:
      return state;
  }
};

export default ModelReducer;
