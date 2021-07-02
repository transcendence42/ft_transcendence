import { gql } from '@apollo/client';

export const GET_ALARM_NOTIFIER = gql`
  query {
    alarms {
      index
      userID
      title
      content
      checked
      type
      link
      createdAt
    }
  }
`;
