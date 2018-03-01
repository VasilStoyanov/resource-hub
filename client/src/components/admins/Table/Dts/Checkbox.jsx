import React from 'react';
import { Checkbox } from 'react-bootstrap';

export default className => ({ checked, handleClick, disabled }) => (
  <Checkbox
    className={className}
    checked={checked}
    disabled={disabled}
    onClick={() => handleClick(checked)}
    readOnly
  />
);

