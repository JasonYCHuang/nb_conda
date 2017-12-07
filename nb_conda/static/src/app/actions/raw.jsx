import axios from 'axios';
import updArrElement from '../helpers/utils_array';

export const FETCH_RAW = 'fetch_raw';
export const UPDATE_RAW = 'update_raw';

const hostUrl = '/chemotion_dl';

const convToTopMet = (getState) => {
  const { options, selected } = getState().method;
  const target = options.map((opt) => {
    if (opt.value === selected) {
      return opt.label;
    }
    return null;
  }).filter(o => o != null)[0];
  return target ? target.split(' >> ') : [null, null];
};

const dpFlagAsProcessing = (dispatch, getState, target) => {
  const { files } = getState().raw;
  const idx = files.findIndex(f => f.name === target);
  const updFile = Object.assign({}, files[idx], { status: 'processing' });
  const newFiles = updArrElement(files, idx, updFile);
  dispatch({ type: UPDATE_RAW, payload: newFiles });
};

const convertRaw = (target) => {
  const baseUrl = `${hostUrl}/raw_files/convert`;

  return (dispatch, getState) => {
    dpFlagAsProcessing(dispatch, getState, target);

    const [topic, method] = convToTopMet(getState);
    const params = `?target=${target}&topic=${topic}&method=${method}`;
    const request = axios.get(baseUrl + params);

    request.then(({ data }) => {
      dispatch({
        type: FETCH_RAW,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const fetchRaw = () => {
  const baseUrl = `${hostUrl}/raw_files`;

  return (dispatch, getState) => {
    const [topic, method] = convToTopMet(getState);
    const params = topic && method ? `?topic=${topic}&method=${method}` : '';
    const request = axios.get(baseUrl + params);

    request.then(({ data }) => {
      dispatch({
        type: FETCH_RAW,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const uploadRaw = (files) => {
  const body = new FormData();
  files.forEach(f => body.append(f.id || f.name, f));

  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_files`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return (dispatch, getState) => {
    const [topic, method] = convToTopMet(getState);
    const params = topic && method ? `?topic=${topic}&method=${method}` : '';
    axios.post(url + params, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const deleteRaw = (files) => {
  const body = { files };
  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_files`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'application/json',
    },
  };

  return (dispatch, getState) => {
    const [topic, method] = convToTopMet(getState);
    const params = topic && method ? `?topic=${topic}&method=${method}` : '';
    axios.put(url + params, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { fetchRaw, uploadRaw, deleteRaw, convertRaw };
