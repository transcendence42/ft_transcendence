import { gql } from '@apollo/client';

export const GET_MAIN_PAGE_PROFILE = gql`
  query {
    me {
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
