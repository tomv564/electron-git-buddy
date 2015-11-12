import { RECEIVE_STATUS, DECREMENT_COUNTER } from '../actions/index';

var initialState = {staged: ['bacd.txt', 'lol.js'], unstaged: []};

export default function changes(state = initialState, action) {
  switch (action.type) {
  
  case RECEIVE_STATUS:
  	return {staged: [], unstaged: action.statuses}
  //   return state + 1;
  // case DECREMENT_COUNTER:
  //   return state - 1;
  default:
    return state;
  }
}
