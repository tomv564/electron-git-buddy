import React, { Component, PropTypes } from 'react';
import TitleBar from './TitleBar';
import {Button, Glyphicon, Badge} from 'react-bootstrap';

class Stash extends Component {

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

export default class StashPanel extends Component {
  static propTypes = {
    getStashes: PropTypes.func.isRequired,
    popStash: PropTypes.func.isRequired,
    stashes: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.getStashes();
  }

  render() {
    console.log('rendering Stashes', this.props.stashes.length);

    const hasStashes = this.props.stashes.length > 0;
    return (
      <div>
        <TitleBar>
          <h2>Stashes <Badge>{this.props.stashes.length}</Badge></h2>
          {hasStashes ? <Button bsSize="small" onClick={() => this.props.popStash()}><Glyphicon glyph="open"/> Pop</Button>
                      : ''}
        </TitleBar>
      </div>
      );
  }
}
