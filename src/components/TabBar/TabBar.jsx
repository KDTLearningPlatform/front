import React from 'react';
import StyledNav from './StyledNav';
import { Link, useLocation } from 'react-router-dom';
import navList from './navList';

const TabBar = () => {
  const { pathname } = useLocation();

  return (
    <StyledNav>
      {navList.map((v, i) => (
        <Link
          to={v.path}
          key={i}
          className={pathname === v.path ? 'current' : ''}
        >
          {v.img}
          <span>{v.name}</span>
        </Link>
      ))}
    </StyledNav>
  );
};

export default TabBar;
