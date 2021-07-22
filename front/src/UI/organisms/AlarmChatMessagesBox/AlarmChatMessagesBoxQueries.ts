import { gql } from '@apollo/client';

export const CHATLOG_SUBSCRIPTION = gql`
  subscription onChatLogAdded($uuid: String!) {
    chatLogAdded(uuid: $uuid) {
      index
      userID
      message
      type
      createdAt
    }
  }
`;
