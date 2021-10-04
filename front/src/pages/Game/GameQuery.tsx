import { gql } from '@apollo/client';

export const GET_MY_GAME_RECORDS = gql`
  query {
    myGameRecords {
      index
      uuid
      isPlaying
      playerOneID
      playerTwoID
    }
  }
`;
