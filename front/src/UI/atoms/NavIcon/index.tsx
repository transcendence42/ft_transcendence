import React from 'react';

import { Link } from 'react-router-dom';
import { Iicon } from '../../organisms/Navigation/NavigationData';

import './index.scss';

export const NavIcon = ({ title, icon, link }: Iicon) => {
  return (
    <>
      <Link to={link}>
        <div className="navigation-icon-container">
          <div className="navigation-icon-container__icon">{icon}</div>
          <div className="navigation-icon-container__title">{title}</div>
        </div>
      </Link>
    </>
  );
};
