import React from 'react';

import { Flex, Box, Accordion } from '@chakra-ui/react';

import { AlarmChat } from '../AlarmChat';
import AlarmNotifierContainer from '../AlarmNotifier';
import AlarmUserListContainer from '../AlarmUserList';
import AlarmProfileContainer from '../AlarmProfile';

import {
  ALARM_PROFILE_BACKGROUND_COLOR,
  ALARM_BACKGROUND_COLOR,
  ALARM_TITLE_BACKGROOUND_COLOR,
  ALARM_MIN_WIDTH,
  ALARM_MAX_WIDTH,
  ALARM_WIDTH,
  ALARM_HEIGHT,
} from '../../../utils/constants';

export const Alarm = () => {
  return (
    <>
      <Flex
        minWidth={ALARM_MIN_WIDTH}
        maxWidth={ALARM_MAX_WIDTH}
        width={ALARM_WIDTH}
        height={ALARM_HEIGHT}
        flexDirection="column"
      >
        <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
          <Box bg={ALARM_PROFILE_BACKGROUND_COLOR}>
            <AlarmProfileContainer />
          </Box>
          <Box bg={ALARM_TITLE_BACKGROOUND_COLOR}>
            <AlarmNotifierContainer />
          </Box>
          <Box bg={ALARM_TITLE_BACKGROOUND_COLOR}>
            <AlarmUserListContainer />
          </Box>
          <Box bg={ALARM_TITLE_BACKGROOUND_COLOR}>
            <AlarmChat />
          </Box>
        </Accordion>
        <Box height="full" bg={ALARM_BACKGROUND_COLOR}></Box>
      </Flex>
    </>
  );
};
