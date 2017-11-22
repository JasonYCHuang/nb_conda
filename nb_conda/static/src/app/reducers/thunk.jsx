import { SAY } from '../actions/thunk';

const SayReducer = (state = 'hallo', action) => {
  console.log(action)
  switch (action.type) {
    case SAY:
      return action.payload;
    default:
      return state;
  }
};

export default SayReducer;
