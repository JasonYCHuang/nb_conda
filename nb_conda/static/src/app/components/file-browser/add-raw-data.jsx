import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RenderTable, RenderAction } from './components';
import { fetchRawDataFiles, deleteRawDataFiles } from '../../actions/raw-data';

class AddRawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckdItems: [],
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onToggleCheck = this.onToggleCheck.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  onRefresh() {
    this.props.fetchRawDataFiles();
  }

  onDelete() {
    const { ckdItems } = this.state;
    const msg = `Are you sure to delete ${ckdItems.length} files`;
    if (confirm(msg)) {
      this.props.deleteRawDataFiles(ckdItems);
      this.setState({ ckdItems: [] });
    }
  }

  onToggleCheck(e) {
    const item = e.target.value;
    const cis = this.state.ckdItems;
    const idx = cis.indexOf(item);
    if (idx === -1) {
      this.setState({ ckdItems: [...cis, item] });
    } else {
      this.setState({
        ckdItems: [...cis.slice(0, idx), ...cis.slice(idx + 1)],
      });
    }
  }

  render() {
    const { rawData } = this.props;
    const deletable = this.state.ckdItems.length > 0;

    return (
      <div>
        <RenderAction
          deletable={deletable}
          onRefresh={this.onRefresh}
          onDelete={this.onDelete}
        />
        <RenderTable
          roles={rawData.files}
          onToggleCheck={this.onToggleCheck}
        />
      </div>
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

AddRawData.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
  deleteRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRawData);
