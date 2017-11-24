import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

import { uploadRawData } from '../../actions/raw-data';

class FileDropzone extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.props.uploadRawData(acceptedFiles);
  };

  render() {
    return (
      <Dropzone className="card-dropzone" onDrop={this.onDrop}>
        <div className="text-dropzone">
          Upload
        </div>
      </Dropzone>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ uploadRawData }, dispatch)
);

FileDropzone.propTypes = {
  uploadRawData: PropTypes.func.isRequired,
};

export default connect(_, mapDispatchToProps)(FileDropzone);
