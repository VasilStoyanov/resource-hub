import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { AuthButton } from '../common/AuthButton';
import { RenderInput } from '../common/RenderInput';
import { changePassword } from '../../../actions/users/changePassword';


class ChangePassword extends Component {
    submit(results) {
        this.props.dispatch(changePassword(results));
    }
    
    render() {
        const { handleSubmit } = this.props;

        return (
                <Grid className="auth-page-container">
                    <Row>
                        <Col sm={6} smOffset={3}>
                            <div className="panel panel-login">
                                <div className="panel-heading">
                                    <Row>
                                        <Link
                                            className='login-header' to='/users/profile/changepassword'
                                        >
                                            <Col>
                                                Change your password
                                            </Col>
                                        </Link>
                                    </Row>
                                </div>
                                <Row className="panel-body">
                                    <Col lg={12}>
                                        <form className='change-password-form' onSubmit={handleSubmit(this.submit.bind(this))}>
                                            <Field
                                                id='change-password-form-old-password'
                                                type='password' placeholder='Old Password'
                                                glyph='lock' name='oldPassword' component={RenderInput}
                                            />
                                            <Field
                                                id='change-password-form-new-password'
                                                type='password' placeholder='New Password'
                                                glyph='lock' name='newPassword' component={RenderInput}
                                            />
                                            <Field
                                                id='change-password-form-cnew-password'
                                                type='password' placeholder='Confirm new Password'
                                                glyph='lock' name='cnewpassword' component={RenderInput}
                                            />
                                            <AuthButton value='Submit' />
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

export default reduxForm({ form: 'my-form2' })(ChangePassword);
