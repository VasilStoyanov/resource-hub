import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from './common/RenderInput';
import Button from './common/Button';
import { loginValidation } from '../../utilities/validators/authenticationValidator';

class LoginPage extends Component {
  submit(result) {
    console.log(result);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field placeholder='Username' name='username' component={RenderInput} />
              <Field type='password' placeholder='Password' name='password' component={RenderInput} />
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <Button type="submit" name="register-submit" className="form-control btn btn-register" value="Login Now" />
                  </div>
                </div>
              </div>
          </form>
    );
  }
}

const validate = loginValidation;

export default reduxForm({ form: 'login-form', validate })(LoginPage);
