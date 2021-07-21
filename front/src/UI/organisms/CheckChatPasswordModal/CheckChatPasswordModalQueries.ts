import { gql } from '@apollo/client';

export const CHECK_CHAT_PASSWORD = gql`
  query CheckChatPassword($uuid: String!, $password: String!) {
    checkChatPassword(uuid: $uuid, password: $password)
  }
`;
