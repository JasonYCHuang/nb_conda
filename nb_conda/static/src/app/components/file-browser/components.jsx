import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import FileDropzone from '../file-dropzone';

const iconTyp = isDir => (
  isDir
    ? <i className="fa fa-folder-o" />
    : <i className="fa fa-file-text-o " />
);

const renderRows = (roles, onToggleCheck) => (
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
);

const RenderTable = ({ roles, onToggleCheck }) => {
  const content = roles.length === 0
    ? <tr><td>No file founded</td></tr>
    : renderRows(roles, onToggleCheck);

  return (
    <Table striped bordered hover>
      <tbody>{ content }</tbody>
    </Table>
  );
};

const RenderAction = ({ deletable, onRefresh, onDelete }) => (
  <div className="pull-right space-v-b-10">
    <FileDropzone />
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

RenderTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleCheck: PropTypes.func.isRequired,
};

RenderAction.propTypes = {
  deletable: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { RenderTable, RenderAction };
