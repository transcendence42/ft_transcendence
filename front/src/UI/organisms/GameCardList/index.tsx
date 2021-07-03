import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_GAME_LIST } from './GameCardListQuery';
import { IGame, PlayerInfo } from '../../../utils/interface';
import GameCard from '../GameCard';

const GameCardList = () => {
  const { loading, error, data } = useQuery(GET_GAME_LIST, {
    pollInterval: 2000,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const playingGames = data.games.filter((x: IGame) => x.isPlaying === true);
  return (
    <>
      <SimpleGrid columns={3}>
        {playingGames.map(({ id, playerOneID, playerOneScore, playerTwoID, playerTwoScore, createdAt }: IGame) => {
          const playerOneInfo: PlayerInfo = {
            name: playerOneID,
            currentScore: playerOneScore,
          };
          const playerTwoInfo: PlayerInfo = {
            name: playerTwoID,
            currentScore: playerTwoScore,
          };
          return (
            <Box key={id}>
              <GameCard playerA={playerOneInfo} playerB={playerTwoInfo} startTime={createdAt}></GameCard>
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default GameCardList;
