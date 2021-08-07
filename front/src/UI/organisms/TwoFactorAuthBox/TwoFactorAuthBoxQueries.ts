import { gql } from '@apollo/client';

export const GET_MY_OPT_SECRET = gql`
  query {
    me {
      twoFactorAuthSecret
    }
  }
`;
