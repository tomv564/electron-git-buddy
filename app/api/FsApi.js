import fs from 'fs';

let watcher;

export function startWatcher(path, callback) {
  console.log('monitoring', path)
  watcher = fs.watch(path, {recursive: true, persistent: true}, callback);
}
