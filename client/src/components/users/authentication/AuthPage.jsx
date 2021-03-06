import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AuthNavbar from './AuthNavbar';

class AuthPage extends Component {
  render() {
    return (
      <Grid className="auth-page-container">
        <Row>
          <Col sm={6} smOffset={3}>
            <div className="panel basic-card">
              <div className="basic-heading">
                <AuthNavbar location={this.props.location} />
              </div>
              <Row className="auth-panel-body">
                <Col lg={12}>
                  {this.props.children}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AuthPage;
