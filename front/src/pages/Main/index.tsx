import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GameCard from '../../UI/organisms/GameCard';
import { dummyGameCardData } from '../../utils/dummy';
import MainPageHeader from '../../UI/organisms/MainPageHeader';

const Main: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<MainPageHeader />}>
      <GameCard playerA={dummyGameCardData.playerA} playerB={dummyGameCardData.playerB} />
    </MiddleSection>
  );
};

export default Main;
