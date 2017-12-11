import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { RenderList, RenderTitle } from './model-list-components';
import { fetchModel } from '../../actions/model';

class ModelList extends Component {
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
      this.props.fetchModel();
    }
  }

  onRefresh() {
    this.props.fetchModel();
  }

  render() {
    const { model } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title}>
        <RenderList
          rows={model.files}
        />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { model: state.model, method: state.method }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchModel,
  }, dispatch)
);

ModelList.propTypes = {
  model: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchModel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelList);
