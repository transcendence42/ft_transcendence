import React from 'react';
import { Button } from '@chakra-ui/react';
import './index.scss';

const MainButtons = () => {
  return (
    <>
      <div className="main-buttons-container">
        <Button size="lg">연습하기</Button>
        <Button size="lg">게임시작</Button>
      </div>
    </>
  );
};

export default MainButtons;
