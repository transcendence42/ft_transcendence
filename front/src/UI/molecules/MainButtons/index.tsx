import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './index.scss';

const MainButtons = () => {
  return (
    <>
      <div className="main-buttons-container">
        <Button size="lg">연습하기</Button>
        <Link to="/gamematch">
          <Button size="lg">게임시작</Button>
        </Link>
      </div>
    </>
  );
};

export default MainButtons;
