import React from 'react';
import { Link } from 'react-router-dom';

export default () => (            
    <ul className="nav navbar-nav">
        <li><Link className='nav-item' to='/'>Home</Link></li>
        <li><Link className='nav-item' to='/users'>Authenticate</Link></li>
    </ul>
);

