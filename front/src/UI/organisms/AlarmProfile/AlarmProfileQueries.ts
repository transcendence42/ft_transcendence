import { gql } from '@apollo/client';

// export const GET_ALARM_PROFILE = gql`
//   query ($userID: String!){
//     alarms (userID: $userID){
//       index
//       userID
//       title
//       content
//       checked
//       type
//       link
//       createdAt
//     }
//   }
// `;

export const GET_ALARM_PROFILE = gql`
  query {
    user(userID: "holee") {
      userID
      nickname
      avatar
      ladderRating
      totalWin
      totalLose
      modifiedAt
    }
  }
`;
