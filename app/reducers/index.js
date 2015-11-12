import { combineReducers } from 'redux';
import counter from './counter';
import stash from './stash';
import changes from './changes';

const rootReducer = combineReducers({
  counter,
  stash,
  changes
});

export default rootReducer;
