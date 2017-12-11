import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { RenderList, RenderTitle, FormPredict } from './predict-components';
import { fetchModel } from '../../actions/model';
import { makePrediction } from '../../actions/prediction';

class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smiles: 'BrC1=CC=CC=C1.CCOC(=O)C=C>>',
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onSmilesChange = this.onSmilesChange.bind(this);
    this.onPredict = this.onPredict.bind(this);
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

  onSmilesChange(e) {
    this.setState({ smiles: e.target.value });
  }

  onPredict(e, model) {
    e.stopPropagation();

    const { smiles } = this.state;
    this.props.makePrediction(model, smiles);
  }

  render() {
    const { model } = this.props;
    const { smiles } = this.state;
    const title = <RenderTitle onRefresh={this.onRefresh} />;
    const disableBtn = smiles === '';

    return (
      <Panel header={title}>
        <FormPredict
          smiles={smiles}
          onSmilesChange={this.onSmilesChange}
        />
        <RenderList
          rows={model.files}
          disableBtn={disableBtn}
          onPredict={this.onPredict}
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
    makePrediction,
  }, dispatch)
);

Predict.propTypes = {
  model: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  fetchModel: PropTypes.func.isRequired,
  makePrediction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Predict);
