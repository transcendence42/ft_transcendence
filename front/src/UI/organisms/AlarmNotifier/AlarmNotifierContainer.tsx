import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { AlarmNotifierPresenter } from './AlarmNotifierPresenter';
import { GET_ALARM_NOTIFIER, REMOVE_ALARM_NOTIFIER } from './AlarmNotifierQueries';

export const AlarmNotifierContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_NOTIFIER);
  const [removeAlarmMessage] = useMutation(REMOVE_ALARM_NOTIFIER);

  const removeAlarmMessageHandler = (alarmIndex: number) => {
    removeAlarmMessage({
      variables: { alarmIndex: alarmIndex },
      update(store) {
        const { alarms }: any = store.readQuery({ query: GET_ALARM_NOTIFIER });
        store.writeQuery({
          query: GET_ALARM_NOTIFIER,
          data: { alarms: alarms.filter((alarm: any) => alarm.index !== alarmIndex) },
        });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <AlarmNotifierPresenter data={data} removeAlarmMessageHandler={removeAlarmMessageHandler}></AlarmNotifierPresenter>
  );
};
