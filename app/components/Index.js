import React, { Component, PropTypes } from 'react';
var path = require('path');

function buildPathTree(items) {
  var tree = { name: '', path: '.', children: []};

  function addItem(node, item, remainingPath) {
    const fileName = path.basename(item.path);
    const dirName = path.dirname(remainingPath || item.path);
    const parts = dirName.split(path.sep);

    // simplest - no dirs remaining.
    if (dirName === '.') {
      // console.log('adding file', fileName);
      item.name = fileName;
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
      node.inIndex = true;
      node.children.forEach((child) => {
        if (!child.inIndex) {
          node.inIndex = false;
        }
      });
    }
  }

  // debugger;
  items.map(item => addItem(tree, item));

  return tree;
}

export default class Index extends Component {
  static propTypes = {
    index: PropTypes.array.isRequired,
    getStatus: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired,
    resetPath: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getStatus();
  }

  toggleStaged(itemPath, isStaged) {
    if (isStaged) {
      this.props.resetPath(itemPath);
    } else {
      this.props.stagePath(itemPath);
    }
  }

  renderPathCheckbox(itemPath, isStaged) {
    return <input type="checkbox" value={itemPath} checked={isStaged} onClick={() => this.toggleStaged(itemPath, isStaged)}/>;
  }

  renderItem(item) {
    const childItems = item.children ? item.children.map((child, index) => this.renderItem(child, index)) : '';
    return (
      <div key={item.path}>
        {this.renderPathCheckbox(item.path, item.inIndex)}
        <span title={item.path}>{item.name}</span>

        <ul>
          {childItems}
        </ul>
      </div>
      );
  }

  render() {
    const tree = buildPathTree(this.props.index);

    return <div>{tree.children.map(this.renderItem.bind(this))}</div>;
  }
}
