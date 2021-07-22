import { gql } from '@apollo/client';

export const GET_FOLLOWERS = gql`
  query {
    me {
      followers {
        checked
        follower {
          index
          userID
        }
      }
    }
  }
`;
