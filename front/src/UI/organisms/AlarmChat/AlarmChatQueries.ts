import { gql } from '@apollo/client';

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
      chatLog {
        index
        userID
        message
        createdAt
      }
    }
  }
`;

export const CHATLOG_SUBSCRIPTION = gql`
  subscription onChatLogAdded($uuid: String!) {
    chatLogAdded(uuid: $uuid) {
      index
      userID
      message
      createdAt
    }
  }
`;
