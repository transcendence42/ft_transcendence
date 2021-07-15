import React, { useState, useCallback, useEffect, ReactNode, MouseEvent } from 'react';
import './index.scss';

const useContextMenu = (outerRef: React.MutableRefObject<HTMLDivElement>) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      setXPos(`${event.pageX}px`);
      setYPos(`${event.pageY}px`);
      if (
        outerRef.current.getBoundingClientRect().top <= event.pageY &&
        outerRef.current.getBoundingClientRect().bottom >= event.pageY &&
        outerRef.current.getBoundingClientRect().left <= event.pageX &&
        outerRef.current.getBoundingClientRect().right >= event.pageX
      ) {
        event.preventDefault();
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.addEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { xPos, yPos, menu, showMenu };
};

export const Menu = ({
  outerRef,
  menuOnClick,
  children,
}: {
  outerRef: React.MutableRefObject<HTMLDivElement>;
  menuOnClick: (event: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>) => void;
  children: ReactNode;
}) => {
  const { xPos, yPos, menu, showMenu } = useContextMenu(outerRef);

  const menuOnClickHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLUListElement>,
  ) => {
    e.stopPropagation();
    menuOnClick(e);
    showMenu(false);
  };

  if (menu) {
    return (
      <ul
        className="menu"
        style={{ top: yPos, left: xPos }}
        onClick={(e) => menuOnClickHandler(e)}
        onKeyDown={(e) => menuOnClickHandler(e)}
        role="menu"
      >
        {children}
      </ul>
    );
  }
  return null;
};
