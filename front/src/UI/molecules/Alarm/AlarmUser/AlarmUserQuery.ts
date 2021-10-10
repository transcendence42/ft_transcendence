import { gql } from '@apollo/client';

const GAME_WITH_FRIEND = gql`
  mutation ($players: CreateGameInput!) {
    gameWithFriend(players: $players) {
      playerOneID
      playerTwoID
    }
  }
`;

export { GAME_WITH_FRIEND };
