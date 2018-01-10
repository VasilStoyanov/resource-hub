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
                <Col xs={6}>
                    <Link className={`login-header ${loginActiveClass}`} to='/users/login'>Login</Link>
                </Col>
                <Col xs={6}>
                    <Link className={`register-header ${registerActiveClass}`} to='/users/register'>Register</Link>
                </Col>
            </Row>
        );
    }
}

export default AuthNavbar;
