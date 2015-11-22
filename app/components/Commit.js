import React, { Component, PropTypes } from 'react';
import {Input, Button} from 'react-bootstrap';

export default class Commit extends Component {
  static propTypes = {
    commit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  onChange(e) {
    this.setState({message: e.target.value});
  }

  commit() {
    this.props.commit(this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (
        <div>
          <hr/>
          <Input type="textarea" value={this.state.message} onChange={this.onChange.bind(this)} ref="message" placeholder="Enter a commit message..."/>
          <Button disabled={this.state.message.length < 1} onClick={() => this.commit()}>Commit</Button>
        </div>
      );
  }
}
