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
export const GET_CURRENT_USER = gql`
  query {
    me {
      index
      userID
      nickname
      avatar
      ladderRating
      totalWin
      totalLose
      modifiedAt
      followings {
        following {
          index
          userID
          userState
          avatar
        }
        checked
        blocked
      }
    }
  }
`;
