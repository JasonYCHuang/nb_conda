import axios from 'axios';

export const SAY = 'say';

const say = (word = 'hallo') => {
  const request =  axios.get(`http://localhost:8888/chemotion_dl/${word}`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: SAY, payload: data })
    });
  };
};

export { say };
