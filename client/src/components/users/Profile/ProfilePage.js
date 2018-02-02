import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavigationButton } from '../common/NavigationButton';


export default class ProfilePage extends Component {
  render() {
    return (
      <Row>
        <Col xs={1}>
            <p>Email address: cparandiev@gmail.comm </p>
        </Col>
        <Col>
            <NavigationButton value="Change your email!" />
        </Col>
      </Row>
    );
  }
}
