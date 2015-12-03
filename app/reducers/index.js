import { combineReducers } from 'redux';
import stashes from './stashes';
import commits from './commits';
import workingTree from './workingTree';

const rootReducer = combineReducers({
  stashes,
  commits,
  workingTree
});

export default rootReducer;
