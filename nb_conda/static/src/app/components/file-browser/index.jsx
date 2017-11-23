import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRawDataFiles } from '../../actions/raw-data';

class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchRawDataFiles();
  }

  render() {
    const { rawData } = this.props;
    console.log(rawData.files);

    return (
      <div>OKOK</div>
    );
  }
}


const mapStateToProps = state => (
  { rawData: state.rawData }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchRawDataFiles }, dispatch)
);

FileBrowser.propTypes = {
  rawData: PropTypes.shape({
    files: PropTypes.array.isRequired,
  }).isRequired,
  fetchRawDataFiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);

/*
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddTyp: MD_ADD.DISABLED,
    };

    this.onSelectMethod = this.onSelectMethod.bind(this);
    this.onChangeModalAddTyp = this.onChangeModalAddTyp.bind(this);
  }

  componentDidMount() {
    this.props.fetchMethodOpts();
  }

  onSelectMethod(e) {
    this.props.selectMethod(e.value);
  }

  onChangeModalAddTyp(typ) {
    this.setState({ modalAddTyp: typ });
  }

  render() {
    const { modalAddTyp } = this.state;
    const { method } = this.props;
    const isLoading = method.options.length === 0;

    return (
      <Row>
        <Col md={4}>
          <span className="card-header font-header">Chemotion DL</span>
        </Col>
        <Col md={4}>
          <Select
            value={method.selected}
            options={method.options}
            onChange={this.onSelectMethod}
            clearable={false}
            isLoading={isLoading}
          />
        </Col>
        <Col md={4}>
          <RenderRightBtns onChange={this.onChangeModalAddTyp} />
        </Col>
        <ModalAdd
          type={modalAddTyp}
          onChange={this.onChangeModalAddTyp}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => (
  { method: state.method }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ selectMethod, fetchMethodOpts }, dispatch)
);

Header.propTypes = {
  method: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired,
  }).isRequired,
  selectMethod: PropTypes.func.isRequired,
  fetchMethodOpts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

*/
