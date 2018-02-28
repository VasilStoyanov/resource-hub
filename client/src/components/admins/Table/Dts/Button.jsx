import React from 'react';
import { Button } from 'react-bootstrap';

export default className => ({
  type, handleClick, disabled, text, checked, size,
}) => (
  <Button
    className={className}
    checked={checked}
    bsStyle={type}
    disabled={disabled}
    bsSize={size}
    onClick={() => handleClick(checked)}
  >
    {text}
  </Button>
);

