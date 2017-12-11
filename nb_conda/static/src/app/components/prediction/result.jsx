import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';

const RenderList = ({ rows }) => {
  const content = rows.length === 0
    ? <Panel>No Result</Panel>
    : rows.map((r, idx) => <p key={idx}>{ r }</p>);

  return content;
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const title = 'Result';
    const { prediction } = this.props;

    return (
      <Panel header={title}>
        <RenderList rows={prediction.results} />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { prediction: state.prediction }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

Result.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
