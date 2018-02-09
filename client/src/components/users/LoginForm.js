import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from '../common/RenderInput';
import { AuthButton } from './common/AuthButton';
import { loginValidation } from '../../utilities/validators/authenticationValidator';
import { loginUser } from '../../actions/users/';

class LoginPage extends Component {
  submit(results) {
      this.props.dispatch(loginUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <form className='auth-form' onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field placeholder='Username' controlId='login-form-group' name='username' glyph='user' component={RenderInput} />
              <Field type='password' placeholder='Password' controlId='login-form-group' name='password' glyph='lock' component={RenderInput} />
              <AuthButton value='Login' className={'form-control btn btn-register'} />
        </form>
    );
  }
}

const validate = loginValidation;

export default reduxForm({ form: 'login-form', validate })(LoginPage);
