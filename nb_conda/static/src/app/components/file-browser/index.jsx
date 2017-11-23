import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { fetchRawDataFiles } from '../../actions/raw-data';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const RenderRawDataTable = ({ roles }) => (
  roles.map(r => (
    <tr>
      <td className="pull-center">{iconTyp(r.isDir)}</td>
      <td>
        <span>{r.name}</span>
        <span className="text-small space-h-5">{r.size}</span>
        <span className="pull-right">{r.modifiedAt}</span>
      </td>
    </tr>
  ))
);

class FileBrowser extends Component {
  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  render() {
    const { rawData } = this.props;

    return (
      <Table striped bordered hover>
        <tbody>
          <RenderRawDataTable roles={rawData.files} />
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => (
  { rawData: state.rawData }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchRawDataFiles }, dispatch)
);

FileBrowser.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
