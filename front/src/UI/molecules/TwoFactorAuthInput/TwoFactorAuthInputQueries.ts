import { gql } from '@apollo/client';

export const CHECK_OPT_CODE = gql`
  mutation ($twoFactorAuthCode: String!) {
    checkOtpCode(twoFactorAuthCode: $twoFactorAuthCode)
  }
`;
