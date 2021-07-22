import { gql } from '@apollo/client';

export const CHECK_CHAT_PASSWORD = gql`
  query CheckChatPassword($uuid: String!, $password: String!) {
    checkChatPassword(uuid: $uuid, password: $password)
  }
`;

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

export const UPDATE_CHAT = gql`
  mutation UpdateChat($newChat: UpdateChatInput!) {
    updateChat(updateChatInput: $newChat) {
      uuid
      name
      type
      ownerID
      userID
    }
  }
`;
