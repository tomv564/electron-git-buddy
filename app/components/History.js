import React, { Component, PropTypes } from 'react';

export default class History extends Component {
  static propTypes = {
    commits: PropTypes.array.isRequired,
    getLog: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLog();
  }

  // onStagePathClicked(e) {
  //   console.log(e.target.value);
  //   this.props.stagePath(e.target.value);
  // }

  renderCommit(commit, index) {
    return (
        <tr key={'commit-' + index}>
          <td>{commit.date.toISOString()}</td>
          <td>{commit.authorName}</td>
          <td>{commit.message}</td>
        </tr>
      );
  }

  render() {
    return (
      <div>
        <table>
          <tbody>{this.props.commits.map(this.renderCommit.bind(this))}</tbody>
        </table>
      </div>
    );
  }
}
