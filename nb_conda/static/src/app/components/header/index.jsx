import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import ModalAdd from './modal-add';
import RenderRightBtns from './index-component';
import MD_ADD from '../constants/modal-add';
import { selectMethod, fetchMethodOpts } from '../../actions/select-method';

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
  bindActionCreators({
    selectMethod,
    fetchMethodOpts,
  }, dispatch)
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
