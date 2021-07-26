import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query GetChats($userID: String, $type: String, $page: Int) {
    getChatCount(userID: $userID, type: $type)
    aliveChats(userID: $userID, type: $type, page: $page) {
      uuid
      name
      type
      ownerID
      userID
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
export const CREATE_CHAT = gql`
  mutation CreateChat($newChat: CreateChatInput!) {
    createChat(createChatInput: $newChat) {
      uuid
      name
      type
      ownerID
      userID
    }
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
