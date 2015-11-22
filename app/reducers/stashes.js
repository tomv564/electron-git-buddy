import { RECEIVE_STASHES } from '../actions/index';

export default function stashes(state = [], action) {
  switch (action.type) {

  	case RECEIVE_STASHES:
    	return action.stashes;
  	default:
   		return state;
  }
}
