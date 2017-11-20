import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import optCategories from '../../constants/opt-categories';
import { selectCategory } from '../../actions/category';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onSelectCategory(e) {
    this.props.selectCategory(e.value);
  }

  onClickAdd() {
    console.log('TBD');
  }

  render() {
    return (
      <Well bsSize="small">
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
              onClick={this.onClickAdd}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Well>
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
