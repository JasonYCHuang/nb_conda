import { MAKE_PREDICT } from '../actions/prediction';

const defaultState = {
  results: [],
};

const PredictionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAKE_PREDICT:
      return Object.assign({}, state, {
        results: action.payload,
      });
    default:
      return state;
  }
};

export default PredictionReducer;
