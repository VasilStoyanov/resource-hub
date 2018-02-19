import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from '../common/RenderInput';
import { AuthButton } from './common/AuthButton';
import { loginValidation } from '../../utilities/validators/validationSchemas/authenticationValidator';
import { loginUser } from '../../actions/users/';

class LoginPage extends Component {
  submit(results) {
      this.props.dispatch(loginUser(results));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <form className='auth-form basic-form-input' onSubmit={handleSubmit(this.submit.bind(this))}>
               <Field 
                controlId='login-username'
                name='username' 
                placeholder='Username' 
                glyph='user'
                component={RenderInput} 
              />
              <Field 
                controlId='login-password' 
                name='password' 
                placeholder='Password' 
                glyph='lock' 
                type='password' 
                component={RenderInput} 
              />
              <AuthButton value='Login'/>
        </form>
    );
  }
}

const validate = loginValidation;

export default reduxForm({ form: 'login-form', validate })(LoginPage);
