import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import NavAuthenticated from './NavAuthenticated';
import NavNotAuthenticated from './NavNotAuthenticated';

class Navigation extends Component {
  render() {
    const elements = this.props.authenticated 
    ? <NavAuthenticated onClick={this.logoutUser.bind(this)} username={this.props.username} />
    : <NavNotAuthenticated location={this.props.location} />;

    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a>DHub</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {elements}
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default connect()(Navigation);
