import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import Stash from './Stash';
import Index from './Index';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <Index index={this.props.index} getStatus={this.props.getStatus} stagePath={this.props.stagePath}/>
          <Stash stash={this.props.stash} getStash={this.props.getStash}/>
        </div>
      </div>
    );
  }
}
