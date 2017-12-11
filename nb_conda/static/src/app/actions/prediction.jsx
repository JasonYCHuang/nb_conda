import axios from 'axios';
import convToTopMet from '../helpers/utils_biz';

export const MAKE_PREDICT = 'make_predict';

const hostUrl = '/chemotion_dl';

const makePrediction = (model, smiles) => {
  const baseUrl = `${hostUrl}/predictions`;
  const token = document.cookie.replace('_xsrf=', '');

  return (dispatch, getState) => {
    const [topic, method] = convToTopMet(getState);
    const params = `?topic=${topic}&method=${method}`;
    const body = { model, smiles };
    const config = {
      headers: {
        'X-CSRFToken': token,
        'Content-Type': 'application/json',
      },
    };
    const request = axios.post(baseUrl + params, body, config);

    request.then(({ data }) => {
      dispatch({
        type: MAKE_PREDICT,
        payload: data.results || [],
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { makePrediction };
