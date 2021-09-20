import React from 'react';
import { Button } from '@chakra-ui/react';
import './index.scss';
import { UPDATE_GAMEQUEUE } from './GameMatchQuery';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const MainButtons = ({ userID, isMatched }) => {
  const history = useHistory();
  const [pushGameQueue, { loading, error, data }] = useMutation(UPDATE_GAMEQUEUE, {
    variables: {
      userID: userID,
    },
  });

  const gameQueue = async (userID: string) => {
    await pushGameQueue({
      variables: {
        userID: userID,
      },
    });
  };

  if (loading) {
    return <p>loading gameQueue</p>;
  }
  if (error) {
    return <p>error gameQueue</p>;
  }

  // console.log(data);

  /* TODO:: back에서 mutation 받음. 같이 /game 페이지로 리다이렉션 및 정보 보냄 */

  // 해볼 순서
  // 1. data?.gameQueue 가 잘 들어오는지 확인
  // 2. 아래 redirect 가 잘 동작하는지 주석 풀고 확인
  // 3. uuid 로직 어떻게 짤지
  // 4. redirect에 해당 정보 같이 보내기.
  // console.log('data', data);
  // console.log('isMatched', isMatched);

  if (isMatched === 'matched') {
    history.push({
      pathname: '/game',
      state: {
        userID: userID,
      },
    });
    // console.log('data1', data);
  }

  if (data) {
    if (data?.gameQueue) {
      // console.log('data2', data);
      history.push({
        pathname: '/game',
        state: {
          userID: userID,
        },
      });
      // history.push('/game');
    }
  }

  return (
    <>
      <div className="main-buttons-container">
        <Button size="lg">연습하기</Button>
        <Button size="lg" onClick={() => gameQueue(userID)}>
          게임시작
        </Button>
      </div>
    </>
  );
};

export default MainButtons;
