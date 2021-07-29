import { gql } from '@apollo/client';

export const TOGGLE_BLOCK = gql`
  mutation toggleBlock($blockInput: BlockInput!) {
    toggleBlock(blockInput: $blockInput) {
      checked
      blocked
    }
  }
`;

export const TOGGLE_MUTE = gql`
  mutation toggleMute($uuid: String!, $userID: String!) {
    toggleMute(uuid: $uuid, userID: $userID) {
      index
      name
      muteID
    }
  }
`;

export const CREATE_CHAT_LOG = gql`
  mutation createChatLog($chatLog: CreateChatLogInput!) {
    createChatLog(createChatLogInput: $chatLog) {
      userID
      type
      message
    }
  }
`;

export const FORCED_OUT = gql`
  mutation forcedOut($uuid: String!, $userID: String!) {
    forcedOut(uuid: $uuid, userID: $userID) {
      uuid
      name
      userID
    }
  }
`;

export const TOGGLE_ADMIN = gql`
  mutation toggleAdmin($uuid: String!, $userID: String!) {
    toggleAdmin(uuid: $uuid, userID: $userID) {
      index
      name
      adminID
    }
  }
`;
