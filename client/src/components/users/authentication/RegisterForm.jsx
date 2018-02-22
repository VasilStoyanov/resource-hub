import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from '../../common/RenderInput';
import { AuthButton } from '../common/AuthButton';
import { registerValidation as validate } from '../../../utilities/validators/validationSchemas/authenticationValidator';
import { registerUser } from '../../../actions/users';

class RegisterForm extends Component {
  submit(results) {
    this.props.dispatch(registerUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="auth-form basic-form-input" onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field
          controlId="register-username"
          name="username"
          placeholder="Username"
          glyph="user"
          component={RenderInput}
        />
        <Field
          controlId="register-email"
          name="email"
          placeholder="Email address"
          glyph="envelope"
          component={RenderInput}
        />
        <Field
          controlId="register-password"
          name="password"
          placeholder="Password"
          glyph="lock"
          type="password"
          component={RenderInput}
        />
        <Field
          controlId="register-confirm-password"
          name="confirmPassword"
          placeholder="Confirm Password"
          glyph="lock"
          type="password"
          component={RenderInput}
        />
        <AuthButton value="Register" className="form-control btn btn-register" />
      </form>
    );
  }
}

export default reduxForm({ form: 'register-form', validate })(RegisterForm);
