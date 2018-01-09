import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderInput } from './common/RenderInput';
import Button from './common/Button';

class RegisterForm extends Component {
  submit(results) {
    console.log(results);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
            <Field placeholder='Username' name='username' component={RenderInput} />
            <Field placeholder='Email address' name='email' component={RenderInput} />
            <Field type='password' placeholder='Password' name='password' component={RenderInput} />
            <Field type='password' placeholder='Confirm Password' name='confirmPassword' component={RenderInput} />
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                  <Button type="submit" name="register-submit" className="form-control btn btn-register" value="Register Now" />
                </div>
              </div>
            </div>
            </form>
    );
  }
}

export default reduxForm({ form: 'register-form' })(RegisterForm);
