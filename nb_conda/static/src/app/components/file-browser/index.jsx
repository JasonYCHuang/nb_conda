import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'react-bootstrap';
import FileDropzone from '../file-dropzone';
import { fetchRawDataFiles, deleteRawDataFiles } from '../../actions/raw-data';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const RenderTable = ({ roles, onToggleCheck }) => (
  <Table striped bordered hover>
    <tbody>
      {
        roles.map((r, idx) => (
          <tr key={`${r.name}-${idx}`} >
            <td className="pull-center">
              <input type="checkbox" onChange={onToggleCheck} value={r.name} />
            </td>
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

const RenderAction = ({ deletable, onRefresh, onDelete }) => {
  return (
    <div className="pull-right space-v-b-10">
      <Button className="space-h-5 btn-icon-only" bsStyle="primary">
        <FileDropzone />
      </Button>
      <Button className="space-h-5 btn-icon-only" onClick={onRefresh}>
        <i className="fa fa-refresh" />
      </Button>
      <Button
        className="space-h-5 btn-icon-only"
        bsStyle="danger"
        onClick={onDelete}
        disabled={!deletable}
      >
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
    this.state = {
      ckdItems: [],
    }

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
        ckdItems: [...cis.slice(0, idx), ...cis.slice(idx + 1)]
      });
    }
  }

  render() {
    const { rawData } = this.props;
    const deletable = this.state.ckdItems.length > 0;

    if (rawData.files.length === 0) return <RenderNoFiles />;

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

RenderTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCheck: PropTypes.func.isRequired,
};

RenderAction.propTypes = {
  deletable: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

FileBrowser.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
  deleteRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
