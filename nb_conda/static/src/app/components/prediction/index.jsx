import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { RenderList, RenderTitle } from './components';
import { fetchModel } from '../../actions/model';

class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    this.props.fetchModel();
  }

  render() {
    const { model } = this.props;
    const title = <RenderTitle onRefresh={this.onRefresh} />;

    return (
      <Panel header={title} className="prediction">
        <RenderList
          rows={model.files}
        />
      </Panel>
    );
  }
}

const mapStateToProps = state => (
  { model: state.model }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchModel,
  }, dispatch)
);

Prediction.propTypes = {
  model: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchModel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
