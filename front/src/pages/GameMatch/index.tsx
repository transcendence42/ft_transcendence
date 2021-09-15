import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMEQUEUE_FINDME } from './GameMatchQuery';
import MatchUserID from './MatchUserID';

const GameMatch: React.FC = () => {
  // findme
  const { loading, error, data } = useQuery(GET_GAMEQUEUE_FINDME);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  console.log(data);

  if (!data?.me.userID) {
    return <p>no userID</p>;
  }
  // 매칭 로직 요청
  return <MatchUserID userID={data?.me.userID} />;
};

export default GameMatch;

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
