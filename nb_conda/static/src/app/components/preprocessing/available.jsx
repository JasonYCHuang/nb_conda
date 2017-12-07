import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { fetchRaw } from '../../actions/raw';
import { RenderTable, RenderTitle } from './available-components';

class Available extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const pMethod = this.props.method;
    const nMethod = nextProps.method;
    if (pMethod !== nMethod) {
      this.props.fetchRaw();
    }
  }

  onRefresh() {
    this.props.fetchRaw();
  }

  render() {
    const { raw } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="available">
        <RenderTable rows={raw.files} />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { raw: state.raw, method: state.method }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchRaw,
  }, dispatch)
);

Available.propTypes = {
  raw: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchRaw: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Available);
