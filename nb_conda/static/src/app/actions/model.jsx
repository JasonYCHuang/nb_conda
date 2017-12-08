import axios from 'axios';
import convToTopMet from '../helpers/utils_biz';

export const UPDATE_MODEL = 'update_model';
export const FETCH_MODEL = 'fetch_model';

const hostUrl = '/chemotion_dl';

const dpAddModel = (dispatch, model) => {
  dispatch({ type: UPDATE_MODEL, payload: model });
};

const convertModel = (name, description, ckdItems) => {
  const baseUrl = `${hostUrl}/model_files`;
  const token = document.cookie.replace('_xsrf=', '');
  const model = {
    name, description, ckdItems, status: 'converting',
  };

  return (dispatch, getState) => {
    dpAddModel(dispatch, model);

    const [topic, method] = convToTopMet(getState);
    const body = { model };
    const config = {
      headers: {
        'X-CSRFToken': token,
        'Content-Type': 'application/json',
        topic,
        method,
      },
    };
    const request = axios.post(baseUrl, body, config);

    request.then(({ data }) => {
      // dispatch({
      //   type: FETCH_MODEL,
      //   payload: data.files,
      // });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { convertModel };
