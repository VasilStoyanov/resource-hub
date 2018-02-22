import React from 'react';
import { NavItem as DefaultNavItem, MenuItem as DefaultMenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const MenuItem = ({ to, text, divider }) => {
  const menuItem = !divider
    ? (<LinkContainer to={to}>
      <DefaultMenuItem>{text}</DefaultMenuItem>
    </LinkContainer>)
    : (<DefaultMenuItem divider />);

  return menuItem;
};

export const NavItem = ({ glyph, text, to }) => {
  const glyphicon = `glyphicon glyphicon-${glyph}`;

  const navItem = (<LinkContainer to={to}>
    <DefaultNavItem>
      <span className={glyphicon} /> {text}
    </DefaultNavItem>
  </LinkContainer>);

  return navItem;
};

