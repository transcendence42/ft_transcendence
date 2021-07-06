import React from 'react';

import { Box, Text, Avatar, Grid, Flex, CloseButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { IalarmMessage } from '../../../../utils/interface';
import { CheckIcon } from '../../../../utils/icons';
import {
  ALARM_MESSAGE_BACKGROUND_COLOR,
  ALARM_MESSAGE_TITLE_FONTSIZE,
  ALARM_MESSAGE_CONTENT_FONTSIZE,
  ALARM_MESSAGE_HEIGHT,
  ALARM_MESSAGE_WIDTH,
  ALARM_CONTENT_FONTWEIGHT,
} from '../../../../utils/constants';

export const AlarmMessage = ({
  index,
  title,
  content,
  alarmTime,
  type,
  link,
  removeAlarmMessageHandler,
}: IalarmMessage) => {
  console.log(type, link);
  return (
    <Box
      mb="0.5"
      mt="0.5"
      p="2"
      bg={ALARM_MESSAGE_BACKGROUND_COLOR}
      borderRadius="5"
      width={ALARM_MESSAGE_WIDTH}
      height={ALARM_MESSAGE_HEIGHT}
    >
      <Grid templateColumns="1fr 10fr">
        <Box p="1">
          <Link to={link}>{type === 'addFriend' ? <Avatar size="xs" /> : <CheckIcon width="20" height="20" />}</Link>
        </Box>
        <Flex flexDirection="column">
          <Box>
            <Flex justifyContent="space-between">
              <Text fontWeight={ALARM_CONTENT_FONTWEIGHT} fontSize={ALARM_MESSAGE_TITLE_FONTSIZE}>
                {title}
              </Text>
              <CloseButton pb="2" size="sm" onClick={() => removeAlarmMessageHandler(index)} />
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between">
              <Text pt="2" fontSize={ALARM_MESSAGE_CONTENT_FONTSIZE}>
                {content}
              </Text>
              <Text pt="2" fontSize={ALARM_MESSAGE_CONTENT_FONTSIZE}>
                {alarmTime}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
};
