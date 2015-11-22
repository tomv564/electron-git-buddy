import { combineReducers } from 'redux';
import stashes from './stashes';
import changes from './changes';
import commits from './commits';

const rootReducer = combineReducers({
  stashes,
  changes,
  commits
});

export default rootReducer;
