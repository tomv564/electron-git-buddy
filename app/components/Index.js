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
    console.log(e.target.value);
    this.props.stagePath(e.target.value);
  }

  renderFile(status, index) {

    return (
        <li key={'item'+index}>
          <input type="checkbox" value={status.path} onClick={e => this.stagePath(e.target.value)}/>
          {status.path}
        </li>
      )
    
  }

  render() {
    return (
      <div>
        <div >
          <h3>Changes</h3>
          <button onClick={this.props.getStatus}>Refresh</button>
          <h4>Staged</h4>
          <ul>{this.props.index.staged.map(this.renderFile.bind(this))}</ul>
          <h4>Unstaged</h4>
          <ul>{this.props.index.unstaged.map(this.renderFile.bind(this))}</ul>
        </div>
      </div>
    );
  }
}
