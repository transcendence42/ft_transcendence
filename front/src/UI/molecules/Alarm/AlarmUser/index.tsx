import React from 'react';

import { Avatar, AvatarBadge, Flex, Box, Text } from '@chakra-ui/react';

import {
  AlarmMessageLoginUserStateColor,
  AlarmMessagePendingUserStateColor,
  AlarmMessageLogoutUserStateColor,
  AlarmContentFontWeight,
  AlarmUserNickNameFontSize,
} from '../../../../utils/constants';

export const AlarmUser = ({ nickName, userState }: { nickName: string; userState: string }) => {
  let avatarState = '';
  if (userState === 'login') {
    avatarState = AlarmMessageLoginUserStateColor;
  } else if (userState === 'pending') {
    avatarState = AlarmMessagePendingUserStateColor;
  } else if (userState === 'logout') {
    avatarState = AlarmMessageLogoutUserStateColor;
  }
  return (
    <Flex p="2" justifyContent="flex-start">
      <Box>
        <Avatar size="xs">
          <AvatarBadge boxSize="1.25em" bg={avatarState} />
        </Avatar>
      </Box>
      <Box pl="4">
        <Text fontSize={AlarmUserNickNameFontSize} fontWeight={AlarmContentFontWeight}>
          {nickName}
        </Text>
      </Box>
    </Flex>
  );
};
