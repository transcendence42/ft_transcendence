import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import MainPageHeader from '../../UI/organisms/MainPageHeader';
import GameCardList from '../../UI/organisms/GameCardList';

const Main: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<MainPageHeader />}>
      <GameCardList />
    </MiddleSection>
  );
};

export default Main;
