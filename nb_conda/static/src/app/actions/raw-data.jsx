import axios from 'axios';

export const FETCH_RAW_DATA_FILES = 'fetch _raw_data_files';

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

export { fetchRawDataFiles };
