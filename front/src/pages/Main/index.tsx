import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import ProfileLarge from '../../UI/organisms/MiddleSectionHeader';
import MainButtons from '../../UI/molecules/MainButtons';
import GameCard from '../../UI/organisms/GameCard';
import { DummyGameCardData } from '../../UI/organisms/GameCard/DummyGameCardData';

const Main: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<ProfileLarge rightComponent={<MainButtons />} />}>
      <GameCard playerA={DummyGameCardData.playerA} playerB={DummyGameCardData.playerB} />
    </MiddleSection>
  );
};

export default Main;
