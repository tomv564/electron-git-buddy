import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import Stash from './Stash';
import Index from './Index';
import Panel from './Panel';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <Panel title="History">
            <p>list of auto-refreshed commits here</p>
          </Panel>

          <Panel title="Index">
            <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath}/>        
          </Panel>

          <Panel title="Stash">
            <Stash stash={this.props.stash} getStash={this.props.getStash}/>
          </Panel>

        </div>
      </div>
    );
  }
}
