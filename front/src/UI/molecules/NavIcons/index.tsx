import React from 'react';

import { NavIcon } from '../../atoms/NavIcon';
import { Iicon } from '../../organisms/Navigation/NavigationData';

export const NavIcons = ({ NavigationData }: { NavigationData: Iicon[] }) => {
  return (
    <>
      {NavigationData.map(({ title, icon, link }, idx) => (
        <NavIcon key={idx} title={title} icon={icon} link={link} />
      ))}
    </>
  );
};
