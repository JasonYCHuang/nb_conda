import { SELECT_METHOD, FETCH_METHOD_OPTS } from '../actions/select-method';

const defaultState = {
  options: [],
  selected: 0,
};

const treeToOpts = tree => (
  tree.map((t, idx) => ({ value: idx, label: t }))
);

const SelectMethodReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_METHOD:
      return Object.assign({}, state, {
        selected: action.payload,
      });
    case FETCH_METHOD_OPTS:
      return Object.assign({}, state, {
        options: treeToOpts(action.payload),
        selected: 0,
      });
    default:
      return state;
  }
};

export default SelectMethodReducer;
