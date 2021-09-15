import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_GAMEQUEUE } from './GameMatchQuery';

const MatchUserID: React.FC = ({ userID }) => {
  // 매칭 로직 요청
  const [pushGameQueue, { data }] = useMutation(UPDATE_GAMEQUEUE, {
    variables: {
      userID: userID,
    },
  });
  if (!userID) {
    return <p>matching</p>;
  }

  const gameQueue = (userID: string) => {
    pushGameQueue({
      variables: {
        userID: userID,
      },
    });
  };

  console.log(gameQueue);
  gameQueue(userID);
  console.log(data);
  // setInterval(() => gameQueue(userID), 5000);
  // const timerID = setInterval(gameQueue, 1000);
  // clearInterval(timerID);
  return <p>matched</p>;
};

export default MatchUserID;

// const [pushGameQueue] = useMutation(UPDATE_GAMEQUEUE);

// const pushGameQueue = (createMatchInput: any) => {
//   const { userID, uuid, player1, player2 } = createMatchInput;
//   pushGameQueue({
//     variables: {
//       info: {
//         userID,
//         uuid,
//         player1,
//         player2,
//       },
//     },
//   });
// };

// pushGameQueue();

// back으로 mutation 보냄
// back에서 mutation 받음. 같이 /game 페이지로 리다이렉션 및 정보 보냄
