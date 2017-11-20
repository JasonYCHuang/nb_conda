import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import optCategories from '../../constants/opt-categories';
import { selectCategory } from '../../actions/category';
import ModalAddCategory from './modal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onToggleModal = this.onToggleModal.bind(this);
  }

  onSelectCategory(e) {
    this.props.selectCategory(e.value);
  }

  onToggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { showModal } = this.state;

    return (
      <Row>
        <Col md={4}>
          <Select
            value={this.props.category}
            options={optCategories}
            onChange={this.onSelectCategory}
            clearable={false}
          />
        </Col>
        <Col md={4} />
        <Col md={4}>
          <Button
            className="pull-right"
            onClick={this.onToggleModal}
          >
            Add
          </Button>
        </Col>
        <ModalAddCategory
          show={showModal}
          onHide={this.onToggleModal}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => (
  { category: state.category }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators({ selectCategory }, dispatch)
);

Header.propTypes = {
  category: PropTypes.string.isRequired,
  selectCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
