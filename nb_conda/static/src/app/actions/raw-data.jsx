import axios from 'axios';
const request = require('superagent');

export const FETCH_RAW_DATA_FILES = 'fetch_raw_data_files';
export const UPLOAD_RAW_DATA = 'upload_raw_data';

const hostUrl = '/chemotion_dl';

const fetchRawDataFiles = () => {
  const req = axios.get(`${hostUrl}/raw_data`);

  return (dispatch) => {
    req.then(({ data }) => {
      dispatch({
        type: FETCH_RAW_DATA_FILES,
        payload: data.files,
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

/*
import 'whatwg-fetch';

const uploadRawData = (files) => {
  const data = new FormData();
  files.forEach((file)=> {
    data.append(file.id || file.name, file);
  });
  const token = document.cookie.replace('_xsrf=', '');
  data.append('_xsrf', token);
  const url = `${hostUrl}/raw_data`;

  console.log('start - - - - - ')
  return ()=>fetch(url, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if(response.ok == false) {
      let msg = 'Files uploading failed: ';
      if(response.status == 413) {
        msg += 'File size limit exceeded. Max size is 50MB'
      } else {
        msg += response.statusText;
      }
    }
  })
};
*/

const uploadRawData = (files) => {
  // const data = new FormData()
  // files.forEach(f => data.append(f.id || f.name, f));
  const token = document.cookie.replace('_xsrf=', '');
  // //data.append('_xsrf', token);

  const url = `${hostUrl}/raw_data`;

  const req = request.post(url).set('X-CSRFToken', token);
  files.forEach(file => {
      req.attach(file.name, file);
  });
  req.end(m => console.log(m));
};

/*
const uploadRawData = (files) => {
  const data = new FormData()
  files.forEach(f => data.append(f.id || f.name, f));

  const token = document.cookie.replace('_xsrf=', '');
  const url = `${hostUrl}/raw_data`;
  const config = {
    headers: {
      'X-CSRFToken': token,
      'Content-Type': 'multipart/form-data',
    },
  };

      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
  const request = axios.post(url, data, config);
  request.then((dt) => {
    console.log(dt)
  }).catch((err) => {
    console.log(err);
  });
  // TBD
};
*/
export { fetchRawDataFiles, uploadRawData };
