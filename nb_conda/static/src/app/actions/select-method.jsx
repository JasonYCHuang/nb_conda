import axios from 'axios';

export const SELECT_METHOD = 'select_method';
export const FETCH_METHOD_OPTS = 'fetch_method_opts';

const hostUrl = 'http://localhost:8888/chemotion_dl';

const selectMethod = method => (
  {
    type: SELECT_METHOD,
    payload: method,
  }
);

const fetchMethodOpts = () => {
  const request =  axios.get(`${hostUrl}/select_methods`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_METHOD_OPTS,
        payload: data.tree,
      })
    }).catch((err) => {
      console.log(err);
    });
  };
}

export { selectMethod, fetchMethodOpts };
