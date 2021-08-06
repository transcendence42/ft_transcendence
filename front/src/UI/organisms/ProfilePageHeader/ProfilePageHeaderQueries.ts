import { gql } from '@apollo/client';

export const GET_OTHERS_PROFILE = (userID: string) => {
  return gql`
      query {
          user(userID: "${userID}") {
            index
            userID
            nickname
            avatar
            ladderRating
            totalWin
            totalLose
            modifiedAt   
          }
      }`;
};
