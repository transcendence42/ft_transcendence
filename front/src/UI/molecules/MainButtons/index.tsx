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

  if (isMatched === 'matched') {
    history.push({
      pathname: '/game',
      state: {
        userID: userID,
      },
    });
  }

  if (data) {
    if (data?.gameQueue) {
      history.push({
        pathname: '/game',
        state: {
          userID: userID,
        },
      });
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
