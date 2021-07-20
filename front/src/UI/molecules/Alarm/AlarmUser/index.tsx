import React from 'react';

import { Avatar, AvatarBadge, Flex, Box, Text } from '@chakra-ui/react';

import {
  ALARM_MESSAGE_LOGIN_USER_STATE_COLOR,
  ALARM_MESSAGE_PENDING_USER_STATE_COLOR,
  ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_USER_NICKNAME_FONTSIZE,
} from '../../../../utils/constants';

export const AlarmUser = ({ nickName, userState, avatar }: { nickName: string; userState: string; avatar: string }) => {
  let avatarState = '';
  if (userState === 'login') {
    avatarState = ALARM_MESSAGE_LOGIN_USER_STATE_COLOR;
  } else if (userState === 'playing') {
    avatarState = ALARM_MESSAGE_PENDING_USER_STATE_COLOR;
  } else if (userState === 'logout') {
    avatarState = ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR;
  }
  return (
    <Flex p="2" justifyContent="flex-start">
      <Box>
        <Avatar size="xs" src={avatar}>
          <AvatarBadge boxSize="1.25em" bg={avatarState} />
        </Avatar>
      </Box>
      <Box pl="4">
        <Text fontSize={ALARM_USER_NICKNAME_FONTSIZE} fontWeight={ALARM_CONTENT_FONTWEIGHT}>
          {nickName}
        </Text>
      </Box>
    </Flex>
  );
};
