import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { fetchSet } from '../../actions/set';
import { RenderTable, RenderTitle } from './components';

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckdItems: [],
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onToggleCheck = this.onToggleCheck.bind(this);
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

  onToggleCheck(e) {
    const item = e.target.value;
    const cis = this.state.ckdItems;
    const idx = cis.indexOf(item);
    if (idx === -1) {
      this.setState({ ckdItems: [...cis, item] });
    } else {
      this.setState({
        ckdItems: [...cis.slice(0, idx), ...cis.slice(idx + 1)],
      });
    }
  }

  render() {
    const { set } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="learning">
        <RenderTable
          rows={set.files}
          onToggleCheck={this.onToggleCheck}
        />
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

Learning.propTypes = {
  set: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchSet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
