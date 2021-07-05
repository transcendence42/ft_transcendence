import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';

import CrazyPong from '../../UI/organisms/CrazyPong';

const Game: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<GamePageHeader />}>
      <CrazyPong />
    </MiddleSection>
  );
};

export default Game;
