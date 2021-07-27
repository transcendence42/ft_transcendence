import { gql } from '@apollo/client';

export const GET_FOLLOWERS = gql`
  query {
    me {
      followers {
        checked
        createdAt
        follower {
          index
          userID
        }
      }
    }
  }
`;
