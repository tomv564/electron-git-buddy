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
        <li key={'commit-'+index}>
            {commit.message}    
        </li>
      )
    
  }

  render() {
    return (
      <div>
        <div >
          <ul>{this.props.commits.map(this.renderCommit.bind(this))}</ul>
        </div>
      </div>
    );
  }
}
