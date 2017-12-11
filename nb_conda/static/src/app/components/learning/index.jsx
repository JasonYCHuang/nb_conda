import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel } from 'react-bootstrap';
import { fetchSet } from '../../actions/set';
import { learnModel } from '../../actions/model';
import { RenderTable, RenderTitle, FormModel } from './components';

class Learning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckdItems: [],
      name: '',
      description: '',
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onToggleCheck = this.onToggleCheck.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.onGenerate = this.onGenerate.bind(this);
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

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onDescChange(e) {
    this.setState({ description: e.target.value });
  }

  onGenerate() {
    const { name, ckdItems, description } = this.state;
    this.props.learnModel(name, description, ckdItems);
  }

  renderTitle() {
    const { name, ckdItems } = this.state;
    const canGenerate = ckdItems.length !== 0 && name !== '';

    return (
      <RenderTitle
        canGenerate={canGenerate}
        onRefresh={this.onRefresh}
        onGenerate={this.onGenerate}
      />
    );
  }

  render() {
    const { set } = this.props;
    const { name, description } = this.state;
    const title = this.renderTitle();

    return (
      <Panel header={title} className="learning">
        <FormModel
          name={name}
          description={description}
          onNameChange={this.onNameChange}
          onDescChange={this.onDescChange}
        />
        <div>Available Set</div>
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
    learnModel,
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
  learnModel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
