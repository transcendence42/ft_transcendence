import { gql } from '@apollo/client';

export const GET_MY_OPT_CONFIG = gql`
  query {
    me {
      enableTwoFactorAuth
      twoFactorAuthSecret
    }
  }
`;
