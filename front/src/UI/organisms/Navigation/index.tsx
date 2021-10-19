import React from 'react';

import { NavIcons } from '../../molecules/NavIcons';
import { NavigationData } from './NavigationData';

import './index.scss';

export const Navigation = () => {
  return (
    <div className="navigation-container">
      <img className="img-logo" src="/logo_navbar.png" alt=""></img>
      <NavIcons NavigationData={NavigationData}></NavIcons>
    </div>
  );
};
