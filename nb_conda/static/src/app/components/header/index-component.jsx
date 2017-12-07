import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, MenuItem } from 'react-bootstrap';
import MD_ADD from '../constants/modal-add';

const RenderAddDropDown = ({ onChange }) => {
  const onAddDLModel = () => onChange(MD_ADD.DL_MODEL);
  const onAddRaw = () => onChange(MD_ADD.RAW);

  return (
    <Dropdown id="add-dropdown" className="pull-right space-h-2">
      <Dropdown.Toggle>
        <i className="fa fa-plus" />
        <span>  Add</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="1" onClick={onAddDLModel}>
          <i className="fa fa-magic space-h-5" />
          <span>Add Deep Learning Model</span>
        </MenuItem>
        <MenuItem eventKey="2" onClick={onAddRaw}>
          <i className="fa fa-database space-h-5" />
          <span>Add Raw File</span>
        </MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const RenderRightBtns = ({ onChange }) => (
  <div>
    <Button
      className="pull-right space-h-2"
    >
      <i className="fa fa-cog" />
      <span>  Setting</span>
    </Button>
    <RenderAddDropDown onChange={onChange} />
  </div>
);

RenderAddDropDown.propTypes = {
  onChange: PropTypes.func.isRequired,
};

RenderRightBtns.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default RenderRightBtns;
