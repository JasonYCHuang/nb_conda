import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';

import { uploadRawFiles } from '../../actions/raw-file';

class FileDropzone extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    this.props.uploadRawFiles(acceptedFiles);
  }

  render() {
    return (
      <Dropzone className="card-inline" onDrop={this.onDrop}>
        <Button className="space-h-5 btn-icon-only" bsStyle="primary">
          <i className="fa fa-plus" />
        </Button>
      </Dropzone>
    );
  }
}

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ uploadRawFiles }, dispatch)
);

FileDropzone.propTypes = {
  uploadRawFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDropzone);
