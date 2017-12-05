import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { convertRawFile } from '../../actions/raw-file';

const ConvertBtn = (props) => {
  const onClick = () => {
    const msg = 'It takes time to convert a file. \n' +
      `Are you sure to convert '${props.name}'?`;
    if (confirm(msg)) {
      props.convertRawFile(props.name);
    }
  };

  return (
    <Button bsStyle="primary" className="w-110" onClick={onClick} >
      <i className="fa fa-database space-h-5" />
      <span>Convert</span>
    </Button>
  );
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    convertRawFile,
  }, dispatch)
);

ConvertBtn.propTypes = {
  name: PropTypes.string.isRequired,
  convertRawFile: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ConvertBtn);
