import React, { Component, PropTypes } from 'react';
import styles from './Home.module.css';
import Stash from './Stash';
import Index from './Index';
import Panel from './Panel';
import TitleBar from './TitleBar';
import History from './History';

export default class Home extends Component {
  static propTypes = {
    commits: PropTypes.array.isRequired,
    index: PropTypes.array.isRequired,
    stash: PropTypes.array.isRequired,
    getLog: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired,
    getStash: PropTypes.func.isRequired,
    getStatus: PropTypes.func.isRequired
  }

  renderHistoryPanel() {
    return (
      <Panel key="history">
        <TitleBar>
          <h2>History</h2>
          <div className="controls">
            <button type="button">Fetch</button>
          </div>
        </TitleBar>
        <div className={styles.content}>
          <History commits={this.props.commits} getLog={this.props.getLog}/>
        </div>
      </Panel>
    );
  }

  renderIndexPanel() {
    return (
       <Panel key="index">
        <TitleBar>
          <h2>Index</h2>
          <button>Refresh</button>
        </TitleBar>
        <div className={styles.content}>
          <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath}/>
        </div>
      </Panel>
    );
  }

  renderStashPanel() {
    return (
      <Panel key="stash">
        <TitleBar>
          <h2>Stash</h2>
        </TitleBar>
        <Stash stash={this.props.stash} getStash={this.props.getStash}/>
      </Panel>
    );
  }

  render() {
    const panels = [this.renderHistoryPanel(), this.renderIndexPanel()];
    if (this.props.stash.length > 0) panels.push(this.renderStashPanel());

    return (
      <div>
        <div className={styles.container}>
          {panels}
        </div>
      </div>
    );
  }
}
