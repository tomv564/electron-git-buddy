import { RECEIVE_STASHES, STASH_CREATED } from '../actions/index';

export default function stashes(state = [], action) {
  switch (action.type) {

  case RECEIVE_STASHES:
    return action.stashes;
  case STASH_CREATED:
    return state.concat('stash');
  default:
    return state;
  }
}
