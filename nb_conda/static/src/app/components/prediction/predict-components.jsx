import React from 'react';
import PropTypes from 'prop-types';
import { Button, PanelGroup, Panel, FormGroup, ControlLabel,
  FormControl } from 'react-bootstrap';

const predictBtn = (onClick, disableBtn) => (
  <Button
    bsStyle="primary"
    className="w-110"
    disabled={disableBtn}
    onClick={onClick}
  >
    <i className="fa fa-magic space-h-5" />
    <span>Predict</span>
  </Button>
);

const rowHeader = (row, disableBtn, onPredict) => {
  const { name } = row;
  const onClick = e => onPredict(e, name);
  return (
    <div>
      { predictBtn(onClick, disableBtn) }
      <span className="space-h-10">{name}</span>
    </div>
  );
};

const rowContent = (row, disableBtn, onPredict, idx) => {
  if (row.status === 'converting') return null;

  return (
    <Panel
      header={rowHeader(row, disableBtn, onPredict)}
      eventKey={idx}
      key={idx}
    >
      <h5><u>Source</u></h5>
      {row.ckdItems.map(itm => <div className="space-h-10">{itm}</div>)}
      <br />
      <h5><u>Description</u></h5>
      <div className="space-h-10">
        {row.description}
      </div>
    </Panel>
  );
};

const renderRows = (rows, disableBtn, onPredict) => (
  <PanelGroup accordion>
    { rows.map((row, idx) => rowContent(row, disableBtn, onPredict, idx)) }
  </PanelGroup>
);

const RenderList = ({ rows, disableBtn, onPredict }) => {
  const content = rows.length === 0
    ? <Panel>No file founded</Panel>
    : renderRows(rows, disableBtn, onPredict);

  return content;
};

const RenderTitle = ({ onRefresh }) => (
  <div>
    <span>Predict</span>
    <Button
      className="space-h-5 btn-icon-only btn-right btn-panel-middle"
      onClick={onRefresh}
    >
      <i className="fa fa-refresh" />
    </Button>
  </div>
);

const FormPredict = ({ smiles, onSmilesChange }) => (
  <form>
    <FormGroup controlId="model-form-name">
      <ControlLabel>Starting Materials</ControlLabel>
      <FormControl
        type="text"
        onChange={onSmilesChange}
        value={smiles}
      />
    </FormGroup>
  </form>
);

FormPredict.propTypes = {
  smiles: PropTypes.string.isRequired,
  onSmilesChange: PropTypes.func.isRequired,
};

RenderList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  disableBtn: PropTypes.bool.isRequired,
  onPredict: PropTypes.func.isRequired,
};

RenderTitle.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export { RenderList, RenderTitle, FormPredict };
