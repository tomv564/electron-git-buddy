import { RECEIVE_DIFF } from '../actions/index';

export default function diffs(state = {}, action) {
  switch (action.type) {

  case RECEIVE_DIFF:
    var update = {};
    update[action.filePath] = action.hunks;
    console.log(update);
    return Object.assign({}, update);

  default:
    return state;

  }
}
