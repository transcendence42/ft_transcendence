import { gql } from '@apollo/client';

const GAME_WITH_FRIEND = gql`
  mutation ($players: CreateGameInput!) {
    gameWithFriend(players: $players) {
      playerOneID
      playerTwoID
    }
  }
`;

const CREATE_DM = gql`
  mutation createDM($user1: String!, $user2: String!) {
    createDM(user1: $user1, user2: $user2) {
      uuid
    }
  }
`;

const CREATE_ALARM = gql`
  mutation createAlarm($alarm: CreateAlarmInput!) {
    createAlarm(createAlarmInput: $alarm) {
      index
    }
  }
`;

export { GAME_WITH_FRIEND, CREATE_DM, CREATE_ALARM };
