import React from 'react';

import { NavIcon } from '../../atoms/NavIcon';

const NavIconData = [
  {
    svg: 'profile',
    text: 'Profile',
  },
  {
    svg: 'chat',
    text: 'Chat',
  },
  {
    svg: 'search',
    text: 'Search',
  },
];

export const NavIcons = () => {
  return (
    <>
      <div>
        {NavIconData.map(({ svg, text }, idx) => (
          <NavIcon key={idx} svg={svg} text={text} />
        ))}
      </div>
    </>
  );
};
