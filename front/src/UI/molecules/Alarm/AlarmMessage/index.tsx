import React from 'react';

import { Box, Text, Avatar, Grid, Flex, CloseButton } from '@chakra-ui/react';

import { IalarmMessage } from '../../../../utils/interface';

export const AlarmMessage = ({ title, content, alarmTime }: IalarmMessage) => {
  return (
    <Box mb="0.5" mt="0.5" p="2" bg="gray.200" borderRadius="5" width="100%" height="64px">
      <Grid templateColumns="1fr 10fr">
        <Box>
          <Avatar size="xs" />
        </Box>
        <Flex flexDirection="column">
          <Box>
            <Flex justifyContent="space-between">
              <Text fontWeight="semibold" fontSize="14px">
                {title}
              </Text>
              <CloseButton pb="2" size="sm" />
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between">
              <Text pt="2" fontSize="12px">
                {content}
              </Text>
              <Text pt="2" fontSize="12px">
                {alarmTime}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
};
