import React from 'react';

import { Flex, Box, Accordion } from '@chakra-ui/react';

import { AlarmChat, AlarmNotifier, ProfileSmall, AlarmUser } from '../../molecules';

export const Alarm = () => {
  return (
    <>
      <Flex minWidth="390px" maxWidth="390px" height="100vh" flexDirection="column">
        <Accordion defaultIndex={[0]} allowMultiple>
          <Box p="4" bg="gray.100">
            <ProfileSmall />
          </Box>
          <Box bg="gray.400">
            <AlarmNotifier />
          </Box>
          <Box bg="gray.100">
            <AlarmUser />
          </Box>
          <Box bg="gray.400">
            <AlarmChat />
          </Box>
        </Accordion>
        <Box height="full" bg="gray.100"></Box>
      </Flex>
    </>
  );
};
