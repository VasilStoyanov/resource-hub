import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import { RenderInput } from '../../common/RenderInput';
import { NavigationButton } from '../../common/NavigationButton';

export default ({
  changepassurl = '', changeemailurl = '',
}) => (
  <Grid className="auth-page-container">
    <Row>
      <Col lg={6} lgOffset={3}>
        <div className="profile-card basic-card">
          <div className="basic-heading">
            <h3>Edit Profile</h3>
          </div>
          <form className="basic-form-input">
            <RenderInput
              controlId="profile-username"
              glyph="user"
              placeholder="Username"
              disabled
            />
            <RenderInput
              controlId="profile-email"
              glyph="envelope"
              placeholder="Email"
              disabled
            />
            <RenderInput
              controlId="profile-password"
              glyph="lock"
              placeholder="Password"
              disabled
            />
            <div className="profile-page-buttons">
              <NavigationButton
                className="basic-button basic-button-lg"
                value="Change password"
                url={changepassurl}
              />
              <div className="profile-buttons-divider" />
              <NavigationButton
                className="basic-button basic-button-lg"
                value="Change email"
                url={changeemailurl}
              />
            </div>
          </form>
        </div>
      </Col>
    </Row>
  </Grid>
);
