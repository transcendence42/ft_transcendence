import { gql } from '@apollo/client';

export const UPDATE_CHAT = gql`
  mutation UpdateChat($chat: UpdateChatInput!) {
    updateChat(updateChatInput: $chat) {
      uuid
    }
  }
`;
