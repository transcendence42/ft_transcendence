import React from 'react';

import { Avatar, AvatarBadge, Flex, Box, Text } from '@chakra-ui/react';

export const AlarmUser = ({ nickName, userState }: { nickName: string; userState: string }) => {
  let avatarState = '';
  if (userState === 'login') {
    avatarState = 'green.500';
  } else if (userState === 'pending') {
    avatarState = 'orange.300';
  } else if (userState === 'logout') {
    avatarState = 'gray.300';
  }
  return (
    <Flex p="2" justifyContent="flex-start">
      <Box>
        <Avatar size="xs">
          <AvatarBadge boxSize="1.25em" bg={avatarState} />
        </Avatar>
      </Box>
      <Box pl="4">
        <Text fontSize="14px" fontWeight="semibold">
          {nickName}
        </Text>
      </Box>
    </Flex>
  );
};
