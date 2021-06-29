import React from 'react';

import { Flex, Box, Accordion } from '@chakra-ui/react';

import { AlarmChat, AlarmNotifier, ProfileSmall, AlarmUser } from '../../molecules';

const user = {
  nickname: 'yechoi',
  totalWin: 72,
  totalLose: 78,
  radderRating: 4321,
  ranking: 2,
};

export const Alarm = () => {
  const { nickname, totalWin, totalLose, radderRating, ranking } = user;
  return (
    <>
      <Flex minWidth="390px" maxWidth="390px" height="100vh" flexDirection="column">
        <Accordion defaultIndex={[0]} allowMultiple>
          <Box bg="gray.100">
            <ProfileSmall
              nickname={nickname}
              totalWin={totalWin}
              totalLose={totalLose}
              radderRating={radderRating}
              ranking={ranking}
            />
          </Box>
          <Box bg="white">
            <AlarmNotifier />
          </Box>
          <Box bg="white">
            <AlarmUser />
          </Box>
          <Box bg="white">
            <AlarmChat />
          </Box>
        </Accordion>
        <Box height="full" bg="gray.100"></Box>
      </Flex>
    </>
  );
};
