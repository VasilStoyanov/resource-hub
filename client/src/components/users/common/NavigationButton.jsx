import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationButton = ({ style, value, url }) => (
  <Link className="login-header" to={url}>
    <Button style={style}>{value}</Button>
  </Link>
);
