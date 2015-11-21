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
    resetPath: PropTypes.func.isRequired,
    getStash: PropTypes.func.isRequired,
    getStatus: PropTypes.func.isRequired,
    startMonitor: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.startMonitor();
  }

  renderHistoryPanel() {
    return (
      <Panel key="history" styles={styles.historyPanel}>
        <TitleBar>
          <h2>History</h2>
          <div className="controls">
            <button type="button" onClick={() => this.props.getLog()}>Fetch</button>
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
       <Panel key="index" styles={styles.indexPanel}>
        <TitleBar>
          <h2>Index</h2>
          <button onClick={() => this.props.getStatus()}>Refresh</button>
          <button>Stage/Unstage</button>
          <button>Stash</button>
        </TitleBar>
        <div className={styles.content}>
          <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath} resetPath={this.props.resetPath}/>
        </div>
      </Panel>
    );
  }

  renderStashPanel() {
    return (
      <Panel key="stash" styles={styles.stashPanel}>
        <TitleBar>
          <h2>Stash</h2>
          <button onClick={() => this.props.getStatus()}>Refresh</button>
        </TitleBar>
        <Stash stash={this.props.stash} getStash={this.props.getStash}/>
      </Panel>
    );
  }

  render() {
    const panels = [this.renderHistoryPanel(), this.renderIndexPanel(), this.renderStashPanel()];

    return (
      <div className={styles.container}>
        {panels}
      </div>
    );
  }
}
