import React, { Component, PropTypes } from 'react';
import styles from './Home.module.css';
import StashPanel from './Stash';
import Index from './Index';
import Panel from './Panel';
import TitleBar from './TitleBar';
import History from './History';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

export default class Home extends Component {
  static propTypes = {
    commits: PropTypes.array.isRequired,
    index: PropTypes.array.isRequired,
    stashes: PropTypes.array.isRequired,
    getLog: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired,
    resetPath: PropTypes.func.isRequired,
    getStashes: PropTypes.func.isRequired,
    getStatus: PropTypes.func.isRequired,
    startMonitor: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    stash: PropTypes.func.isRequired
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
            <Button onClick={() => this.props.getLog()}>Fetch</Button>
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
       <Panel key="index" style={{flex: 1}}>
        <TitleBar>
          <h2>Index</h2>
          <ButtonGroup bsSize="small">
            <Button onClick={() => this.props.getStatus()}><Glyphicon glyph="refresh"/> Refresh</Button>
            <Button onClick={() => this.props.stagePath('.')}><Glyphicon glyph="check"/> Stage All</Button>
            <Button onClick={() => this.props.stash()}><Glyphicon glyph="save"/> Stash</Button>
          </ButtonGroup>
        </TitleBar>
        <div className={styles.content}>
          <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath} resetPath={this.props.resetPath} commit={this.props.commit}/>
        </div>
      </Panel>
    );
  }

  renderStashPanel() {
    return (
      <Panel key="stash" className={styles.stashPanel}>
        <StashPanel stashes={this.props.stashes} getStashes={this.props.getStashes}/>
      </Panel>
    );
  }

  render() {
    const panels = [this.renderIndexPanel(), this.renderStashPanel()];

    return (
      <div className={styles.container}>
        {panels}
      </div>
    );
  }
}
