import { gql } from '@apollo/client';

export const UPDATE_NICKNAME = gql`
  mutation ($userID: String!) {
    updateUser(userID: $userID) {
      userID
      nickname
    }
  }
`;
