import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import { NavItem, Nav } from 'react-bootstrap';

class NavNotAuthenticated extends Component {
    render() {
        // const this.props.location.split('/').slice(-1).pop();
        return (            
            <Nav>
                <NavItem componentClass={Link} eventKey={1} href='/' to='/'>
                    Home
                </NavItem>
                <NavItem componentClass={Link} eventKey={2} href='/users/login' to='/users/login'>
                    Authentication
                </NavItem>
                <NavItem componentClass={Link} eventKey={3} href='/users/profile' to='/users/profile'>
                    Profile
                </NavItem>
            </Nav>
        );
    }
}

export default NavNotAuthenticated;
