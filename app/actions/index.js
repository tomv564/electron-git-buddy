import {startWatcher} from '../api/FsApi';
import * as GitApi from '../api/GitApi';
require('promise.prototype.finally');

// workingTree: only receive_status used.
export const RECEIVE_STATUS = 'RECEIVE_STATUS';

// stashes- all used but misses external updates!
export const RECEIVE_STASHES = 'RECEIVE_STASHES';
export const STASH_CREATED = 'STASH_CREATED';
export const STASH_POPPED = 'STASH_POPPED';

// commits
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS';
export const RECEIVE_REMOTE_COMMITS = 'RECEIVE_REMOTE_COMMITS';
// commits not used.
export const REMOTE_FETCHED = 'REMOTE_FETCHED';
export const REMOTE_PUSHED = 'REMOTE_PUSHED';

const FSEVENT_DELAY = 500;
const repoPath = '.';

GitApi.getRepository(repoPath);

let refreshTrigger;

let refreshTriggered = false;

function remotePushed() {
  return {
    type: REMOTE_PUSHED
  };
}

let fsEventsEnabled = true;


function globalRefresh() {
  return dispatch => {
    dispatch(getStatus());
    dispatch(getLog());
    dispatch(getStashes());
  };
}

export function startMonitor() {
  return dispatch => {
    startWatcher(repoPath, () => {
      if (refreshTriggered) {
        global.clearTimeout(refreshTrigger);
      }

      if (!fsEventsEnabled) return;

      refreshTriggered = true;
      refreshTrigger = global.setTimeout(() => {
        refreshTriggered = false;
        console.log('Monitor - refresh triggered');
        dispatch(globalRefresh());
      }, FSEVENT_DELAY);
    });
  };
}

function muteFsEvents() {
  fsEventsEnabled = false;
  console.log('FS events muted');
}

function unMuteFsEvents() {
  setTimeout(() => {
    fsEventsEnabled = true;
    console.log('FS events unmuted');
  }, 1000);
}

export function fetch() {
  return dispatch => {
    GitApi.fetch()
      .then(() => GitApi.getRemoteLog())
      .then(commits => dispatch(receiveRemoteCommits(commits)));
  };
}

export function push() {
  return dispatch => {
    GitApi.push()
      .then(() => dispatch(remotePushed()));
  };
}

export function workingDirChanged() {
  return {
    type: WORKINGDIR_CHANGED
  };
}

export function receiveCommits(commits) {
  return {
    type: RECEIVE_COMMITS,
    commits: commits
  };
}

export function receiveRemoteCommits(commits) {
  return {
    type: RECEIVE_REMOTE_COMMITS,
    commits: commits
  };
}


export function stashCreated(newStash) {
  return {
    type: STASH_CREATED,
    stash: newStash
  };
}

export function stashPopped() {
  return {
    type: STASH_POPPED
  };
}

function commitCreated() {
  return dispatch => {
    GitApi.getLog()
      .then(commits => dispatch(receiveCommits(commits)));
    dispatch(getStatus());
  };
}

export function commit(text) {
  return dispatch => {
    muteFsEvents();
    GitApi.createCommit(text)
      .then(() => dispatch(commitCreated()))
      .finally(() => unMuteFsEvents());
  };
}

export function getLog() {
  return dispatch => {
    console.log('getting local commits');
    GitApi.getLog()
      .then(commits => dispatch(receiveCommits(commits)));
    console.log('getting remote commits');
    GitApi.getRemoteLog()
      .then(commits => dispatch(receiveRemoteCommits(commits)));
  };
}

export function receiveStatus(statuses) {
  return {
    type: RECEIVE_STATUS,
    statuses: statuses
  };
}

export function receiveStashes(stashes) {
  return {
    type: RECEIVE_STASHES,
    stashes: stashes
  };
}

export function stagePath(path) {
  return dispatch => {
    muteFsEvents();
    GitApi.stagePath(path)
      .then(() => dispatch(getStatus()))
      .catch(error => console.warn(error))
      .finally(() => unMuteFsEvents());
  };
}

export function resetPath(path) {
  return dispatch => {
    muteFsEvents();
    GitApi.resetPath(path)
      .then(() => dispatch(getStatus()))
      .finally(() => unMuteFsEvents());
  };
}

export function getStashes() {
  return dispatch => {
    console.log('getting stashes');
    GitApi.getStashes()
      .then(stashes => dispatch(receiveStashes(stashes)));
  };
}
export function stash() {
  return dispatch => {
    muteFsEvents();
    GitApi.stash()
      .then(newStash => {
        dispatch(stashCreated(newStash));
        dispatch(getStatus());
      })
      .finally(() => unMuteFsEvents());
  };
}

export function popStash() {
  return dispatch => {
    muteFsEvents();
    GitApi.popStash()
      .then(() => {
        dispatch(stashPopped());
        dispatch(getStatus());
      })
      .finally(() => unMuteFsEvents());
  };
}

export function getStatus() {
  return dispatch => {
    console.log('getting status');
    GitApi.getStatus()
      .then(status => dispatch(receiveStatus(status)));
  };
}
