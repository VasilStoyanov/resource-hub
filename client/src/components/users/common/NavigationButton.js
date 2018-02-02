import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationButton = ({ value }) => (
    <Link className='login-header' to='/users/login'>
        <Button>{value}</Button>
    </Link>
);
