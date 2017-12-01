import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { RenderTable } from '../file-browser/components';
import { fetchRawDataFiles, deleteRawDataFiles } from '../../actions/raw-data';

class CandidateSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckdItems: [],
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  onRefresh() {
    this.props.fetchRawDataFiles();
  }

  render() {
    const { rawData } = this.props;
    const title = 'Raw Data';

    return (
      <Panel header={title}>
        <RenderTable
          roles={rawData.files}
          onToggleCheck={this.onToggleCheck}
        />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { rawData: state.rawData }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchRawDataFiles,
    deleteRawDataFiles,
  }, dispatch)
);

CandidateSet.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
  deleteRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSet);
