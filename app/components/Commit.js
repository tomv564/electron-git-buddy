import React, { Component, PropTypes } from 'react';

export default class Commit extends Component {
  static propTypes = {
    commits: PropTypes.func.isRequired
  }

  commit() {
    debugger;
    commit(this.refs.message.value);
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
