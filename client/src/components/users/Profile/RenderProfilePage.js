import React from 'react';
import { Row, Col, Grid, Label, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { NavigationButton } from '../common/NavigationButton';

export default ({ username = '', email = '', changepassurl = '', changeemailurl = '' }) => (
  <Grid className="auth-page-container">
      <Row>
          <Col lg={6} lgOffset={3}>
            <div className="panel panel-profile ">
              <Row style={{ padding: '8px' }}>
                <Col lg={2}>
                  <h4 style={{ display: 'inline-block' }}>
                    <Label>Username</Label> 
                  </h4>
                </Col>
                <Col lg={10}>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph={'user'} />
                    </InputGroup.Addon>
                    <FormControl type={'text'} value={username} disabled />
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{ padding: '8px' }}>
                <Col lg={2}>
                  <h4 style={{ display: 'inline-block' }}>
                    <Label>Email</Label> 
                  </h4>
                </Col>
                <Col lg={7}>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph={'envelope'} />
                    </InputGroup.Addon>
                    <FormControl type={'text'} value={email} disabled />
                  </InputGroup>
                </Col>
                <Col lg={3}>
                  <NavigationButton
                    style={{ width: '100%' }} value="Change email" url={changeemailurl} 
                  />
                  </Col>
              </Row>
              <Row style={{ padding: '8px' }}>
                <Col lg={2}>
                  <h4 style={{ display: 'inline-block' }}>
                    <Label>Password</Label> 
                  </h4>
                </Col>
                <Col lg={4}>
                  <NavigationButton
                    style={{ width: '100%' }} value="Change password" url={changepassurl}
                  />
                  </Col>
              </Row>
            </div>
          </Col>
      </Row>
  </Grid>
);
