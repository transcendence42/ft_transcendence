import { useSubscription } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { CrazyPongPresenter } from '../../UI/organisms/CrazyPong/CrazyPongPresentater.tsx';
import { IPlayingUpdateInfo } from '../../utils/interface';
import { SUBSCRIBE_CRAZYPONG } from './ObserverQuery';

interface stateType {
  uuid: string;
}

const Observer: React.FC = () => {
  const location = useLocation<stateType>();
  const [inputName] = useState('');

  console.log(location);
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
  return (
    <CrazyPongPresenter
      playingInfo={subscriptionCrazyPong.data.playingInfo}
      updatePlayingInfoHandler={updatePlayingInfoHandler}
      inputName={inputName}
    />
  );
};

export default Observer;
