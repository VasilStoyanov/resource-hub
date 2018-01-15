import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

class AuthNavbar extends Component {    
    getChildrenName() {
        console.log(this.props);
        const { pathname } = this.props.location;
        
        return pathname.split('/').slice(-1).pop();      
    }

    render() {
        const childrenName = this.getChildrenName.call(this);
        const loginActiveClass = childrenName === 'login' ? 'link-is-active' : '';
        const registerActiveClass = childrenName === 'register' ? 'link-is-active' : '';

        return (
            <Row>
                <Link className='login-header' to='/users/login'>
                    <Col xs={6} className={`${loginActiveClass}`}>
                        Login
                    </Col>
                </Link>
                <Link className='register-header' to='/users/register'>
                    <Col xs={6} className={`${registerActiveClass}`}>
                        Register
                    </Col>
                </Link>
            </Row>
        );
    }
}

export default AuthNavbar;
