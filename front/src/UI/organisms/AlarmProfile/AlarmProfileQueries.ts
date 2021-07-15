import { gql } from '@apollo/client';

export const GET_ALARM_PROFILE = gql`
  query {
    me {
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
