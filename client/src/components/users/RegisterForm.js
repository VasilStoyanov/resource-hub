import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from '../common/RenderInput';
import { AuthButton } from './common/AuthButton';
import { registerValidation as validate } from '../../utilities/validators/authenticationValidator';
import { registerUser } from '../../actions/users';

class RegisterForm extends Component {
  submit(results) {
    this.props.dispatch(registerUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
            <form className='auth-form' onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field controlId='register-form-group' placeholder='Username' name='username' glyph='user' component={RenderInput} />
              <Field controlId='register-form-group' placeholder='Email address' name='email' glyph='envelope' component={RenderInput} />
              <Field controlId='register-form-group' type='password' placeholder='Password' glyph='lock' name='password' component={RenderInput} />
              <Field controlId='register-form-group' type='password' placeholder='Confirm Password' glyph='lock' name='confirmPassword' component={RenderInput} />
              <AuthButton value='Register' className={'form-control btn btn-register'} />
            </form>
    );
  }
}

export default reduxForm({ form: 'register-form', validate })(RegisterForm);
