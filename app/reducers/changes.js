import { RECEIVE_STATUS } from '../actions/index';


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
  };
}

export default function changes(state = [], action) {
  switch (action.type) {

  case RECEIVE_STATUS:
    return action.statuses.map(readStatus);
    // const statuses = action.statuses.map(readStatus);
    // return {
    //   staged: statuses.filter(status => status.inIndex),
    //   unstaged: statuses.filter(status => !status.inIndex)
    // };

  default:
    return state;

  }
}
