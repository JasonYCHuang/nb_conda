import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RenderTable, RenderAction } from './components';
import { fetchRaw, deleteRaw } from '../../actions/raw';

class AddRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ckdItems: [],
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onToggleCheck = this.onToggleCheck.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchRaw();
  }

  onRefresh() {
    this.props.fetchRaw();
  }

  onDelete() {
    const { ckdItems } = this.state;
    const msg = `Are you sure to delete ${ckdItems.length} files`;
    if (confirm(msg)) {
      this.props.deleteRaw(ckdItems);
      this.setState({ ckdItems: [] });
    }
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
    const { raw } = this.props;
    const deletable = this.state.ckdItems.length > 0;

    return (
      <div>
        <RenderAction
          deletable={deletable}
          onRefresh={this.onRefresh}
          onDelete={this.onDelete}
        />
        <RenderTable
          roles={raw.files}
          onToggleCheck={this.onToggleCheck}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  { raw: state.raw }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchRaw,
    deleteRaw,
  }, dispatch)
);

AddRaw.propTypes = {
  raw: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRaw: PropTypes.func.isRequired,
  deleteRaw: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRaw);
