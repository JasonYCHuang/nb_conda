import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { selectMethod, fetchMethodOpts } from '../../actions/select-method';
import ModalAdd from './modal-add';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAdd: false,
    };

    this.onSelectMethod = this.onSelectMethod.bind(this);
    this.onToggleModalAdd = this.onToggleModalAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchMethodOpts();
  }

  onSelectMethod(e) {
    this.props.selectMethod(e.value);
  }

  onToggleModalAdd() {
    const { showModalAdd } = this.state;
    this.setState({ showModalAdd: !showModalAdd });
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
    const { showModalAdd } = this.state;
    const { method } = this.props;
    const btns = this.renderRightBtns();
    const isLoading = method.options.length === 0;

    return (
      <Row>
        <Col md={4}>
          <span className='card-header font-header'>Chemotion DL</span>
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
        <Col md={4}>{btns}</Col>
        <ModalAdd
          show={showModalAdd}
          onHide={this.onToggleModalAdd}
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
    selected:  PropTypes.number.isRequired,
  }),
  selectMethod: PropTypes.func.isRequired,
  fetchMethodOpts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
