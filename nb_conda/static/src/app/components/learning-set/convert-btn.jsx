import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { fetchRawFiles } from '../../actions/raw-file';

const ConvertBtn = (props) => {
  const onClick = () => props.fetchRawFiles();

  return (
    <Button bsStyle="primary" className="w-110" onClick={onClick} >
      <i className="fa fa-database space-h-5" />
      <span>Convert</span>
    </Button>
  );
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchRawFiles,
  }, dispatch)
);

ConvertBtn.propTypes = {
  fetchRawFiles: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ConvertBtn);
