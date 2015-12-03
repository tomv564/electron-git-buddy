import Git from 'nodegit';

const DEFAULT_REMOTE = 'origin';
let repository = undefined;

export function getRepository(repoPath) {
  if (!repository) {
    repository = Git.Repository.open(repoPath);
  }

  return Promise.resolve(repository);
}

export function getStatus() {
  return getRepository()
      .then(repo => {
        return repo.getStatus();
      });
}

export function stagePath(pathSpec) {
  return getRepository()
    .then(repo => repo.openIndex())
    .then(index => {
      return index.addAll(pathSpec)
        .then(result => {
          console.log('index.addbypath', pathSpec, 'resulted in', result);
          index.write();
        });
    });
}

export function resetPath(pathSpec) {
  return getRepository()
    .then(repo => {
      return repo.getHeadCommit().then(head => {
        return Git.Reset.default(repo, head, pathSpec)
          .then(result => {
            console.log('reset.default HEAD', pathSpec, 'resulted in', result);
          }).catch(error => {
            console.log(error);
          });
      });
    });
}

export function getStashes() {
  return getRepository()
    .then(repo => {
      var stashes = [];
      var collect = function(index, message, oid) {
        stashes.push({index: index, message: message, oid: oid});
      };
      return Git.Stash.foreach(repo, collect)
        .then(result => stashes);
    });
}

export function stash() {
  return getRepository()
    .then(repo => {
      const signature = Git.Signature.default(repo);
      return Git.Stash.save(repo, signature, '', 0)
        .then(oid => {
          console.log('Stash.save resulted in', oid.tostrS());
          return {
            message: '',
            oid: oid
          };
        });
    });
}

export function popStash() {
  return getRepository()
    .then( repo => {
      return Git.Stash.pop(repo, 0);
    });
}


export function commit(text) {
  return getRepository()
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
        }).catch(error => {
          console.log(error);
        });
      }));
}

export function getLog() {
  const promise = new Promise(
    (resolve, reject) => {
      getRepository()
        .then(repo => repo.getHeadCommit())
        .then(
          head => {
            if (!head) {
              resolve([]);
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
            history.on('end', () => resolve(commits));
            history.start();
          }
        );
    }
  );
  return promise;
}

export function fetch() {
  return getRepository().then(repo => {
    return repo.fetch(DEFAULT_REMOTE, {
      callbacks: {
        credentials: function(url, userName) {
          return Git.Cred.sshKeyFromAgent(userName);
        },
        certificateCheck: function() {
          return 1;
        }
      }
    }).then(res => {
      console.log('fetch resulted in ', res);
    })
    .catch(err => console.log(err));
  });
}

export function push() {
  return getRepository().then(repo => {
    return Git.Remote.lookup(repo, DEFAULT_REMOTE)
      .then(function(remote) {
        var branch = 'master';
        var ref = 'refs/heads/' + branch;
        var refs = [ref + ':' + ref];
        var options = {
          callbacks: {
            credentials: function(url, userName) {
              return Git.Cred.sshKeyFromAgent(userName);
            },
            certificateCheck: function() {
              return 1;
            }
          }
        };
        return remote.push(refs, options);
      }).then(result => {
        console.log('push:', result);
        return;
      })
      .catch(err => console.log(err));
  });
}

