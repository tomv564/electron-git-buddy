import React, { Component, PropTypes } from 'react';

export default class Stash extends Component {
  static propTypes = {
    stash: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div>
        <div >
          <h3>Stash</h3>
          <p>Number of stashes: {this.props.stash.length}</p>
        </div>
      </div>
    );
  }
}
