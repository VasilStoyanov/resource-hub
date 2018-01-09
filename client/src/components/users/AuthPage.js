import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AuthNavbar from './AuthNavbar';

class AuthPage extends Component {
    render() {
        return (
                <Grid className="auth-page-container">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <div className="panel panel-login">
                                <div className="panel-heading">
                                    <AuthNavbar location={this.props.location} />
                                    <hr />
                                </div>
                                <Row className="panel-body">
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
