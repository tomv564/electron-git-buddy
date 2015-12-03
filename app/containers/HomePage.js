import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as IndexActions from '../actions/index';

function mapStateToProps(state) {
  return {
    stashes: state.stashes,
    commits: state.commits,
    workingTree: state.workingTree
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
