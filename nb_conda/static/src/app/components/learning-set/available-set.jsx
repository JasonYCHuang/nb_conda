import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

class AvailableSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const title = 'Available Learning Set';

    return (
      <Panel header={title}>
        Panel content
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

AvailableSet.propTypes = {
};

export default connect(null, mapDispatchToProps)(AvailableSet);
