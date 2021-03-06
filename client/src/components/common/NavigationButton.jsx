import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationButton = ({ className, value, url }) => (
  <Link to={url}>
    <Button className={className}>{value}</Button>
  </Link>
);
