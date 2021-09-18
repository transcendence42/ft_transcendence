import { gql } from '@apollo/client';

const UPDATE_GAMEQUEUE = gql`
  mutation ($userID: String!) {
    gameQueue(userID: $userID) {
      index
      uuid
      playerOneID
      playerTwoID
    }
  }
`;

const GET_GAMEQUEUE_FINDME = gql`
  query {
    me {
      userID
      isMatched
    }
  }
`;

export { UPDATE_GAMEQUEUE, GET_GAMEQUEUE_FINDME };
