import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from './common/RenderInput';
import { AuthButton } from './common/AuthButton';
import { registerValidation as validate } from '../../utilities/validators/authenticationValidator';
import registerUser from '../../actions/users/registerUser';

class RegisterForm extends Component {
  submit(results) {
    this.props.dispatch(registerUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
            <form className='auth-form' onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field placeholder='Username' name='username' glyph='user' component={RenderInput} />
              <Field placeholder='Email address' name='email' glyph='envelope' component={RenderInput} />
              <Field type='password' placeholder='Password' glyph='lock' name='password' component={RenderInput} />
              <Field type='password' placeholder='Confirm Password' glyph='lock' name='confirmPassword' component={RenderInput} />
              <AuthButton value='Register' />
            </form>
    );
  }
}

export default reduxForm({ form: 'register-form', validate })(RegisterForm);
