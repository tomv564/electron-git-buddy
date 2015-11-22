import React, { Component, PropTypes } from 'react';

export default class Stash extends Component {

  componentDidMount() {
//    this.props.getStash();
  }

  renderStashes(stashes) {
    return (
      <div >
        <h3>Stash</h3>
        <p>Number of stashes: {stashes.length}</p>
      </div>
    );
  }

  renderEmpty() {
    return <span></span>;
  }

  render() {
    return this.props.stashes.length > 0 ?
            this.renderStashes(this.props.stashes) :
            this.renderEmpty();
  }
}

Stash.propTypes = {
  stashes: PropTypes.array.isRequired
};

