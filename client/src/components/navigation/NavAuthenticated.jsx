import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavAuthenticated extends Component {
  render() {
    return (
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link className="nav-item" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-item" to="/items">Items</Link>
          </li>
          <li>
            <Link className="nav-item" to="/items/add">Add Item</Link>
          </li>
          <li>
            <Link className="nav-item" to="/shoppingcart">
              <span className="glyphicon glyphicon-shopping-cart" />Shopping Cart</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link className="nav-item" to="#">Hello, {this.props.username}</Link>
          </li>
          <li>
            <Link
              className="nav-item"
              to="/logout"
              onClick={this.props.onClick}
            >
              <span className="glyphicon glyphicon-log-in" />Logout</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavAuthenticated;
