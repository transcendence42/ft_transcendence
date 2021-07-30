import { gql } from '@apollo/client';

export const GET_GAME_RECORDS = (userID: string) => {
  return gql`
    query {
      gameRecords(userID: "${userID}") {
        playerOneID
        playerOneScore
        playerTwoID
        playerTwoScore
      }
    }`;
};

export const GET_MY_GAME_RECORDS = () => {
  return gql`
    query {
      myGameRecords {
        playerOneID
        playerOneScore
        playerTwoID
        playerTwoScore
      }
    }
  `;
};
