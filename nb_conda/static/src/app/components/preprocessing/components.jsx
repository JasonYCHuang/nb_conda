import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import ConvertBtn from './convert-btn';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o" />
);

const processingBtn = () => (
  <Button className="w-110" disabled>
    <i className="fa fa-cogs space-h-5" />
    <span>Processing</span>
  </Button>
);

const availableBtn = () => (
  <Button bsStyle="success" className="w-110" disabled>
    <i className="fa fa-check-circle-o space-h-5" />
    <span>Available</span>
  </Button>
);

const statusBtn = (file) => {
  switch (file.status) {
    case 'available':
      return availableBtn();
    case 'processing':
      return processingBtn();
    default:
      return <ConvertBtn name={file.name} />;
  }
};

const renderRows = rows => (
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
    <span>Raw Files</span>
    <Button
      className="space-h-5 btn-icon-only btn-right btn-panel-middle"
      onClick={onRefresh}
    >
      <i className="fa fa-refresh" />
    </Button>
  </div>
);

RenderTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RenderTitle.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export { RenderTable, RenderTitle };
