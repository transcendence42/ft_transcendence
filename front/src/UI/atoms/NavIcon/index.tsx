import React from 'react';

import { Link } from 'react-router-dom';

export const NavIcon = ({ title, icon, link }: { title: string; icon: string; link: string }) => {
  return (
    <>
      <div>
        {icon}
        <Link to={link}>{title}</Link>
      </div>
    </>
  );
};
