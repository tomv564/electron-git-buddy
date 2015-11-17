import React, { Component, PropTypes } from 'react';
var path = require('path');

function buildPathTree(items) {

  /*
  tree = {
    app {
      file.js,
      components {
        Index.js
      }
    },
    package.json
  }
  */

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
        dirNode = {name: dir, path: node.path + dir, children: []};
        node.children.push(dirNode);
      }

      const restOfPath = parts.length === 0 ? fileName : parts.join(path.sep) + path.sep + fileName;
      addItem(dirNode, item, restOfPath);
      // console.log(node);
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
    stagePath: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getStatus();
  }

  renderPathCheckbox(itemPath, isStaged) {
    return <input type="checkbox" value={itemPath} checked={isStaged} onClick={() => this.props.stagePath(itemPath)}/>;
  }

  renderItem(item) {

    const childItems = item.children ? item.children.map((child, index) => this.renderItem(child, index)) : '';

    return (
      <div>
        {this.renderPathCheckbox(item.path, item.inIndex)}
        <span>{item.name}</span>

        <ul>
          {childItems}
        </ul>
      </div>
      );
  }

  renderPath(name, status, index) {
    return (
          <li key={'item' + index}>
            {this.renderPathCheckbox(status.path, status.inIndex)}
            {name}
          </li>
      );
  }

  render() {
    const tree = buildPathTree(this.props.index);

    // var items = Object.keys(tree).map(name => this.renderItem(name, tree[name]));

    return <div>{tree.children.map(this.renderItem.bind(this))}</div>;
  }
}
