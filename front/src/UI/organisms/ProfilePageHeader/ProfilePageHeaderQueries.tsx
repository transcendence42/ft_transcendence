import { gql } from '@apollo/client';

export const GET_PROFILE_BY_ID = gql`
  query user($userID: String!) {
    user(userID: $userID) {
      index
      userID
      nickname
      avatar
      ladderRating
      totalWin
      totalLose
      modifiedAt
    }
  }
`;
