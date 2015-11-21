import React, { Component, PropTypes } from 'react';

export default class Commit extends Component {
  static propTypes = {
    commit: PropTypes.func.isRequired
  }

  commit() {
    this.props.commit(this.refs.message.value);
  }

  render() {
    return (
        <div>
          <textarea ref="message" className="fullWidth" rows="3"/>
          <button onClick={() => this.commit()}>Commit</button>
        </div>
      );
  }
}
