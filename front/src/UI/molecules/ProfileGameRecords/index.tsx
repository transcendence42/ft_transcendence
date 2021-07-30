import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAME_RECORDS, GET_MY_GAME_RECORDS } from './ProfileGameRecordsQuries';

export const ProfileGameRecords = ({ ...props }) => {
  const { userID } = props;
  const { loading, error, data } = useQuery(userID ? GET_GAME_RECORDS(userID) : GET_MY_GAME_RECORDS());

  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log('error');
  }
  console.log(data);
  return <div>hello</div>;
};
