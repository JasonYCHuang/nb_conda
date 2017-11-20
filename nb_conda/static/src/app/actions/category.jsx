export const SELECT_CATEGORY = 'select_category';

const selectCategory = category => (
  {
    type: SELECT_CATEGORY,
    payload: category,
  }
);

export { selectCategory };
