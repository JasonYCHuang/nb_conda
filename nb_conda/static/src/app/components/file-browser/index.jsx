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
  <Table striped bordered hover>
    <tbody>
      {
        roles.map((r, idx) => (
          <tr key={`${r.name}-${idx}`} >
            <td className="pull-center">{iconTyp(r.isDir)}</td>
            <td>
              <span>{r.name}</span>
              <span className="text-small space-h-5">{r.size}</span>
              <span className="pull-right">{r.modifiedAt}</span>
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

const RenderNoFiles = () => (
  <Table striped bordered hover>
    <tbody>
      <tr><td>No file founded</td></tr>
    </tbody>
  </Table>
);

class FileBrowser extends Component {
  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  render() {
    const { rawData } = this.props;

    return (
      rawData.files.length > 0
        ? <RenderRawDataTable roles={rawData.files} />
        : <RenderNoFiles />
    );
  }
}

const mapStateToProps = state => (
  { rawData: state.rawData }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchRawDataFiles }, dispatch)
);

RenderRawDataTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FileBrowser.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
