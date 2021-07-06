import React from 'react';

import { Flex, Box, Accordion } from '@chakra-ui/react';

import { AlarmChat } from '../AlarmChat';
import AlarmNotifierContainer from '../AlarmNotifier';
import { AlarmUserList } from '../AlarmUserList';
import { AlarmProfile } from '../AlarmProfile';

import { user } from '../../../utils/dummy';
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
  const { nickname, totalWin, totalLose, ladderRating, ranking } = user;
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
            <AlarmProfile
              nickname={nickname}
              totalWin={totalWin}
              totalLose={totalLose}
              ladderRating={ladderRating}
              ranking={ranking}
            />
          </Box>
          <Box bg={ALARM_TITLE_BACKGROOUND_COLOR}>
            <AlarmNotifierContainer />
          </Box>
          <Box bg={ALARM_TITLE_BACKGROOUND_COLOR}>
            <AlarmUserList />
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
