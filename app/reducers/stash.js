// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

var initialState = [{name: 'stash1234', files: ['bacd.txt', 'lol.js']}];

export default function stash(state = initialState, action) {
  switch (action.type) {
  // case INCREMENT_COUNTER:
  //   return state + 1;
  // case DECREMENT_COUNTER:
  //   return state - 1;
  default:
    return state;
  }
}
