import React, { Component, PropTypes} from 'react';
import styles from './Panel.module.css';


export default class TitleBar extends Component {
  static propTypes = {
    children: PropTypes.any
  };


  render() {
    return (
      <div className={styles.titleBar} style={this.props.styles}>
        {this.props.children}
      </div>
    );
  }
}

