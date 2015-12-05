import { expect } from 'chai';
import commits from '../../app/reducers/commits';
import { RECEIVE_COMMITS, RECEIVE_REMOTE_COMMITS } from '../../app/actions/index';

const FIRST_COMMIT_SHA = '12adsdf';
const SECOND_COMMIT_SHA = '2sdssaasd';

function createCommit(sha) {
  return {
    sha: sha
  };
}

const commit1 = () => createCommit(FIRST_COMMIT_SHA);

describe('reducers', () => {
  describe('commits', () => {
    it('should handle initial state', () => {
      const initial = commits(undefined, {});
      expect(initial.count.localOnly).to.equal(0);
      expect(initial.items).to.be.empty;
    });

    it('should handle RECEIVE_COMMITS', () => {
      const commit = commit1();
      const state = commits(undefined, { type: RECEIVE_COMMITS, commits: [commit] });

      // expect(state).to.equal({});
      expect(state.items[commit.sha].local).to.equal(true);
      expect(state.count.localOnly).to.equal(1);
      expect(state.count.remoteOnly).to.equal(0);

    });

    it('should handle RECEIVE_REMOTE_COMMITS', () => {
      const commit = commit1();
      const result = commits(undefined, { type: RECEIVE_REMOTE_COMMITS, commits: [commit] });

      // expect(result.length).to.equal(1);
      expect(result.items[commit.sha].remote).to.equal(true);
      expect(result.count.localOnly).to.equal(0);
      expect(result.count.remoteOnly).to.equal(1);
    });

    it('should handle RECEIVE_COMMITS updates', () => {
      const commitLocal = commit1();
      const commitRemote = commit1();
      const initial = commits(undefined, { type: RECEIVE_REMOTE_COMMITS, commits: [commitLocal] });
      const updated = commits(initial, { type: RECEIVE_COMMITS, commits: [commitRemote] });

      expect(updated.items[commitLocal.sha].local).to.equal(true);
      expect(updated.items[commitLocal.sha].remote).to.equal(true);
      expect(updated.count.localOnly).to.equal(0);
      expect(updated.count.remoteOnly).to.equal(0);

    });

    it('should handle RECEIVE_COMMITS appends', () => {
      const commitLocal = commit1();
      const commitLocal2 = createCommit(SECOND_COMMIT_SHA);
      const commitRemote = commit1();
      const initial = commits(undefined, { type: RECEIVE_REMOTE_COMMITS, commits: [commitRemote] });
      const updated = commits(initial, { type: RECEIVE_COMMITS, commits: [commitLocal, commitLocal2] });

      expect(Object.keys(updated.items).length).to.equal(2);
      expect(updated.items[commitLocal.sha].local).to.equal(true);
      expect(updated.items[commitLocal.sha].remote).to.equal(true);
      expect(updated.items[commitLocal2.sha].local).to.equal(true);
      expect(updated.items[commitLocal2.sha].remote).to.equal(undefined);
      expect(updated.count.localOnly).to.equal(1);
      expect(updated.count.remoteOnly).to.equal(0);


    })

  });
});
