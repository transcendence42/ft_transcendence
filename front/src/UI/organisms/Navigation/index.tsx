import React from 'react';

import { NavIcons } from '../../molecules/NavIcons';
import { NavigationData } from './NavigationData';

import './index.scss';

export const Navigation = () => {
  return (
    <div className="navigation-container">
      <NavIcons NavigationData={NavigationData}></NavIcons>
    </div>
  );
};
