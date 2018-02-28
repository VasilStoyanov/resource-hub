import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default className => ({
  disabled, type, text, url,
}) => (
  <Link to={url}>
    <Button
      className={className}
      bsStyle={type}
      disabled={disabled}
    >
      {text}
    </Button>
  </Link>
);

