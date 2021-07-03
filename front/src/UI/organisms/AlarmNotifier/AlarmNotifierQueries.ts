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

export const REMOVE_ALARM_NOTIFIER = gql`
  mutation ($alarmIndex: Int!) {
    removeAlarm(index: $alarmIndex) {
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
