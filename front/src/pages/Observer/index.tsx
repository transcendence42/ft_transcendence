import { useSubscription } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { CrazyPongPresenter } from '../../UI/organisms/CrazyPong/CrazyPongPresentater.tsx';
import { IPlayingUpdateInfo } from '../../utils/interface';
import { SUBSCRIBE_CRAZYPONG } from './ObserverQuery';

interface stateType {
  uuid: string;
}

const END_SCORE = 3;
const MAIN_URL = 'http://127.0.0.1:3000/';

const gameOver = (player1Score: number, player2Score: number) => {
  return player1Score >= END_SCORE || player2Score >= END_SCORE;
};

const Observer: React.FC = () => {
  const location = useLocation<stateType>();
  const [inputName] = useState('');

  const subscriptionCrazyPong = useSubscription(SUBSCRIBE_CRAZYPONG, {
    variables: {
      uuid: location.state.uuid,
    },
  });

  const updatePlayingInfoHandler = (playingInfo: IPlayingUpdateInfo) => {
    return;
  };
  if (subscriptionCrazyPong.loading) {
    return (
      <>
        <p>loading</p>
        {inputName}
      </>
    );
  }
  if (subscriptionCrazyPong.error) {
    return <p>subscription error</p>;
  }

  const { player1Score, player2Score } = subscriptionCrazyPong.data?.playingInfo;
  if (gameOver(player1Score, player2Score)) {
    window.location.replace(MAIN_URL);
  }
  return (
    <CrazyPongPresenter
      playingInfo={subscriptionCrazyPong.data.playingInfo}
      updatePlayingInfoHandler={updatePlayingInfoHandler}
      inputName={inputName}
    />
  );
};

export default Observer;
