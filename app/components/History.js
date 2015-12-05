import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';


function compareDateAsc(a, b) {
  if (a.date > b.date) {
    return 1;
  } else if (a.date < b.date) {
    return -1;
  }

  return 0;
}

function compareDateDesc(a, b) {
  return compareDateAsc(a, b) * -1;
}

export default class History extends Component {
  static propTypes = {
    commits: PropTypes.object.isRequired,
    getLog: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLog();
  }

  formatDate(date) {
    return dateFormat(date, 'yyyy-mm-dd HH:MM');
  }

  renderCommit(commit, index) {
    return (
        <tr key={'commit-' + index}>
          <td>{commit.local ? 'L' : ''}</td>
          <td>{commit.remote ? 'R' : ''}</td>
          <td>{this.formatDate(commit.date)}</td>
          <td>{commit.authorName}</td>
          <td>{commit.message}</td>
        </tr>
      );
  }

  render() {
    const values = Object.keys(this.props.commits.items).map(key => this.props.commits.items[key]);
    console.log('rendering History', values.length);
    const latest = values.sort(compareDateDesc).slice(0, 5);
    // debugger;
    return (
      <table className="table">
        <tbody>{latest.map(this.renderCommit.bind(this))}</tbody>
      </table>
    );
  }
}
