import axios from 'axios';

export const FETCH_RAW_DATA_FILES = 'fetch_raw_data_files';
export const UPLOAD_RAW_DATA = 'upload_raw_data';

const hostUrl = 'http://localhost:8888/chemotion_dl';

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
  const fData = files[0];
  const formData = new FormData();
  formData.append('name', fData.name);
  formData.append('_xsrf', '2|1521cadb|1666b1715674b83f2ed045d322c0b470|1510846604');

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'X-CSRFToken': '2|1521cadb|1666b1715674b83f2ed045d322c0b470|1510846604',
    },
  };
  const url = `${hostUrl}/raw_data`;
  const request = axios.post(url, formData, config);
  console.log('- - - - launch - - - - -')

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: UPLOAD_RAW_DATA,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

export { fetchRawDataFiles, uploadRawData };
