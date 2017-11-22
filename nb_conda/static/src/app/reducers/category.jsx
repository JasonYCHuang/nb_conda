import { SELECT_CATEGORY, FETCH_CATEGORY_OPTS } from '../actions/category';

const defaultState = {
  options: [],
  selected: 0,
}

const treeToOpts = (tree) => (
  tree.map((t, idx) => ({ value: idx, label: t }))
);

const CategoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        selected: action.payload,
      });
    case FETCH_CATEGORY_OPTS:
      return Object.assign({}, state, {
        options: treeToOpts(action.payload),
        selected: 0,
      });
    default:
      return state;
  }
};

export default CategoryReducer;
