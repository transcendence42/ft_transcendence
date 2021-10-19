import React from 'react';
import { ISmallCircleButton } from '../../../utils/interface';

import './index.scss';

export const SmallCircleButton = ({ color = 'white', setBallColor }: ISmallCircleButton) => {
  return (
    <button
      className="small-circle"
      style={{ backgroundColor: `${color}`, border: '1px solid black' }}
      onClick={() => setBallColor(color)}
    ></button>
  );
};
