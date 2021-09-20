// import { useMutation, useSubscription } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useLocation } from 'react-router';
import { GET_MY_GAME_RECORDS, SUBSCRIBE_CRAZYPONG, UPDATE_PLAYINGINFO } from './CrazyPongQuery';

import { CrazyPongPresenter } from './CrazyPongPresentater.tsx';

import { IPlayingUpdateInfo } from '../../../utils/interface';
// import { postgresTimeToDate } from '../../../utils/util';

interface stateType {
  userID: string;
}

export const CrazyPongContainer = () => {
  const location = useLocation<stateType>();
  const [inputName, setInputName] = useState('');
  console.log(location.state);
  const { loading, error, data } = useQuery(GET_MY_GAME_RECORDS);

  const [updatePlayingInfo] = useMutation(UPDATE_PLAYINGINFO);
  const subscriptionCrazyPong = useSubscription(SUBSCRIBE_CRAZYPONG, {
    variables: {
      uuid: '100',
    },
  });

  useEffect(() => {
    if (!data || !location) {
      return;
    }
    if (location.state.userID === data?.myGameRecords[0]?.playerOneID) {
      setInputName('player1');
    } else {
      setInputName('player2');
    }
  }, [inputName]);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }
  // if (mutation)
  // 반환값 매칭이 아니면 return ;
  // 매칭이 되면 uuid 반환 받아서 그거 밑에 넣기

  console.log('userID ', location.state.userID);

  const updatePlayingInfoHandler = (playingInfo: IPlayingUpdateInfo) => {
    const { index, uuid, ballX, ballY, ballVelocityX, ballVelocityY, player1Y, player2Y, player1Score, player2Score } =
      playingInfo;
    updatePlayingInfo({
      variables: {
        info: {
          index,
          uuid,
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
    return <p>error</p>;
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
