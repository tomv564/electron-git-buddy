import { RECEIVE_COMMITS, RECEIVE_REMOTE_COMMITS } from '../actions/index';


function updateCommits(original, updates, source) {
  const updated = Object.assign({}, original);
  updates.forEach(commit => {
    commit[source] = true;
    updated.items[commit.sha] = Object.assign(updated.items[commit.sha] || {}, commit);
    if (commit.sha.indexOf('f0e') === 0) console.log(commit.sha);
  });

  return updated;
}

function updateCounts(updated) {
  updated.count.localOnly = 0;
  updated.count.remoteOnly = 0;
  Object.keys(updated.items).forEach(sha => {
    if (sha !== 'count') {
      if (updated.items[sha].remote && !updated.items[sha].local) {
        updated.count.remoteOnly += 1;
      }

      if (!updated.items[sha].remote && updated.items[sha].local) {
        updated.count.localOnly += 1;
      }
    }
  });
  return updated;
}

export default function commits(state = { items: {}, count: { localOnly: 0, remoteOnly: 0}}, action) {
  switch (action.type) {

  case RECEIVE_REMOTE_COMMITS:
    return updateCounts(updateCommits(state, action.commits, 'remote'));

  case RECEIVE_COMMITS:
    return updateCounts(updateCommits(state, action.commits, 'local'));

  default:
    return state;

  }
}
