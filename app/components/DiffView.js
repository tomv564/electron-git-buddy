import React, { Component, PropTypes } from 'react';

export default class DiffView extends Component {
  static propTypes = {
    diffs: PropTypes.object.isRequired
  }

  getLineClass(line) {
    if (line.oldLineNo === -1) {
      return 'new';
    } else if (line.newLineNo === -1) {
      return 'deleted';
    }
    return 'normal';
  }

  renderLineNumber(line) {
    if (line.newLineNo === -1) {
      return '';
    }

    return line.newLineNo;
  }

  renderLine(line) {
    const lineKey = 'line-' + line.oldLineNo + '-' + line.newLineNo;
    return (<p key={lineKey} className={this.getLineClass(line)}>
              <span className="lineNo">{this.renderLineNumber(line)}</span>
              {line.content}
            </p>);
  }

  renderHeader(hunk, i) {
    return <p key={'hunk-' + i} className="header">{hunk.header}</p>;
  }

  renderHunk(hunk, i) {
    const lines = hunk.lines.map(line => this.renderLine(line));
    return [this.renderHeader(hunk, i)].concat(lines);
  }

  renderDiff(hunks) {
    return [].concat.apply([], hunks.map((hunk, i) => this.renderHunk(hunk, i)));
  }

  render() {
    console.log('rendering DiffView', this.props.diffs);
    const files = Object.keys(this.props.diffs);
    const key = files.length > 0 ? files[0] : 'notice';
    const content = files.length > 0 ?
                      this.renderDiff(this.props.diffs[files[0]]) :
                      [<p key="notice">Select a file to diff</p>];

    return <div key={key} className="diff" style={{fontFamily: 'Source Code Pro, monospace', fontSize: 12, backgroundColor: '#fff', flex: 3}}>{content}</div>;
  }
}
