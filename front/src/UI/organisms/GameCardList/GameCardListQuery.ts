import { gql } from '@apollo/client';

export const GET_GAME_LIST = gql`
  query {
    games {
      index
      uuid
      isPlaying
      playerOneID
      playerOneScore
      playerTwoID
      playerTwoScore
      createdAt
    }
  }
`;
