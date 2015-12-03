import { RECEIVE_STATUS } from '../actions/index';
import path from 'path';

function emptyTree() {
  return { name: '', path: '.', children: []};
}

function buildPathTree(items) {
  var tree = emptyTree();

  function addItem(node, item, remainingPath) {
    const fileName = path.basename(item.path);
    const dirName = path.dirname(remainingPath || item.path);
    const parts = dirName.split(path.sep);

    // simplest - no dirs remaining.
    if (dirName === '.') {
      // console.log('adding file', fileName);
      item.name = fileName;
      item.isStaged = item.inIndex && !item.inWorkingTree;
      node.children.push(item);
    } else {
      const dir = parts.shift();
      let dirNode = node.children.find(n => n.name === dir);
      if (!dirNode) {
        dirNode = {name: dir, path: node.path + path.sep + dir, children: []};
        node.children.push(dirNode);
      }

      const restOfPath = parts.length === 0 ? fileName : parts.join(path.sep) + path.sep + fileName;
      addItem(dirNode, item, restOfPath);
      // console.log(node);
    }

    // check parent if children all checked.
    if (node.children) {
      node.isStaged = true;
      node.children.forEach((child) => {
        if (!child.isStaged) {
          node.isStaged = false;
        }
      });
    }
  }

  // debugger;
  items.map(item => addItem(tree, item));

  return tree;
}


function readStatus(status) {
  return {
    path: status.path(),
    inWorkingTree: status.inWorkingTree() !== 0,
    inIndex: status.inIndex() !== 0,
    isNew: status.isNew() !== 0,
    isDeleted: status.isDeleted() !== 0,
    isModified: status.isModified() !== 0,
    isRenamed: status.isRenamed() !== 0,
    isIgnored: status.isIgnored() !== 0,
    isTypechange: status.isTypechange() !== 0
  };
}

export default function changes(state = emptyTree(), action) {
  switch (action.type) {

  case RECEIVE_STATUS:
    const statuses = action.statuses.map(readStatus);
    return buildPathTree(statuses);

  default:
    return state;

  }
}
