import React, { Component } from 'react';
import NavAuthenticated from './NavAuthenticated';
import NavNotAuthenticated from './NavNotAuthenticated';

class Navbar extends Component {
  render() {
    const elements = this.props.authenticated 
    ? <NavAuthenticated onClick={this.logoutUser.bind(this)} username={this.props.username} />
    : <NavNotAuthenticated />;

    return (
      <nav className="navbar navbar-inverse">
      <div className="container-fluid">
          <div className="navbar-header">
              <a className="navbar-brand nav-item">NodeJs</a>
          </div>
              {elements}
      </div>
  </nav>
    );
  }
}

export default Navbar;
