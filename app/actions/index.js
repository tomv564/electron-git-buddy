/* eslint space-before-function-paren: [2, "never"] */
import Git from 'nodegit';

export const REFRESH_INDEX = 'REFRESH_INDEX';
export const RECEIVE_STATUS = 'RECEIVE_STATUS';
export const RECEIVE_STASHES = 'RECEIVE_STASHES';
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS';
export const PATH_STAGED = 'PATH_STAGED';

var repo = undefined;

function getRepository() {
	if (!repo) {
		repo = Git.Repository.open('.');
	}

	return Promise.resolve(repo);
}

export function refreshIndex() {
  return {
    type: REFRESH_INDEX
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

export function getLog() {
	return dispatch => {
		getRepository().then(
			repo => repo.getHeadCommit()
			).then(
			commit => {
				var history = commit.history();
				var commits = [];
				var parseCommit = function(commit) {
					if (commits.length > 9)
						return;
					var author = commit.author();
					commits.push({
						authorName: author.name(),
						authorMail: author.email(),
						date: commit.date(),
						message: commit.message(),
						sha: commit.sha()
					});
				}
				history.on('commit', commit => parseCommit(commit));
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

export function stagePath(path) {
	return function(dispatch) {
		Git.Repository.open(".")
			.then(repo => repo.openIndex())
			.then(index => {
					let result = index.addByPath(path);
					dispatch(pathStaged(path));
				});
	};
}

export function unStagePath(path) {

}

export function getStash() {

	return function(dispatch) {
		
		Git.Repository.open(".")
			.then(repo => {
				var stashes = [];
				Git.Stash.foreach(repo, stash => stashes.push(stash))
					.then(result => dispatch(receiveStashes(stashes)));
			});
	};
}

export function getStatus() {

	return function(dispatch) {

		// notify start loading here
		// dispatch(refreshingIndex());

		// actual loading
		// TODO: error handling.
		Git.Repository.open(".")
			.then(function(repo) {
				repo.getStatus()
					.then(status => dispatch(receiveStatus(status)));
			});
		//return setTimeout(() => dispatch(receiveStatus(['asdf'])));

	};

}