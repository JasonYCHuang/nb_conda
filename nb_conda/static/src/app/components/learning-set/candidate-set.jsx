import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { fetchRawFiles } from '../../actions/raw-file';
import { RenderTable, RenderTitle } from './candidate-components';

class CandidateSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const pMethod = this.props.method;
    const nMethod = nextProps.method;
    if (pMethod !== nMethod) {
      this.props.fetchRawFiles();
    }
  }

  onRefresh() {
    this.props.fetchRawFiles();
  }

  render() {
    const { rawFile } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="candidate">
        <RenderTable rows={rawFile.files} />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { rawFile: state.rawFile, method: state.method }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchRawFiles,
  }, dispatch)
);

CandidateSet.propTypes = {
  rawFile: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchRawFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSet);
