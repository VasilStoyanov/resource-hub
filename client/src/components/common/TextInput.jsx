import React from 'react';
import { form, FormControl } from 'react-bootstrap';

export default ({
  id, label, placeholder, handleChange, value,
}) => (
  <form>
    <FormControl
      id={id}
      type="text"
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
    />
  </form>
);
