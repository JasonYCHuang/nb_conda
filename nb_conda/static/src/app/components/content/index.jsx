import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Row, Col, Panel, Nav, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: false,
    };
  }

  // renderTabs() {
  //   return (
  //   );
  // }

  render() {
    return (
      <Tab.Container defaultActiveKey={0} id="content-tabs" >
        <Row className="clearfix card-content">
          <Col sm={3}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey={0}>
                <i className="fa fa-database" />
                <span className="text-tab-stage" >Learning Set</span>
              </NavItem>
              <NavItem eventKey={1}>
                <i className="fa fa-magic" />
                <span className="text-tab-stage" >Deep Learning Model</span>
              </NavItem>
              <NavItem eventKey={2}>
                <i className="fa fa-child" />
                <span className="text-tab-stage" >Prediction</span>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content animation>
              <Tab.Pane eventKey={0}>
                Tab 1 content
              </Tab.Pane>
              <Tab.Pane eventKey={1}>
                Tab 2 content
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                Tab 2 content
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

// const mapStateToProps = state => (
//   { category: state.category }
// );

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({ selectCategory }, dispatch)
// );

// Content.propTypes = {
//   category: PropTypes.string.isRequired,
//   selectCategory: PropTypes.func.isRequired,
// };

//export default connect(mapStateToProps, mapDispatchToProps)(Content);

export default Content;
