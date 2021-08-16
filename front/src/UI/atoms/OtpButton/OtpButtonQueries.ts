import { gql } from '@apollo/client';

export const TOGGLE_TWO_FACTOR_AUTH = gql`
  mutation {
    toggleTwoFactorAuthentication
  }
`;
