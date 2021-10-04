import React from 'react';
import MiddleSection from '../../templates/MiddleSection';
import GamePageHeader from '../../UI/organisms/GamePageHeader';
import { useQuery } from '@apollo/client';
import { GET_MY_GAME_RECORDS } from './GameQuery';
import { CrazyPongContainer } from '../../UI/organisms/CrazyPong';
// import { useHistory } from 'react-router-dom';

const Game: React.FC = () => {
  // const history = useHistory();
  const { loading, error, data } = useQuery(GET_MY_GAME_RECORDS, {
    pollInterval: 1000,
  });

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>game component error</p>;
  }

  if (!data.myGameRecords[data.myGameRecords.length - 1]) {
    window.location.replace('http://127.0.0.1:3000/');
    return <>game over</>;
  }

  // console.log('CP Container: ', data);
  // if (!data || !data.isPlaying) {
  //   history.push({
  //     pathname: '/',
  //   });
  //   return <>game over</>;
  // }

  // RETURN 한번 해보기 history에
  else {
    return (
      <MiddleSection middleSectionHeader={<GamePageHeader />}>
        <CrazyPongContainer data={data.myGameRecords[data.myGameRecords.length - 1]} />
      </MiddleSection>
    );
  }
};

export default Game;
