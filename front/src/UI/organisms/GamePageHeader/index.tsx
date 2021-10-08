import React from 'react';
import { ProfileLarge } from '../../molecules/ProfileLarge';
import { Box } from '@chakra-ui/react';
import './index.scss';
import { IPlayers } from '../../../utils/interface';
import { GET_OTHERS_PROFILE } from '../ProfilePageHeader/ProfilePageHeaderQueries';
import { useQuery } from '@apollo/client';
import { winRate } from '../../../utils/util';

const GamePageHeader = ({ playerOneID, playerTwoID }: IPlayers) => {
  const { loading, error, data } = useQuery(GET_OTHERS_PROFILE(playerOneID));
  const playerTwoIDQuery = useQuery(GET_OTHERS_PROFILE(playerTwoID));

  console.log('playerone: ', data);
  if (loading || playerTwoIDQuery?.loading) return <>loading</>;
  if (error || playerTwoIDQuery?.error) {
    console.log('playerOneIDQuery: ', error);
    console.log('playerTwoIDQuery: ', playerTwoIDQuery?.error);
    return <>GamePageHeadererror</>;
  }

  return (
    <>
      <Box>
        <ProfileLarge
          userID={data.user.userID}
          nickname={data.user.nickname}
          avatar={data.user.avatar}
          ranking={data.user.ranking}
          ladderRating={data.user.ladderRating}
          totalWin={data.user.totalWin}
          totalLose={data.user.totalLose}
          winningPercentage={winRate(data.user.totalWin, data.user.totalLose)}
          reverse={false}
        />
      </Box>
      <Box className="vs-card">VS</Box>
      <Box>
        <ProfileLarge
          userID={playerTwoIDQuery.data.user.userID}
          nickname={playerTwoIDQuery.data.user.nickname}
          avatar={playerTwoIDQuery.data.user.avatar}
          ranking={playerTwoIDQuery.data.user.ranking}
          ladderRating={playerTwoIDQuery.data.user.ladderRating}
          totalWin={playerTwoIDQuery.data.user.totalWin}
          totalLose={playerTwoIDQuery.data.user.totalLose}
          winningPercentage={winRate(playerTwoIDQuery.data.user.totalWin, playerTwoIDQuery.data.user.totalLose)}
          reverse={true}
        />
      </Box>
    </>
  );
};

export default GamePageHeader;
