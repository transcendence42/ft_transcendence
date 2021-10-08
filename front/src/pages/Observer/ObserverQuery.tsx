import { gql } from '@apollo/client';

export const SUBSCRIBE_CRAZYPONG = gql`
  subscription ($uuid: String!) {
    playingInfo(uuid: $uuid) {
      index
      ballX
      ballY
      ballVelocityX
      ballVelocityY
      player1Y
      player2Y
      player1Score
      player2Score
      sequence
      modifiedAt
    }
  }
`;
