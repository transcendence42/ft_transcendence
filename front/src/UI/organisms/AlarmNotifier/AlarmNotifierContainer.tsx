import React from 'react';
import { useQuery } from '@apollo/client';

import { AlarmNotifierPresenter } from './AlarmNotifierPresenter';
import { GET_ALARM_NOTIFIER } from './AlarmNotifierQueries';

export const AlarmNotifierContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_NOTIFIER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <AlarmNotifierPresenter data={data}></AlarmNotifierPresenter>;
};
