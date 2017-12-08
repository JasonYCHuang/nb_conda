import React from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Preprocessing from '../preprocessing';
import Learning from '../learning';
import Prediction from '../Prediction';

const Content = () => (
  <Tab.Container defaultActiveKey={0} id="content-tabs" >
    <Row className="clearfix card-content">
      <Col sm={3}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey={0}>
            <i className="fa fa-database" />
            <span className="text-tab-stage" >Preprocessing</span>
          </NavItem>
          <NavItem eventKey={1}>
            <i className="fa fa-magic" />
            <span className="text-tab-stage" >Learning</span>
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
            <Preprocessing />
          </Tab.Pane>
          <Tab.Pane eventKey={1}>
            <Learning />
          </Tab.Pane>
          <Tab.Pane eventKey={2}>
            <Prediction />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

export default Content;
