import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, Table, Button } from 'react-bootstrap';
import { fetchRawDataFiles } from '../../actions/raw-data';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const convertBtn = () => (
  <Button bsStyle="primary">
    <i className="fa fa-database space-h-5" />
    <span>Convert</span>
  </Button>
);

const processingBtn = () => (
  <Button disabled>
    <i className="fa fa-cogs space-h-5" />
    <span>Processing</span>
  </Button>
);

const readyBtn = () => (
  <Button bsStyle="success" disabled>
    <i className="fa fa-check-circle-o space-h-5" />
    <span>Available</span>
  </Button>
);

const statusBtn = (status) => {
  switch (status) {
    case 0:
      return convertBtn();
    case 1:
      return processingBtn();
    default:
      return readyBtn();
  }
};

const renderRows = (roles) => (
  roles.map((r, idx) => (
    <tr key={`${r.name}-${idx}`} >
      <td>
        { statusBtn(idx) }
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

const RenderTable = ({ roles }) => {
  const content = roles.length === 0
    ? <tr><td>No file founded</td></tr>
    : renderRows(roles);

  return (
    <Table striped bordered hover>
      <tbody>{ content }</tbody>
    </Table>
  );
};

class CandidateSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }, dispatch)
);

CandidateSet.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
};

RenderTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSet);
