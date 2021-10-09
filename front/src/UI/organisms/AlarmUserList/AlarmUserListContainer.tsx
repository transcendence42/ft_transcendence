import React from 'react';

import { Spinner } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';
import { AlarmUserListPresenter } from './AlarmUserListPresenter';
import { GET_ALARM_USER_LIST } from './AlarmUserListQueries';

export const AlarmUserListContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_USER_LIST);

  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }
  if (error) {
    return <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />;
  }

  return <AlarmUserListPresenter data={data.me.followings} myId={data.me.userID} />;
};
