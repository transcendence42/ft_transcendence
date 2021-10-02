import { gql } from '@apollo/client';

export const UPDATE_PLAYINGINFO = gql`
  mutation ($info: UpdatePlayingInfoInput!) {
    updatePlayingInfo(playingInfoInput: $info) {
      index
      ballX
      ballY
      ballVelocityX
      ballVelocityY
      player1Y
      player2Y
      player1Score
      player2Score
    }
  }
`;

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
