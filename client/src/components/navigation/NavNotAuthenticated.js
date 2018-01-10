import React, { Component } from 'react';
import { Link } from  'react-router-dom';
import { NavItem, Nav } from 'react-bootstrap';

class NavNotAuthenticated extends Component {
    render() {
        // const this.props.location.split('/').slice(-1).pop();
        return (            
            <Nav>
                <NavItem componentClass={Link} eventKey={1} href='/home' to='/home'>
                    Home
                </NavItem>
                <NavItem componentClass={Link} eventKey={2} href='/users' to='/users'>
                    Authentication
                </NavItem>
            </Nav>
        );
    }
}

export default NavNotAuthenticated;
