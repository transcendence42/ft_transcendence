import { gql } from '@apollo/client';

export const GET_OTP_AUTH_URL = gql`
  query {
    getOtpAuthUrl
  }
`;
