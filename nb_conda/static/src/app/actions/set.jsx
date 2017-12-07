import axios from 'axios';
import convToTopMet from '../helpers/utils_biz';

export const FETCH_SET = 'fetch_set';

const hostUrl = '/chemotion_dl';

const fetchSet = () => {
  const baseUrl = `${hostUrl}/set_files`;

  return (dispatch, getState) => {
    const [topic, method] = convToTopMet(getState);
    const params = topic && method ? `?topic=${topic}&method=${method}` : '';
    const request = axios.get(baseUrl + params);

    request.then(({ data }) => {
      dispatch({
        type: FETCH_SET,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { fetchSet };
