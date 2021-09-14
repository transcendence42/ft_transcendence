import { gql } from '@apollo/client';

export const UPDATE_GAMEQUEUE = gql`
  mutation ($info: CreateMatchInput!) {
    gameQueue(createMatchInput: $info) {
      userID
      uuid
      player1
      player2
    }
  }
`;
