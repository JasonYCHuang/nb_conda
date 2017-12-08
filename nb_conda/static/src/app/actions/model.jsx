// import axios from 'axios';

export const CONVERT_MODEL = 'convert_model';

// const hostUrl = '/chemotion_dl';

const convertModel = (name, description, ckdItems) => {
  const model = {
    name, description, ckdItems, status: 'converting',
  };

  return {
    type: CONVERT_MODEL,
    payload: model,
  };
};

export { convertModel };
