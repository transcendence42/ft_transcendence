import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_GAMEQUEUE } from './GameMatchQuery';

const GameMatch: React.FC = () => {
  const [pushGameQueue] = useMutation(UPDATE_GAMEQUEUE);

  const pushGameQueue = (createMatchInput: any) => {
    const { userID, uuid, player1, player2 } = createMatchInput;
    pushGameQueue({
      variables: {
        info: {
          userID,
          uuid,
          player1,
          player2,
        },
      },
    });
  };

  pushGameQueue();

  // back으로 mutation 보냄
  // back에서 mutation 받음. 같이 /game 페이지로 리다이렉션 및 정보 보냄
  return <p>match</p>;
};

export default GameMatch;
