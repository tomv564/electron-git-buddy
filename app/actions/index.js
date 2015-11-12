import Git from 'nodegit';

export const REFRESH_INDEX = 'REFRESH_INDEX'
export const RECEIVE_STATUS = 'RECEIVE_STATUS'
export const RECEIVE_STASHES = 'RECEIVE_STASHES'
export const PATH_STAGED = 'PATH_STAGED'

export function refreshIndex() {
  return {
    type: REFRESH_INDEX
  }
}

export function receiveStatus(statuses) {
	return {
		type: RECEIVE_STATUS,
		statuses: statuses
	}
}

export function receiveStashes(stashes) {
	return {
		type: RECEIVE_STASHES,
		stashes: stashes
	}
}

export function pathStaged(path) {
	return {
		type: PATH_STAGED,
		path: path
	}
}

export function stagePath(path) {
	return function(dispatch) {
		Git.Index.open('.')
			.then(index => {
				dispatch(pathStaged(path));
			});
	}
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
	}
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

	}

}