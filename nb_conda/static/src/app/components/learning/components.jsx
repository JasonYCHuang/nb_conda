import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o" />
);

const renderRows = (rows, onToggleCheck) => (
  rows.map((r, idx) => (
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
);

const RenderTable = ({ rows, onToggleCheck }) => {
  const content = rows.length === 0
    ? <tr><td>No file founded</td></tr>
    : renderRows(rows, onToggleCheck);

  return (
    <Table striped hover className="brd-all">
      <tbody>{ content }</tbody>
    </Table>
  );
};

const RenderTitle = ({ onRefresh }) => (
  <div>
    <span>Learning Set</span>
    <Button
      className="btn-right btn-panel-middle"
      onClick={onRefresh}
    >
      <i className="fa fa-refresh" />
    </Button>
    <Button
      bsStyle="primary"
      className="space-h-2 btn-right btn-panel-middle"
    >
      <i className="fa fa-magic" />
      <span>  Generate model</span>
    </Button>
  </div>
);

RenderTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCheck: PropTypes.func.isRequired,
};

RenderTitle.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export { RenderTable, RenderTitle };
