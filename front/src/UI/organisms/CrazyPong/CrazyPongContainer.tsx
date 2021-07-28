import { useMutation, useSubscription } from '@apollo/client';
import React, { useState } from 'react';

import { CrazyPongPresenter } from './CrazyPongPresentater.tsx';
import { SUBSCRIBE_CRAZYPONG, UPDATE_PLAYINGINFO } from './CrazyPongQuery';

interface IPlayingInfo {
  index: number;
  uuid?: string;
  ballX: number;
  ballY: number;
  player1Y: number;
  player2Y: number;
  createdAt?: string;
}

export const CrazyPongContainer = () => {
  const { data, loading, error } = useSubscription(SUBSCRIBE_CRAZYPONG, {
    variables: {
      uuid: '1',
    },
  });
  const [updatePlayingInfo] = useMutation(UPDATE_PLAYINGINFO);
  const [inputName, setInputName] = useState('');

  const updatePlayingInfoHandler = (playingInfo: IPlayingInfo) => {
    const { index, uuid, ballX, ballY, player1Y, player2Y } = playingInfo;
    updatePlayingInfo({
      variables: { info: { index, uuid, ballX, ballY, player1Y, player2Y } },
    });
  };

  if (loading) {
    return (
      <>
        <p>loading</p>
        <input value={inputName} onChange={(e) => setInputName(e.target.value)}></input>
        {inputName}
      </>
    );
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <CrazyPongPresenter
      playingInfo={data.playingInfo}
      updatePlayingInfoHandler={updatePlayingInfoHandler}
      inputName={inputName}
    />
  );
};
