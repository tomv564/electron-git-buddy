import { combineReducers } from 'redux';
import counter from './counter';
import stash from './stash';
import changes from './changes';
import commits from './commits';

const rootReducer = combineReducers({
  counter,
  stash,
  changes,
  commits
});

export default rootReducer;
