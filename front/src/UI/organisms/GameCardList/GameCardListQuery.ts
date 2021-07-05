import { gql } from '@apollo/client';

export const GET_GAME_LIST = gql`
  query {
    games {
      id
      isPlaying
      playerOneID
      playerOneScore
      playerTwoID
      playerTwoScore
      createdAt
    }
  }
`;
