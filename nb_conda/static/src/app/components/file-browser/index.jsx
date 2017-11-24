import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'react-bootstrap';
import FileDropzone from '../file-dropzone';
import { fetchRawDataFiles } from '../../actions/raw-data';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const RenderTable = ({ roles }) => (
  <Table striped bordered hover>
    <tbody>
      {
        roles.map((r, idx) => (
          <tr key={`${r.name}-${idx}`} >
            <td className="pull-center"></td>
            <td>
              <span className="space-h-5">{iconTyp(r.isDir)}</span>
              <span className="space-h-5">{r.name}</span>
              <span className="space-h-5 text-small">{r.size}</span>
              <span className="pull-right">{r.modifiedAt}</span>
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

const RenderAction = ({ onRefresh, onDelete }) => {
  return (
    <div className="pull-right space-v-b-10">
      <Button className="space-h-5" bsStyle="primary">
        <FileDropzone />
      </Button>
      <Button className="space-h-5" onClick={onRefresh}>
        <i className="fa fa-refresh" />
      </Button>
      <Button className="space-h-5" bsStyle="danger" onClick={onDelete}>
        <i className="fa fa-trash" />
      </Button>
    </div>
  );
};

const RenderNoFiles = () => (
  <Table striped bordered hover>
    <tbody>
      <tr><td>No file founded</td></tr>
    </tbody>
  </Table>
);

class FileBrowser extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  onRefresh() {
    this.props.fetchRawDataFiles();
  }

  onDelete() {
    console.log('Delete!!')
  }

  render() {
    const { rawData } = this.props;

    if (rawData.files.length === 0) return <RenderNoFiles />;

    return (
      <div>
        <RenderAction
          onRefresh={this.onRefresh}
          onDelete={this.onDelete}
        />
        <RenderTable roles={rawData.files} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  { rawData: state.rawData }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchRawDataFiles }, dispatch)
);

RenderTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RenderAction.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

FileBrowser.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
