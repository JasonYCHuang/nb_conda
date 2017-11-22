import axios from 'axios';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_CATEGORY_OPTS = 'fetch_category_opts';

const hostUrl = 'http://localhost:8888/chemotion_dl';

const selectCategory = category => (
  {
    type: SELECT_CATEGORY,
    payload: category,
  }
);

const fetchCategoryOpts = () => {
  const request =  axios.get(`${hostUrl}/categories`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORY_OPTS,
        payload: data.tree,
      })
    }).catch((err) => {
      console.log(err);
    });
  };
}

export { selectCategory, fetchCategoryOpts };
