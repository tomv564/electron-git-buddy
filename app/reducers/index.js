import { combineReducers } from 'redux';
import stashes from './stashes';
import commits from './commits';
import workingTree from './workingTree';
import diffs from './diffs';

const rootReducer = combineReducers({
  stashes,
  commits,
  workingTree,
  diffs
});

export default rootReducer;
