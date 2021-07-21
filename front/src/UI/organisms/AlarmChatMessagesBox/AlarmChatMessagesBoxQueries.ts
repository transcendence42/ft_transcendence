import { gql } from '@apollo/client';

export const GET_CURRENT_USERID = gql`
  query {
    me {
      userID
    }
  }
`;
