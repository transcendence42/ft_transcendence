import { gql } from '@apollo/client';

export const CREATE_CHAT_LOG = gql`
  mutation CreateChatLog($user: CreateChatLogInput!) {
    createChatLog(createChatLogInput: $user) {
      index
      chatUUID
      userID
      message
      type
      createdAt
    }
  }
`;

export const GET_CURRENT_USERID = gql`
  query {
    me {
      userID
    }
  }
`;
