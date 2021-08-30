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

export const GET_CHAT = gql`
  query GetChat($uuid: String!) {
    chat(uuid: $uuid) {
      index
      uuid
      name
      type
      ownerID
      adminID
      userID
      muteID
      chatLog {
        index
        userID
        message
        type
        createdAt
      }
    }
  }
`;
