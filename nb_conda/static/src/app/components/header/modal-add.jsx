import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MD_ADD from '../constants/modal-add';
import FileBrowser from '../file-browser';

const TitleProto = ({ icon, text }) => {
  const iconClass = `fa fa-${icon} space-h-10`;

  return (
    <Modal.Title>
      <i className="fa fa-plus" />
      <i className={iconClass} />
      <span>Add {text}</span>
    </Modal.Title>
  );
};

const Title = ({ type }) => {
  switch (type) {
    case MD_ADD.DL_MODEL:
      return <TitleProto icon="magic" text="Deep Learning Model" />;
    case MD_ADD.RAW_DATA:
      return <TitleProto icon="database" text="Raw Data" />;
    default:
      return null;
  }
};

const Body = ({ type }) => {
  switch (type) {
    case MD_ADD.DL_MODEL:
      return null;
    case MD_ADD.RAW_DATA:
      return <FileBrowser />;
    default:
      return null;
  }
};

const ModalAdd = ({ type, onChange }) => {
  const show = type !== MD_ADD.DISABLED;
  const onHide = () => onChange(MD_ADD.DISABLED);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Title type={type} />
      </Modal.Header>

      <Modal.Body>
        <Body type={type} />
      </Modal.Body>
    </Modal>
  );
};

TitleProto.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Title.propTypes = {
  type: PropTypes.string.isRequired,
};

Body.propTypes = {
  type: PropTypes.string.isRequired,
};

ModalAdd.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModalAdd;
