import React from 'react';
import { Image, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProfileDropdown = ({ id, options, profileImageURL }) => {
    const menuItems = options.map((option, index) => 
        (<NavItem key={index} componentClass={Link} href={option.url} to={option.url}>
            {option.title}
        </NavItem>)
    );
    return (
        <NavDropdown 
            id={id}
            title={
                <div className="pull-left">
                    <Image
                        width="20px"
                        className="thumbnail-image" 
                        src={profileImageURL}
                        alt="user pic"
                    />
                </div>
            }
        >
            {menuItems}
        </NavDropdown>
    );
};
