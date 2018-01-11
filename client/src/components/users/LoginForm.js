import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from './common/RenderInput';
import { AuthButton } from './common/AuthButton';
import { loginValidation } from '../../utilities/validators/authenticationValidator';
import loginUser from '../../actions/users/loginUser';

class LoginPage extends Component {
  submit(results) {
    console.log(results);
      this.props.dispatch(loginUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <form className='auth-form' onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field placeholder='Username' name='username' glyph='user' component={RenderInput} />
              <Field type='password' placeholder='Password' name='password' glyph='lock' component={RenderInput} />
              <AuthButton value='Login' />
        </form>
    );
  }
}

const validate = loginValidation;

export default reduxForm({ form: 'login-form', validate })(LoginPage);
