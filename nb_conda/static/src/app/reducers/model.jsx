import { CONVERT_MODEL } from '../actions/model';

const defaultState = {
  objs: [],
};

const ModelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CONVERT_MODEL:
    console.log(action.payload)
      return Object.assign({}, state, {
        objs: [...state, action.payload],
      });
    default:
      return state;
  }
};

export default ModelReducer;
