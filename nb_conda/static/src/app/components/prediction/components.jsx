import React from 'react';
import PropTypes from 'prop-types';
import { Button, PanelGroup, Panel } from 'react-bootstrap';

const rowHeader = (row) => {
  const { name } = row;
  return (
    <div>
      <span>{name}</span>
    </div>
  );
};

const renderRows = rows => (
  <PanelGroup accordion>
    {
      rows.map((row, idx) => (
        <Panel header={rowHeader(row)} eventKey={idx}>
          <h5><u>Source</u></h5>
          {row.ckdItems.map(itm => <div className="space-h-10">{itm}</div>)}
          <br />
          <h5><u>Description</u></h5>
          <div className="space-h-10">
            {row.description}
          </div>
        </Panel>
      ))
    }
  </PanelGroup>
);

const RenderList = ({ rows }) => {
  const content = rows.length === 0
    ? <Panel>No file founded</Panel>
    : renderRows(rows);

  return content;
};

const RenderTitle = ({ onRefresh }) => (
  <div>
    <span>Model List</span>
    <Button
      className="space-h-5 btn-icon-only btn-right btn-panel-middle"
      onClick={onRefresh}
    >
      <i className="fa fa-refresh" />
    </Button>
  </div>
);

RenderList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RenderTitle.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export { RenderList, RenderTitle };
