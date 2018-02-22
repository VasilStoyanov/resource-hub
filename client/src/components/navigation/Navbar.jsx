import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import NavAuthenticated from './NavAuthenticated';
import NavNotAuthenticated from './NavNotAuthenticated';

class Navigation extends Component {
  logoutUser() {

  }

  render() {
    const elements = this.props.authenticated
      ? (<NavAuthenticated
        onClick={this.logoutUser.bind(this)}
        isAdmin={this.props.isAdmin}
        username={this.props.username}
      />)
      : <NavNotAuthenticated location={this.props.location} />;

    return (
      <Navbar collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a>ResourceHub</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {elements}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authReducer.authenticated,
  username: 'threat',
  isAdmin: true,
});

export default connect(mapStateToProps)(Navigation);
