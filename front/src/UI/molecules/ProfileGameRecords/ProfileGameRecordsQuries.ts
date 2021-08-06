import { gql } from '@apollo/client';

export const GET_GAME_RECORDS = (userID: string) => gql`
query {
  gameRecords(userID: "${userID}") {
    playerOneID
    playerOneScore
    playerTwoID
    playerTwoScore
    createdAt
    finishedAt
  }
}`;

export const GET_MY_GAME_RECORDS = gql`
  query {
    myGameRecords {
      playerOneID
      playerOneScore
      playerTwoID
      playerTwoScore
      createdAt
      finishedAt
    }
  }
`;

export const GET_MY_USERINFO = gql`
  query {
    me {
      userID
    }
  }
`;

export const GET_OPPONENT_USERINFO = (userID: string) => gql`
  query {
    user(userID: "${userID}" {
      index
      userID
      nickname
      avatar
      ladderRating
      totalWin
      totalLose
      modifiedAt
      followings {
        following {
          index
          userID
          userState
          avatar
        }
        checked
      }
    }
  }
`;
