import { RECEIVE_STASHES, STASH_CREATED, STASH_POPPED } from '../actions/index';

export default function stashes(state = [], action) {
  switch (action.type) {

  case RECEIVE_STASHES:
    return action.stashes;
  case STASH_CREATED:
    return state.concat('stash');
  case STASH_POPPED:
    const start = state.length < 2 ? 0 : 1;
    return state.slice(start);
  default:
    return state;
  }
}
