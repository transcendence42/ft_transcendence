import React from 'react';

import { Flex, Box, Accordion } from '@chakra-ui/react';

import { AlarmChat } from '../AlarmChat';
import { AlarmNotifier } from '../AlarmNotifier';
import { AlarmUserList } from '../AlarmUserList';
import { ProfileSmall } from '../../molecules';

import { user } from '../../../utils/dummy';
import {
  AlarmProfileBackgroundColor,
  AlarmBackgroundColor,
  AlarmTitleBackgroundColor,
  AlarmMinWidth,
  AlarmMaxWidth,
  AlarmWidth,
  AlarmHeight,
} from '../../../utils/constants';

export const Alarm = () => {
  const { nickname, totalWin, totalLose, radderRating, ranking } = user;
  return (
    <>
      <Flex
        minWidth={AlarmMinWidth}
        maxWidth={AlarmMaxWidth}
        width={AlarmWidth}
        height={AlarmHeight}
        flexDirection="column"
      >
        <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
          <Box bg={AlarmProfileBackgroundColor}>
            <ProfileSmall
              nickname={nickname}
              totalWin={totalWin}
              totalLose={totalLose}
              radderRating={radderRating}
              ranking={ranking}
            />
          </Box>
          <Box bg={AlarmTitleBackgroundColor}>
            <AlarmNotifier />
          </Box>
          <Box bg={AlarmTitleBackgroundColor}>
            <AlarmUserList />
          </Box>
          <Box bg={AlarmTitleBackgroundColor}>
            <AlarmChat />
          </Box>
        </Accordion>
        <Box height="full" bg={AlarmBackgroundColor}></Box>
      </Flex>
    </>
  );
};
