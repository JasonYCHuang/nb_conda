import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, Table, Button } from 'react-bootstrap';
import { fetchRawFiles } from '../../actions/raw-file';
import ConvertBtn from './convert-btn';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const processingBtn = () => (
  <Button className="w-110" disabled>
    <i className="fa fa-cogs space-h-5" />
    <span>Processing</span>
  </Button>
);

const readyBtn = () => (
  <Button bsStyle="success" className="w-110" disabled>
    <i className="fa fa-check-circle-o space-h-5" />
    <span>Available</span>
  </Button>
);

const statusBtn = (file) => {
  const status = 0;
  switch (status) {
    case 0:
      return <ConvertBtn file={file} />;
    case 1:
      return processingBtn();
    default:
      return readyBtn();
  }
};

const renderRows = (rows) => (
  rows.map((r, idx) => (
    <tr key={`${r.name}-${idx}`} >
      <td className="w-120">
        { statusBtn(r) }
      </td>
      <td>
        <span className="space-h-5">{iconTyp(r.isDir)}</span>
        <span className="space-h-5">{r.name}</span>
        <span className="space-h-5 text-small">{r.size}</span>
        <span className="pull-right">{r.modifiedAt}</span>
      </td>
    </tr>
  ))
);

const RenderTable = ({ rows }) => {
  const content = rows.length === 0
    ? <tr><td>No file founded</td></tr>
    : renderRows(rows);

  return (
    <Table striped hover className="brd-all">
      <tbody>{ content }</tbody>
    </Table>
  );
};

const RenderTitle = ({ onRefresh }) => (
  <div>
    <span>Raw File</span>
    <Button
      className="space-h-5 btn-icon-only btn-right btn-panel-middle"
      onClick={onRefresh}
    >
      <i className="fa fa-refresh" />
    </Button>
  </div>
);

class CandidateSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchRawFiles();
  }

  onRefresh() {
    this.props.fetchRawFiles();
  }

  render() {
    const { rawFile } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="candidate">
        <RenderTable
          rows={rawFile.files}
        />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { rawFile: state.rawFile }
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
  fetchRawFiles: PropTypes.func.isRequired,
};

RenderTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RenderTitle.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSet);
