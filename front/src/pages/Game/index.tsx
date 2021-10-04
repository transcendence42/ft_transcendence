import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';
import { useQuery } from '@apollo/client';
import { GET_MY_GAME_RECORDS } from './GameQuery';
import { CrazyPongContainer } from '../../UI/organisms/CrazyPong';

const Game: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_GAME_RECORDS);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>game component error</p>;
  }

  return (
    <MiddleSection middleSectionHeader={<GamePageHeader />}>
      <CrazyPongContainer data={data.myGameRecords[data.myGameRecords.length - 1]} />
    </MiddleSection>
  );
};

export default Game;
