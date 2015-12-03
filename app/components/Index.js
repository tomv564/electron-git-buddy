import React, { Component, PropTypes } from 'react';
import Commit from './Commit';
import {Input} from 'react-bootstrap';

function hasStagedFiles(tree) {
  if (!tree.children) return false;
  return tree.children.some((item) => {
    if (item.isStaged) return true;
    if (hasStagedFiles(item)) return true;
    return false;
  });
}

export default class Index extends Component {
  static propTypes = {
    workingTree: PropTypes.object.isRequired,
    getStatus: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired,
    resetPath: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired
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

  renderChildTree(children) {
    const childItems = children.map((child, index) => this.renderItem(child, index));
    return (
      <ul>{childItems}</ul>
      );
  }

  renderItem(item) {
    const childItems = item.children ? this.renderChildTree(item.children) : '';
    return (
      <div key={item.path}>
        <Input type="checkbox"
               label={item.name}
               checked={item.isStaged}
               onClick={() => this.toggleStaged(item.path, item.isStaged)}
               readOnly />
        {childItems}
      </div>
      );
  }

  render() {
    const tree = this.props.workingTree;
    const canCommit = hasStagedFiles(tree);

    if (tree.children.length < 1) {
      return <p>No changes detected</p>;
    }

    return (<div>
              <div className="checkboxTree">
              {tree.children.map(this.renderItem.bind(this))}
             </div>
             {canCommit ?
             <Commit commit={this.props.commit}/> : ''}
           </div>);
  }
}
