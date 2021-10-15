import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';

import { AlarmProfilePresenter } from './AlarmProfilePresenter';
import { GET_ALARM_PROFILE } from './AlarmProfileQueries';
import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';

export const AlarmProfileContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_PROFILE);

  if (loading) {
    return <Spinner m="5" ml="155" color={SPINNER_COLOR} />;
  }

  if (error) {
    return <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />;
  }

  return (
    <AlarmProfilePresenter
      userID={data.me.userID}
      nickname={data.me.nickname}
      avatar={data.me.avatar}
      totalWin={data.me.totalWin}
      totalLose={data.me.totalLose}
      ladderRating={data.me.ladderRating}
      ranking={data.me.ranking}
    />
  );
};
