import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalAdd = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Add Sth</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      One fine body...
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={onHide} >Close</Button>
    </Modal.Footer>
  </Modal>
);

ModalAdd.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ModalAdd;
