import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AlarmNotifierPresenter } from './AlarmNotifierPresenter';
import { GET_ALARM_NOTIFIER, REMOVE_ALARM_NOTIFIER } from './AlarmNotifierQueries';
import { IAlarm } from '../../../utils/interface';

export const AlarmNotifierContainer = () => {
  const { loading, error, data } = useQuery(GET_ALARM_NOTIFIER, {
    pollInterval: 2000,
  });
  const [removeAlarmMessage] = useMutation(REMOVE_ALARM_NOTIFIER);

  const removeAlarmMessageHandler = (alarmIndex: number) => {
    removeAlarmMessage({
      variables: { alarmIndex: alarmIndex },
      update(store) {
        const { alarms } = store.readQuery({ query: GET_ALARM_NOTIFIER });
        store.writeQuery({
          query: GET_ALARM_NOTIFIER,
          data: { alarms: alarms.filter((alarm: IAlarm) => alarm.index !== alarmIndex) },
        });
      },
    });
  };

  return (
    <AlarmNotifierPresenter
      data={data}
      loading={loading}
      error={error}
      removeAlarmMessageHandler={removeAlarmMessageHandler}
    ></AlarmNotifierPresenter>
  );
};
