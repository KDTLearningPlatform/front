import React from 'react';
import StyledNav from './StyledNav';
import { Link, useLocation } from 'react-router-dom';
import navList from './navList';

const TabBar = () => {
  const { pathname } = useLocation();

  return (
    <StyledNav>
      {navList.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={pathname === item.path ? 'current' : ''}
          aria-current={pathname === item.path ? 'page' : undefined}
        >
          {item.img}
          <span>{item.name}</span>
        </Link>
      ))}
    </StyledNav>
  );
};

export default TabBar;
