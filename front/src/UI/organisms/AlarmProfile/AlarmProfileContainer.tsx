import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';

import { AlarmProfilePresenter } from './AlarmProfilePresenter';
import { GET_ALARM_PROFILE } from './AlarmProfileQueries';
import { SPINNER_COLOR, SPINNER_ERROR_COLOR } from '../../../utils/constants';

export const AlarmProfileContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_PROFILE);
  return loading ? (
    <Spinner m="5" ml="155" color={SPINNER_COLOR} />
  ) : error ? (
    <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />
  ) : (
    <AlarmProfilePresenter
      nickname={data.user.nickname}
      avatar={data.user.avatar}
      totalWin={data.user.totalWin}
      totalLose={data.user.totalLose}
      ladderRating={data.user.ladderRating}
      ranking={data.user.ranking}
    />
  );
};
