// import { useMutation, useSubscription } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { useLocation } from 'react-router';

import { SUBSCRIBE_CRAZYPONG, UPDATE_PLAYINGINFO } from './CrazyPongQuery';

import { CrazyPongPresenter } from './CrazyPongPresentater.tsx';

import { IPlayingUpdateInfo } from '../../../utils/interface';

interface stateType {
  userID: string;
}

interface Game {
  index: number;
  uuid: string;
  playerOneID: string;
  playerTwoID: string;
}

export const CrazyPongContainer = ({ data }: { data: Game }) => {
  const location = useLocation<stateType>();
  const [inputName, setInputName] = useState('');
  const [updatePlayingInfo] = useMutation(UPDATE_PLAYINGINFO);

  const subscriptionCrazyPong = useSubscription(SUBSCRIBE_CRAZYPONG, {
    variables: {
      uuid: data.uuid,
    },
  });

  useEffect(() => {
    if (!data || !location) {
      return;
    }
    if (location.state.userID === data.playerOneID) {
      setInputName('player1');
    } else {
      setInputName('player2');
    }
  }, [inputName]);

  // if (mutation)
  // 반환값 매칭이 아니면 return ;
  // 매칭이 되면 uuid 반환 받아서 그거 밑에 넣기

  // console.log('userID ', location.state.userID);

  const updatePlayingInfoHandler = (playingInfo: IPlayingUpdateInfo) => {
    const { index, ballX, ballY, ballVelocityX, ballVelocityY, player1Y, player2Y, player1Score, player2Score } =
      playingInfo;
    updatePlayingInfo({
      variables: {
        info: {
          index,
          uuid: data.uuid,
          ballX,
          ballY,
          ballVelocityX,
          ballVelocityY,
          player1Y,
          player2Y,
          player1Score,
          player2Score,
        },
      },
    });
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
  // console.log(Date.parse(String(postgresTimeToDate(data.playingInfo.modifiedAt))));
  return (
    <CrazyPongPresenter
      playingInfo={subscriptionCrazyPong.data.playingInfo}
      updatePlayingInfoHandler={updatePlayingInfoHandler}
      inputName={inputName}
    />
  );
};
