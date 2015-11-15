import React, { Component, PropTypes } from 'react';

export default class Index extends Component {
  static propTypes = {
    index: PropTypes.object.isRequired,
    getStatus: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getStatus();
  }

  onStagePathClicked(e) {
    this.props.stagePath(e.target.value);
  }

  renderFile(status, index) {
    return (
        <li key={'item' + index}>
          <input type="checkbox" value={status.path} onClick={e => this.props.stagePath(e.target.value)}/>
          {status.path}
        </li>
      );
  }

  render() {
    return (
      <div>
        <ul>{this.props.index.staged.map(this.renderFile.bind(this))}</ul>
        <ul>{this.props.index.unstaged.map(this.renderFile.bind(this))}</ul>
      </div>
    );
  }
}
