import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';
import { useQuery } from '@apollo/client';
import { GET_MY_GAME_RECORDS } from './GameQuery';
import { CrazyPongContainer } from '../../UI/organisms/CrazyPong';
import { useHistory } from 'react-router-dom';

const Game: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MY_GAME_RECORDS, {
    pollInterval: 1000,
  });
  const history = useHistory();

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>game component error</p>;
  }
  if (!data.myGameRecords[data.myGameRecords.length - 1]) {
    history.push('/');
    // window.location.replace(String(process.env.REACT_APP_CLIENT_URL));
    return <>game over</>;
  } else {
    return (
      <MiddleSection
        middleSectionHeader={
          <GamePageHeader
            playerOneID={data.myGameRecords[data.myGameRecords.length - 1].playerOneID}
            playerTwoID={data.myGameRecords[data.myGameRecords.length - 1].playerTwoID}
          />
        }
      >
        <CrazyPongContainer data={data.myGameRecords[data.myGameRecords.length - 1]} />
      </MiddleSection>
    );
  }
};

export default Game;
