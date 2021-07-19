import { gql } from '@apollo/client';

export const GET_ALARM_USER_LIST = gql`
  query ($userID: String!) {
    friends(userID: $userID) {
      index
      userID
      nickname
      userState
    }
  }
`;
