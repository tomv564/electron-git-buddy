import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import Stash from './Stash';
import Index from './Index';
import Panel from './Panel';
import TitleBar from './TitleBar';
import History from './History';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <Panel>
            <TitleBar>
              <h2>History</h2>
              <button>Fetch</button>
            </TitleBar>
            <History commits={this.props.commits} getLog={this.props.getLog}/>
          </Panel>

          <Panel>
            <TitleBar>
              <h2>Index</h2>
              <button>Refresh</button>
            </TitleBar>
            <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath}/>        
          </Panel>

          <Panel>
            <TitleBar>
              <h2>Stash</h2>
            </TitleBar>
            <Stash stash={this.props.stash} getStash={this.props.getStash}/>
          </Panel>

        </div>
      </div>
    );
  }
}
