import React, { Component, PropTypes } from 'react';

export default class Index extends Component {
  static propTypes = {
    index: PropTypes.object.isRequired,
    getStatus: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    console.log("mounted1");
    // debugger;
    this.props.getStatus();
  }

  render() {
    return (
      <div>
        <div >
          <h3>Changes</h3>
          <p>Staged: {this.props.index.staged.length}</p>
          <p>Unstaged: {this.props.index.unstaged.length}</p>
        </div>
      </div>
    );
  }
}
