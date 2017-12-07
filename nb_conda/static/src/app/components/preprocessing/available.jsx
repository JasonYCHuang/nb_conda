import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { fetchSet } from '../../actions/set';
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
      this.props.fetchSet();
    }
  }

  onRefresh() {
    this.props.fetchSet();
  }

  render() {
    const { set } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="available">
        <RenderTable rows={set.files} />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { set: state.set, method: state.method }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchSet,
  }, dispatch)
);

Available.propTypes = {
  set: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchSet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Available);
