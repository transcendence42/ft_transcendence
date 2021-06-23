import React from 'react';
export interface IProps {
  color: string;
  onClick?: (color: string) => void;
}
export const ColorButton = (props: IProps) => {
  const { color, onClick } = props;
  return (
    <button style={{ color }} onClick={() => onClick && onClick(color)}>
      Color Button
    </button>
  );
};
