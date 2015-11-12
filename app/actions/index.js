import Git from 'nodegit';

export const REFRESH_INDEX = 'REFRESH_INDEX'
export const RECEIVE_STATUS = 'RECEIVE_STATUS'

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