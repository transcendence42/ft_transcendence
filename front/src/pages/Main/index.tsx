import React from 'react';
import MainPageTemplate from '../../templates/Main';
import ProfileLarge from '../../UI/organisms/MainHeader';
import MainButtons from '../../UI/molecules/MainButtons';
import GameCard from '../../UI/organisms/GameCard';
import { DummyGameCardData } from '../../UI/organisms/GameCard/DummyGameCardData';

const Main: React.FC = () => {
  return (
    <MainPageTemplate mainHeader={<ProfileLarge rightComponent={<MainButtons />} />}>
      <GameCard playerA={DummyGameCardData.playerA} playerB={DummyGameCardData.playerB} />
    </MainPageTemplate>
  );
};

export default Main;
