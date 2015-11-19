import { combineReducers } from 'redux';
import stash from './stash';
import changes from './changes';
import commits from './commits';

const rootReducer = combineReducers({
  stash,
  changes,
  commits
});

export default rootReducer;
