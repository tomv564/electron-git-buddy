import { RECEIVE_COMMITS } from '../actions/index';

export default function commits(state = [], action) {
  switch (action.type) {

  case RECEIVE_COMMITS:
    return action.commits;

  default:
    return state;

  }
}
