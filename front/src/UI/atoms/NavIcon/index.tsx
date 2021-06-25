import React from 'react';

import { Link } from 'react-router-dom';

export const NavIcon = ({ title, icon, link }: { title: string; icon: string; link: string }) => {
  return (
    <>
      <div id="navigation-icon-container">
        <div id="navigation-icon-container__icon">{icon}</div>
        <Link to={link}>{title}</Link>
      </div>
    </>
  );
};
