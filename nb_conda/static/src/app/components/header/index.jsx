import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { selectCategory, fetchCategoryOpts } from '../../actions/category';
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

  componentDidMount() {
    this.props.fetchCategoryOpts();
  }

  onSelectCategory(e) {
    this.props.selectCategory(e.value);
  }

  onToggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  renderRightBtns() {
    return (
      <div>
        <Button
          className="pull-right space-h-2"
        >
          <i className="fa fa-cog" />
          <span>  Setting</span>
        </Button>
        <Button
          className="pull-right space-h-2"
        >
          <i className="fa fa-plus" />
          <span>  Add</span>
        </Button>
      </div>
    );
  }

  render() {
    const { showModal } = this.state;
    const { category } = this.props;
    const btns = this.renderRightBtns();

    return (
      <Row>
        <Col md={4}>
          <Select
            value={category.selected}
            options={category.options}
            onChange={this.onSelectCategory}
            clearable={false}
          />
        </Col>
        <Col md={4} />
        <Col md={4}>{btns}</Col>
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
  bindActionCreators({ selectCategory, fetchCategoryOpts }, dispatch)
);

Header.propTypes = {
  category: PropTypes.shape({
    options: PropTypes.array.isRequired,
    selected:  PropTypes.number.isRequired,
  }),
  selectCategory: PropTypes.func.isRequired,
  fetchCategoryOpts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
