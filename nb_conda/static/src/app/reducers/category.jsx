import { SELECT_CATEGORY } from '../actions/category';
import optCategories from '../constants/opt-categories';

const defaultCategory = optCategories[0].value;

const CategoryReducer = (state = defaultCategory, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export default CategoryReducer;
