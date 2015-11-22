import React, { Component, PropTypes } from 'react';
import {Input, Button} from 'react-bootstrap';

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
          <Input type="textarea" ref="message" placeholder="Enter a commit message..."/>
          <Button onClick={() => this.commit()}>Commit</Button>
        </div>
      );
  }
}
