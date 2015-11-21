import Git from 'nodegit';
import {startWatcher} from '../api/FsApi';

export const REFRESH_INDEX = 'REFRESH_INDEX';
export const RECEIVE_STATUS = 'RECEIVE_STATUS';
export const RECEIVE_STASHES = 'RECEIVE_STASHES';
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS';
export const WORKINGDIR_CHANGED = 'WORKINGDIR_CHANGED';
export const PATH_STAGED = 'PATH_STAGED';
export const PATH_RESET = 'PATH_RESET';
export const COMMIT_CREATED = 'COMMIT_CREATED';

const repoPath = '.';
let repository = undefined;

function getRepository() {
  if (!repository) {
    repository = Git.Repository.open(repoPath);
  }

  return Promise.resolve(repository);
}

let refreshTriggered = false;

export function startMonitor() {
  return dispatch => {
    startWatcher(repoPath, (event, filePath) => {
      if (refreshTriggered) return;

      refreshTriggered = true;
      setTimeout(() => {
        refreshTriggered = false;
        dispatch(getStatus());
      }, 1000);
    });
  };
}

export function refreshIndex() {
  return {
    type: REFRESH_INDEX
  };
}

export function workingDirChanged() {
  return {
    type: WORKINGDIR_CHANGED
  };
}

export function remoteFetched() {
  return {
    type: REMOTE_FETCHED
  };
}

export function gitFetch() {
  return dispatch => {
    getRepository().then(
      repo => {
        repo.fetch('origin');
        dispatch(remoteFetched());
      });
  };
}

export function receiveCommits(commits) {
  return {
    type: RECEIVE_COMMITS,
    commits: commits
  };
}

export function commitCreated() {
  return {
    type: COMMIT_CREATED
  };
}

export function commit(text) {
  return dispatch => {
    getRepository()
      .then(repo => repo.getHeadCommit()
        .then(head => {
          repo.openIndex()
          .then(index => index.writeTree())
          .then(oid => {
            const signature = Git.Signature.default(repo);
            repo.createCommit('HEAD', signature, signature,
            text, oid, [head]).then(newOid => {
              console.log('create commit resulted in ', newOid.tostrS());
            });
            dispatch(commitCreated());
          }).catch(error => {
            console.log(error);
          });
        }));
  };
}

export function getLog() {
  return dispatch => {
    getRepository().then(
      repo => repo.getHeadCommit()
      ).then(
      head => {
        if (!head) {
          dispatch(receiveCommits([]));
          return;
        }
        var history = head.history();
        var commits = [];
        var parseCommit = commit => {
          if (commits.length > 5) return;
          var author = commit.author();
          commits.push({
            authorName: author.name(),
            authorMail: author.email(),
            date: commit.date(),
            message: commit.message(),
            sha: commit.sha()
          });
        };
        history.on('commit', parseCommit);
        history.on('end', () => dispatch(receiveCommits(commits)));
        history.start();
      });
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

export function pathStaged(path) {
  return {
    type: PATH_STAGED,
    path: path
  };
}

export function pathReset(path) {
  return {
    type: PATH_RESET,
    path: path
  };
}

export function stagePath(path) {

  const pathSpec = path.slice(2);
  return dispatch => {
    getRepository()
      .then(repo => repo.openIndex())
      .then(index => {
        // index.read(1); // TODO: why?
        // let result = index.addByPath(path);
        index.addAll(pathSpec).then(result => {
          console.log('index.addbypath', pathSpec, 'resulted in', result);
          const writeResult = index.write();
          console.log('index.write resulted in', writeResult);
          dispatch(pathStaged(path));
        }).catch(error => {
          console.log(error);
        });
      });
  };
}

export function resetPath(path) {
  const pathSpec = path.slice(2);
  return dispatch => {
    getRepository()
      .then(repo => {
        repo.getHeadCommit().then(head => {
          Git.Reset.default(repo, head, pathSpec)
            .then(result => {
              console.log('reset.default HEAD', pathSpec, 'resulted in', result);
              dispatch(pathReset(path));
            }).catch(error => {
              console.log(error);
            });
        });
      });
  };
}

export function getStash() {
  // return dispatch => {
  //   getRepository()
  //     .then(repo => {
  //       var stashes = [];
  //       Git.Stash.foreach(repo, stash => stashes.push(stash))
  //         .then(result => dispatch(receiveStashes(stashes)));
  //     });
  // };
}

export function getStatus() {
  return dispatch => {
    // notify start loading here
    // dispatch(refreshingIndex());
    // actual loading
    // TODO: error handling.
    getRepository()
      .then(repo => {
        repo.getStatus()
          .then(status => dispatch(receiveStatus(status)));
      });
  };
}
