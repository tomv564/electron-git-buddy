import { RECEIVE_STATUS, DECREMENT_COUNTER } from '../actions/index';

var initialState = {staged:[], unstaged: []};

function readStatus(status) {
	return {
		path: status.path(),
		inWorkingTree: status.inWorkingTree() !== 0,
		inIndex: status.inIndex() !== 0,
		isNew: status.isNew() !== 0,
		isDeleted: status.isDeleted() !== 0,
		isModified: status.isModified() !== 0,
		isRenamed: status.isRenamed() !== 0,
		isIgnored: status.isIgnored() !== 0,
		isTypechange: status.isTypechange() !== 0
	}
}

export default function changes(state = initialState, action) {
  switch (action.type) {
  
  case RECEIVE_STATUS:
  	// console.log(action.statuses);
  	let statuses = action.statuses.map(readStatus);

  	return {
  		staged: statuses.filter(status => status.inIndex),
  		unstaged: statuses.filter(status => !status.inIndex)
  	}
  //   return state + 1;
  // case DECREMENT_COUNTER:
  //   return state - 1;
  default:
    return state;
  }
}
