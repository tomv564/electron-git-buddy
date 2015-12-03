import fs from 'fs';

export function startWatcher(path, callback) {
  console.log('monitoring', path);
  const watcher = fs.watch(path, {recursive: true, persistent: true}, callback);
}
