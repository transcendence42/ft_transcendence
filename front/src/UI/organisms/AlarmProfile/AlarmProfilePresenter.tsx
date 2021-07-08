import React from 'react';

import { Flex, Box } from '@chakra-ui/react';

import { logoutIcon } from '../../../utils/icons';
import { IUser } from '../../../utils/interface';
import { ProfileSmall } from '../../molecules';
import { ALARM_PROFILE_BACKGROUND_COLOR } from '../../../utils/constants';

export const AlarmProfilePresenter = ({ nickname, avatar, totalWin, totalLose, ladderRating, ranking }: IUser) => {
  return (
    <Flex alignItems="center">
      <ProfileSmall
        position="left"
        avatar={avatar}
        nickname={nickname}
        totalWin={totalWin}
        totalLose={totalLose}
        ladderRating={ladderRating}
        ranking={ranking}
        backgroundColor={ALARM_PROFILE_BACKGROUND_COLOR}
      />
      <Box position="absolute" right="1rem">
        {logoutIcon()}
      </Box>
    </Flex>
  );
};
