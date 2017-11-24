import axios from 'axios';

export const FETCH_RAW_DATA_FILES = 'fetch_raw_data_files';
export const UPLOAD_RAW_DATA = 'upload_raw_data';

const hostUrl = '/chemotion_dl';

const fetchRawDataFiles = () => {
  const request = axios.get(`${hostUrl}/raw_data`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_RAW_DATA_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const uploadRawData = (files) => {
  const body = new FormData();
  files.forEach(f => body.append(f.id || f.name, f));

  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_data`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'multipart/form-data',
    },
  };

  return (dispatch) => {
    axios.post(url, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW_DATA_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

const deleteRawDataFiles = (files) => {
  const body = { 'files': files };
  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_data`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    axios.put(url, body, config).then(({ data }) => {
      dispatch({
        type: FETCH_RAW_DATA_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { fetchRawDataFiles, uploadRawData, deleteRawDataFiles };
