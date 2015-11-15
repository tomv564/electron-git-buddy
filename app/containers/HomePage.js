import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as IndexActions from '../actions/index';

function mapStateToProps(state) {
  return {
    stash: state.stash,
    index: state.changes,
    commits: state.commits
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
