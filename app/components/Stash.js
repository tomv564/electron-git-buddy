import React, { Component, PropTypes } from 'react';

export default class Stash extends Component {
  static propTypes = {
    stash: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getStash();
  }

  renderStashes(stashes) {
    return (
      <div >
        <h3>Stash</h3>
        <p>Number of stashes: {this.props.stash.length}</p>
      </div>
    );
  }

  renderEmpty() {
    return <p>No stashes</p>;
  }

  render() {
    return this.props.stash.length > 0 ? 
            this.renderStashes(this.props.stash) : 
            this.renderEmpty();
  }
}
