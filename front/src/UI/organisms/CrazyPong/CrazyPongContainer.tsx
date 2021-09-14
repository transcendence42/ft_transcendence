// import { useMutation, useSubscription } from '@apollo/client';
// import React, { useState } from 'react';

// import { CrazyPongPresenter } from './CrazyPongPresentater.tsx';
// import { SUBSCRIBE_CRAZYPONG, UPDATE_PLAYINGINFO } from './CrazyPongQuery';
// import { IPlayingUpdateInfo } from '../../../utils/interface';
// import { postgresTimeToDate } from '../../../utils/util';

export const CrazyPongContainer = () => {
  return <p>hi</p>;
  // if (mutation)
  // 반환값 매칭이 아니면 return ;
  // 매칭이 되면 uuid 반환 받아서 그거 밑에 넣기
  // const [updatePlayingInfo] = useMutation(UPDATE_PLAYINGINFO);
  // const [inputName, setInputName] = useState('');
  // const [inputName] = useState('player1');
  // const updatePlayingInfoHandler = (playingInfo: IPlayingUpdateInfo) => {
  //   const { index, uuid, ballX, ballY, ballVelocityX, ballVelocityY, player1Y, player2Y, player1Score, player2Score } =
  //     playingInfo;
  //   updatePlayingInfo({
  //     variables: {
  //       info: {
  //         index,
  //         uuid,
  //         ballX,
  //         ballY,
  //         ballVelocityX,
  //         ballVelocityY,
  //         player1Y,
  //         player2Y,
  //         player1Score,
  //         player2Score,
  //       },
  //     },
  //   });
  // };
  // const { data, loading, error } = useSubscription(SUBSCRIBE_CRAZYPONG, {
  //   variables: {
  //     uuid: '100',
  //   },
  // });
  // if (loading) {
  //   return (
  //     <>
  //       <p>loading</p>
  //       <input value={inputName} onChange={(e) => setInputName(e.target.value)}></input>
  //       {inputName}
  //     </>
  //   );
  // }
  // if (error) {
  //   return <p>error</p>;
  // }
  // // console.log(Date.parse(String(postgresTimeToDate(data.playingInfo.modifiedAt))));
  // return (
  //   <CrazyPongPresenter
  //     playingInfo={data.playingInfo}
  //     updatePlayingInfoHandler={updatePlayingInfoHandler}
  //     inputName={inputName}
  //   />
  // );
};
