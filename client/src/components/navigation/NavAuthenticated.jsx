import React, { Component } from 'react';
import { Nav, NavDropdown, Glyphicon } from 'react-bootstrap';
import { MenuItem, NavItem } from './common/NavItems.jsx';

class NavAuthenticated extends Component {
  render() {
    return (
      <Nav>
        {this.props.isAdmin &&
          <NavDropdown eventKey="4" title="Admin" id="nav-dropdown">
            <MenuItem
              to="/users/admin/pendingrequests"
              text="Pending Requests"
            />
          </NavDropdown>}
        <NavItem
          to="/resources/manage"
          glyph="th-list"
          text="Manage Resources"
        />
        <NavItem
          to="/home"
          glyph="home"
          text="Home"
        />
        <NavDropdown title={<div style={{ display: 'inline-block' }}><Glyphicon glyph="user" /> {this.props.username} </div>}>
          <MenuItem
            to="/users/logout"
            glyph="log-in"
            text="Logout"
          />
          <MenuItem
            to="/users/profile"
            glyph="user"
            text="My Profile"
          />
        </NavDropdown>
      </Nav>
    );
  }
}

export default NavAuthenticated;
