import { gql } from '@apollo/client';

export const UPDATE_NICKNAME = gql`
  mutation ($user: UpdateUserInput!) {
    updateUser(updateUserInput: $user) {
      userID
      nickname
    }
  }
`;
