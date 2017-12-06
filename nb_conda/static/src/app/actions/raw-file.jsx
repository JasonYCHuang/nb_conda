import axios from 'axios';

export const FETCH_RAW_FILES = 'fetch_raw_files';

const hostUrl = '/chemotion_dl';

const selectedToTopicMethod = (getState) => {
  const { options, selected } = getState().method;
  const target = options.map((opt) => {
    if (opt.value === selected) {
      return opt.label;
    }
    return null;
  }).filter(o => o != null)[0];
  return target ? target.split(' >> ') : [null, null];
};

const convertRawFile = (target) => {
  const baseUrl = `${hostUrl}/raw_files/convert`;

  return (dispatch, getState) => {
    const [topic, method] = selectedToTopicMethod(getState);
    const params = `?target=${target}&topic=${topic}&method=${method}`;
    const request = axios.get(baseUrl + params);

    request.then(({ data }) => {
      dispatch({
        type: FETCH_RAW_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const fetchRawFiles = () => {
  const baseUrl = `${hostUrl}/raw_files`;

  return (dispatch, getState) => {
    const [topic, method] = selectedToTopicMethod(getState);
    const params = topic && method
      ? `?topic=${topic}&method=${method}` : '';
    const request = axios.get(baseUrl + params);

    request.then(({ data }) => {
      dispatch({
        type: FETCH_RAW_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const uploadRawFiles = (files) => {
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

  return (dispatch) => {
    axios.post(url, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const deleteRawFiles = (files) => {
  const body = { files };
  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_files`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    axios.put(url, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { fetchRawFiles, uploadRawFiles, deleteRawFiles, convertRawFile };
