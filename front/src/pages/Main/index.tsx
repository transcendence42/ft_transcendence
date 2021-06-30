import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GameCard from '../../UI/organisms/GameCard';
import { DummyGameCardData } from '../../UI/organisms/GameCard/DummyGameCardData';
import MainPageHeader from '../../UI/organisms/MainPageHeader';

const Main: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<MainPageHeader />}>
      <GameCard playerA={DummyGameCardData.playerA} playerB={DummyGameCardData.playerB} />
    </MiddleSection>
  );
};

export default Main;
