import React from 'react';
import { MenuItem } from 'react-bootstrap';

export default ({ id, name }) => (
    <MenuItem eventKey={id}>{name}</MenuItem>
);

