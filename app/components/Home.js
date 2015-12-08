import React, { Component, PropTypes } from 'react';
import styles from './Home.module.css';
import StashPanel from './Stash';
import Index from './Index';
import Panel from './Panel';
import History from './History';
import TitleBar from './TitleBar';
import DiffView from './DiffView';
import {Button, ButtonGroup, Glyphicon, Badge} from 'react-bootstrap';

export default class Home extends Component {
  static propTypes = {
    commits: PropTypes.object.isRequired,
    workingTree: PropTypes.object.isRequired,
    stashes: PropTypes.array.isRequired,
    getLog: PropTypes.func.isRequired,
    stagePath: PropTypes.func.isRequired,
    resetPath: PropTypes.func.isRequired,
    getStashes: PropTypes.func.isRequired,
    getStatus: PropTypes.func.isRequired,
    startMonitor: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    stash: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    diffTool: PropTypes.func.isRequired,
    fileDiff: PropTypes.func.isRequired,
    popStash: PropTypes.func.isRequired,
    diffs: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.startMonitor();
  }

  renderHistoryPanel() {
    return (
      <Panel key="history" styles={styles.historyPanel}>
        <TitleBar styles={{borderTop: 0}}>
          <div className={styles.panelTitleWrapper}>
            <h2>Commits</h2>
            <div className={styles.panelTitleContent}>
              <span>Branch: master</span>
              <span>Local: <Badge>{this.props.commits.count.localOnly}</Badge></span>
              <span>Remote: <Badge>{this.props.commits.count.remoteOnly}</Badge></span>
            </div>
          </div>
          <ButtonGroup bsSize="small">
            <Button onClick={() => this.props.getLog()}><Glyphicon glyph="refresh"/> Refresh</Button>
            <Button onClick={() => this.props.fetch()}><Glyphicon glyph="cloud-download"/> Fetch</Button>
            <Button onClick={() => console.log('rebase')}><Glyphicon glyph="transfer"/> Rebase</Button>
            <Button onClick={() => this.props.push()}><Glyphicon glyph="cloud-upload"/> Push</Button>
          </ButtonGroup>
        </TitleBar>
        <div className={styles.content}>
          <History commits={this.props.commits} getLog={this.props.getLog}/>
        </div>
      </Panel>
    );
  }

  renderIndexPanel() {
    console.log(this.props.diffs); // 219 + 59 = 278, + 62 =
    return (
       <Panel key="index" style={{flex: 1, flexDirection: 'column'}}>
        <TitleBar>
          <h2>Index</h2>
          <ButtonGroup bsSize="small">
            <Button onClick={() => this.props.getStatus()}><Glyphicon glyph="refresh"/> Refresh</Button>
            <Button onClick={() => this.props.stagePath('.')}><Glyphicon glyph="check"/> Stage All</Button>
            <Button onClick={() => this.props.stash()}><Glyphicon glyph="save"/> Stash</Button>
          </ButtonGroup>
        </TitleBar>
        <div className={styles.fullContent} style={{display: 'flex', flexDirection: 'row', height: '100vh', marginTop: -278, paddingTop: 278, paddingBottom: 62}}>
          <Index className={styles.content} workingTree={this.props.workingTree} diff={this.props.fileDiff} getStatus={this.props.getStatus} stagePath={this.props.stagePath} resetPath={this.props.resetPath} commit={this.props.commit}/>
          <DiffView diffs={this.props.diffs}/>
        </div>
      </Panel>
    );
  }

  renderStashPanel() {
    return (
      <Panel key="stash" className={styles.stashPanel}>
        <StashPanel stashes={this.props.stashes}
                  getStashes={this.props.getStashes}
                  popStash={this.props.popStash}/>
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
