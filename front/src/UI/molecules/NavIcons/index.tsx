import React from 'react';

import { NavIcon } from '../../atoms/NavIcon';

export const NavIcons = ({ NavigationData }: { NavigationData: { title: string; icon: string; link: string }[] }) => {
  return (
    <>
      <div>
        {NavigationData.map(({ title, icon, link }, idx) => (
          <NavIcon key={idx} title={title} icon={icon} link={link} />
        ))}
      </div>
    </>
  );
};
