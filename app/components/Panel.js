import React, { Component, PropTypes} from 'react';
import styles from './Panel.module.css';

export default class Panel extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div className={styles.panel} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

