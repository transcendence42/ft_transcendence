import React from 'react';

export const NavIcon = ({ svg, text }: { svg: string; text: string }) => {
  return (
    <>
      <div>
        {svg}
        {text}
      </div>
    </>
  );
};
