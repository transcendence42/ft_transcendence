import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';

import { CrazyPongContainer } from '../../UI/organisms/CrazyPong';

const Game: React.FC = () => {
  return (
    <MiddleSection middleSectionHeader={<GamePageHeader />}>
      <CrazyPongContainer />
    </MiddleSection>
  );
};

export default Game;
