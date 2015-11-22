import { RECEIVE_STASHES, STASH_CREATED, STASH_POPPED } from '../actions/index';

export default function stashes(state = [], action) {
  switch (action.type) {

  case RECEIVE_STASHES:
    return action.stashes;
  case STASH_CREATED:
    return state.concat(action.stash);
  case STASH_POPPED:
    if (state.length < 2) return [];
    return state.slice(1);
  default:
    return state;
  }
}
