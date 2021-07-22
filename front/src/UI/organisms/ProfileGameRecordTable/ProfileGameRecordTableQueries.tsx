import { gql } from '@apollo/client';

export const GET_GAME_RECORD = gql`
  {
    games {
      playerOneID
      playerOneScore
      playerTwoID
      playerTwoScore
      isPlaying
      finishedAt
    }
  }
`;
