import React from 'react';

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { ApolloError } from 'apollo-server-errors';

import { AlarmMessage } from '../../molecules';
import { IAlarm } from '../../../utils/interface';
import {
  SPINNER_COLOR,
  SPINNER_ERROR_COLOR,
  ALARM_TITLE_FONTWEIGHT,
  ALARM_BACKGROUND_COLOR,
  ALARM_TITLE_FONTSIZE,
} from '../../../utils/constants';

export const AlarmNotifierPresenter = ({
  data,
  loading,
  error,
  removeAlarmMessageHandler,
}: {
  data: { alarms: IAlarm[] };
  loading: boolean;
  error?: ApolloError;
  removeAlarmMessageHandler: (alarmIndex: number) => void;
}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight={ALARM_TITLE_FONTWEIGHT} fontSize={ALARM_TITLE_FONTSIZE}>
              알림
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pr={1} pb={0.5} pt={0.5} bg={ALARM_BACKGROUND_COLOR}>
        {error ? (
          <Spinner m="5" ml="155" color={SPINNER_ERROR_COLOR} />
        ) : loading ? (
          <Spinner m="5" ml="155" color={SPINNER_COLOR} />
        ) : (
          <Flex flexDirection="column">
            {data.alarms.map(({ index, title, content, createdAt, type, link }) => (
              <AlarmMessage
                key={index}
                index={index}
                title={title}
                content={content}
                alarmTime={createdAt}
                type={type}
                link={link}
                removeAlarmMessageHandler={removeAlarmMessageHandler}
              />
            ))}
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
