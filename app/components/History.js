import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';

export default class History extends Component {
  static propTypes = {
    commits: PropTypes.array.isRequired,
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
          <td>{this.formatDate(commit.date)}</td>
          <td>{commit.authorName}</td>
          <td>{commit.message}</td>
        </tr>
      );
  }

  render() {
    return (
      <table>
        <tbody>{this.props.commits.map(this.renderCommit.bind(this))}</tbody>
      </table>
    );
  }
}
