import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { AuthButton } from '../common/AuthButton';
import { RenderInput } from '../../common/RenderInput';
import changeEmail from '../../../actions/users/changeEmail';

class ChangeEmail extends Component {
  submit(results) {
    this.props.dispatch(changeEmail(results));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Grid className="auth-page-container">
        <Row>
          <Col sm={6} smOffset={3}>
            <div className="panel panel-login basic-card">
              <div className="panel-heading">
                <Row>
                  <Link to="/users/profile/changeemail">
                    <Col>
                      Change your email
                    </Col>
                  </Link>
                </Row>
              </div>
              <Row className="panel-body">
                <Col lg={12}>
                  <form
                    className="change-email-form"
                    onSubmit={handleSubmit(this.submit.bind(this))}
                  >
                    <Field
                      id="change-email-form-email"
                      placeholder="New email address"
                      name="newEmail"
                      glyph="envelope"
                      component={RenderInput}
                    />
                    <Field
                      id="change-email-form-password"
                      type="password"
                      placeholder="Password"
                      glyph="lock"
                      name="password"
                      component={RenderInput}
                    />
                    <AuthButton value="Submit" />
                  </form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default reduxForm({ form: 'change-email-form' })(ChangeEmail);

