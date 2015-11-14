import React, { Component, PropTypes} from 'react';
import styles from './Panel.module.css';


export default class Panel extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={styles.panel}>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}

